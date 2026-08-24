"use client";

import { useEffect, useMemo, useRef } from "react";
import { GLOBE_DOTS_B64 } from "@/lib/globe-data";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   An orthographic globe drawn to canvas.

   The land dots are real coastline data (see scripts/gen-globe-data.mjs),
   re-projected onto a sphere every frame. Routes are true great circles,
   lifted off the surface so they arc rather than smear across it.

   Canvas rather than SVG: ~3,000 dots plus seven animated arcs is far past
   the point where per-node DOM updates hold 60fps.
   ───────────────────────────────────────────────────────────── */

const DEG = Math.PI / 180;

export type GlobePlace = {
  name: string;
  country: string;
  lat: number;
  lng: number;
};

type Vec3 = { x: number; y: number; z: number };

function decodeDots(b64: string): Float32Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const ints = new Int16Array(bytes.buffer);

  // Pre-convert to unit vectors; the render loop then only rotates.
  const out = new Float32Array((ints.length / 2) * 3);
  for (let i = 0, j = 0; i < ints.length; i += 2, j += 3) {
    const lat = (ints[i] / 100) * DEG;
    const lng = (ints[i + 1] / 100) * DEG;
    const cosLat = Math.cos(lat);
    out[j] = cosLat * Math.sin(lng);
    out[j + 1] = Math.sin(lat);
    out[j + 2] = cosLat * Math.cos(lng);
  }
  return out;
}

function toVec(lat: number, lng: number): Vec3 {
  const a = lat * DEG;
  const b = lng * DEG;
  const cosLat = Math.cos(a);
  return { x: cosLat * Math.sin(b), y: Math.sin(a), z: cosLat * Math.cos(b) };
}

/** Great-circle interpolation, with a lift so the route arcs above the surface. */
function arcPoint(a: Vec3, b: Vec3, t: number, lift: number): Vec3 {
  let dot = a.x * b.x + a.y * b.y + a.z * b.z;
  dot = Math.max(-1, Math.min(1, dot));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);

  let px: number, py: number, pz: number;
  if (sinOmega < 1e-6) {
    px = a.x; py = a.y; pz = a.z;
  } else {
    const wa = Math.sin((1 - t) * omega) / sinOmega;
    const wb = Math.sin(t * omega) / sinOmega;
    px = a.x * wa + b.x * wb;
    py = a.y * wa + b.y * wb;
    pz = a.z * wa + b.z * wb;
  }

  // Height peaks mid-route and scales with how far apart the endpoints are.
  const r = 1 + lift * (omega / Math.PI) * Math.sin(Math.PI * t);
  return { x: px * r, y: py * r, z: pz * r };
}

export function Globe({
  origin,
  destinations,
  className,
  tone = "light",
  spin = true,
}: {
  origin: GlobePlace;
  destinations: readonly GlobePlace[];
  className?: string;
  /** "light" = white dots on a dark ground. "dark" = ink dots on paper. */
  tone?: "light" | "dark";
  spin?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const dots = useMemo(() => decodeDots(GLOBE_DOTS_B64), []);

  const routes = useMemo(
    () =>
      destinations.map((place) => ({
        place,
        a: toVec(origin.lat, origin.lng),
        b: toVec(place.lat, place.lng),
      })),
    [origin, destinations]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ink = tone === "light" ? "255,255,255" : "17,17,17";
    const CRIMSON = "189,22,34";

    let width = 0;
    let height = 0;
    let dpr = 1;

    /* Sizing is checked every frame rather than driven by a ResizeObserver.
       RO only delivers while the document is being rendered, so a page opened
       in a background tab would measure 0x0 once and never recover. Reading
       clientWidth/clientHeight per frame is cheap and always self-corrects. */
    const syncSize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (w === width && h === height && ratio === dpr) return;

      width = w;
      height = h;
      dpr = ratio;
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    // Skip drawing entirely while the globe is off-screen.
    let onScreen = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
            },
            { threshold: 0 }
          )
        : null;
    io?.observe(wrap);

    let raf = 0;
    const start = performance.now();
    // Start with India facing the viewer.
    const baseRotation = -origin.lng * DEG;
    const TILT = 16 * DEG;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      syncSize();
      if (!onScreen || width === 0 || height === 0) return;

      const elapsed = (now - start) / 1000;
      const spinAmount = spin && !reduced ? elapsed * 0.055 : 0;
      const rot = baseRotation - spinAmount;

      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.42;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      /** Rotate a unit vector into view space, then project. */
      const project = (v: Vec3) => {
        // Spin about the polar axis.
        const x1 = v.x * cosR + v.z * sinR;
        const z1 = -v.x * sinR + v.z * cosR;
        // Tilt the north pole toward the viewer.
        const y2 = v.y * cosT - z1 * sinT;
        const z2 = v.y * sinT + z1 * cosT;
        return { sx: cx + x1 * R, sy: cy - y2 * R, depth: z2 };
      };

      /* ── Sphere body ───────────────────────────────────────── */
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ink},${tone === "light" ? 0.022 : 0.02})`;
      ctx.fill();

      /* ── Graticule ─────────────────────────────────────────── */
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${ink},0.07)`;

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = project(toVec(lat, lng));
          if (p.depth < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -85; lat <= 85; lat += 4) {
          const p = project(toVec(lat, lng));
          if (p.depth < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      /* ── Land dots ─────────────────────────────────────────── */
      const dotR = Math.max(0.7, R * 0.0042);
      for (let i = 0; i < dots.length; i += 3) {
        const x1 = dots[i] * cosR + dots[i + 2] * sinR;
        const z1 = -dots[i] * sinR + dots[i + 2] * cosR;
        const y2 = dots[i + 1] * cosT - z1 * sinT;
        const z2 = dots[i + 1] * sinT + z1 * cosT;
        if (z2 <= 0.02) continue;

        // Fade toward the limb so the sphere reads as curved.
        const alpha = (tone === "light" ? 0.5 : 0.42) * Math.pow(z2, 0.65);
        ctx.beginPath();
        ctx.arc(cx + x1 * R, cy - y2 * R, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ink},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      /* ── Routes ────────────────────────────────────────────── */
      const SEGMENTS = 96;

      routes.forEach((route, index) => {
        // Each route draws itself in, then holds.
        const drawIn = reduced
          ? 1
          : Math.max(0, Math.min(1, (elapsed - 0.35 - index * 0.28) / 1.5));
        if (drawIn <= 0) return;

        const limit = Math.floor(SEGMENTS * drawIn);

        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";

        for (let s = 0; s < limit; s++) {
          const t0 = s / SEGMENTS;
          const t1 = (s + 1) / SEGMENTS;
          const p0 = project(arcPoint(route.a, route.b, t0, 0.55));
          const p1 = project(arcPoint(route.a, route.b, t1, 0.55));
          if (p0.depth < -0.15 || p1.depth < -0.15) continue;

          const edge = Math.min(1, Math.max(0, (p0.depth + 0.15) / 0.35));
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.strokeStyle = `rgba(${CRIMSON},${(0.85 * edge).toFixed(3)})`;
          ctx.stroke();
        }

        /* Travelling route marker. */
        if (!reduced && drawIn >= 1) {
          const cycle = (elapsed * 0.32 + index * 0.17) % 1;
          const p = project(arcPoint(route.a, route.b, cycle, 0.55));
          if (p.depth > 0) {
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CRIMSON},0.95)`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${CRIMSON},0.46)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      /* ── Markers ───────────────────────────────────────────── */
      const marker = (place: GlobePlace, isOrigin: boolean) => {
        const p = project(toVec(place.lat, place.lng));
        if (p.depth <= 0.04) return;

        const fade = Math.min(1, p.depth * 2.6);

        if (!reduced) {
          const ring = (elapsed * (isOrigin ? 0.75 : 0.5)) % 1;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 3 + ring * (isOrigin ? 17 : 12), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${CRIMSON},${((1 - ring) * 0.5 * fade).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, isOrigin ? 3.4 : 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CRIMSON},${fade.toFixed(3)})`;
        ctx.fill();

        if (isOrigin) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 6.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${CRIMSON},${(0.55 * fade).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Labels only once the marker is comfortably front-facing.
        if (p.depth > 0.34 && R > 120 && (width > 560 || isOrigin)) {
          const label = place.name.toUpperCase();
          ctx.font = `500 ${isOrigin ? 11 : 10}px var(--font-mono-face), ui-monospace, monospace`;
          ctx.textBaseline = "middle";
          const tx = p.sx + 11;
          const labelOffset = place.name === "Hong Kong" ? 13 : place.name === "Shenzhen" ? -10 : 0;
          const ty = p.sy - 9 + labelOffset;
          ctx.fillStyle = `rgba(${ink},${(0.85 * fade).toFixed(3)})`;
          ctx.fillText(label, tx, ty);

          const w = ctx.measureText(label).width;
          ctx.beginPath();
          ctx.moveTo(p.sx + 5, p.sy - 1);
          ctx.lineTo(tx - 2, ty + 1);
          ctx.lineTo(tx + w, ty + 1);
          ctx.strokeStyle = `rgba(${ink},${(0.28 * fade).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      };

      routes.forEach((route) => marker(route.place, false));
      marker(origin, true);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [dots, routes, origin, tone, spin, reduced]);

  return (
    <div ref={wrapRef} className={cn("relative h-full w-full", className)}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
      <span className="sr-only">
        A globe showing routes from {origin.name} to{" "}
        {destinations.map((d) => d.name).join(", ")}.
      </span>
    </div>
  );
}
