"use client";

import { useEffect, useMemo, useRef } from "react";
import { GLOBE_DOTS_B64 } from "@/lib/globe-data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Route atlas.

   Both directions are drawn at once rather than behind a pair of tabs: the
   page already has outbound and inbound sections below, and a control that
   duplicated them added a click without adding information.

   Color carries the direction instead — azure out, amber in, crimson for
   Greater Noida itself. Outbound arcs bow upward and inbound arcs bow
   downward, so a city served in both directions (Singapore) draws a lens
   rather than one line hiding another.
   ───────────────────────────────────────────────────────────────────────── */

type Place = { name: string; lat: number; lng: number };
type Direction = "outbound" | "inbound";

const origin: Place = { name: "Greater Noida", lat: 28.47, lng: 77.5 };

const ROUTES: Record<Direction, readonly Place[]> = {
  outbound: [
    { name: "Singapore", lat: 1.35, lng: 103.82 },
    { name: "Cambridge", lat: 52.2, lng: 0.12 },
    { name: "Hong Kong", lat: 22.32, lng: 114.17 },
    { name: "Jakarta", lat: -6.21, lng: 106.85 },
  ],
  inbound: [
    { name: "Singapore", lat: 1.35, lng: 103.82 },
    { name: "Malé", lat: 4.18, lng: 73.51 },
  ],
};

const INK = { land: "rgba(27, 29, 33, 0.13)", label: "rgb(35, 37, 41)" };
const DIRECTION_STYLE: Record<Direction, { stroke: string; dot: string; lift: number }> = {
  // Azure out, amber in — the same pairing the direction panels below use.
  outbound: { stroke: "rgba(11, 95, 153, 0.78)", dot: "rgb(11, 95, 153)", lift: -0.17 },
  inbound: { stroke: "rgba(184, 118, 13, 0.85)", dot: "rgb(184, 118, 13)", lift: 0.19 },
};

function decodeDots() {
  const binary = atob(GLOBE_DOTS_B64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Int16Array(bytes.buffer);
}

function point(place: Place, width: number, height: number) {
  return {
    x: ((place.lng + 180) / 360) * width,
    y: ((90 - place.lat) / 180) * height,
  };
}

export function RouteAtlas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const dots = useMemo(() => decodeDots(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    const started = performance.now();

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const cssWidth = width / ratio;
      const cssHeight = height / ratio;
      context.clearRect(0, 0, cssWidth, cssHeight);

      context.fillStyle = INK.land;
      const radius = cssWidth < 680 ? 0.42 : 0.58;
      for (let index = 0; index < dots.length; index += 2) {
        const lat = dots[index] / 100;
        const lng = dots[index + 1] / 100;
        const x = ((lng + 180) / 360) * cssWidth;
        const y = ((90 - lat) / 180) * cssHeight;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      const progress = reduced ? 1 : Math.min(1, (now - started) / 1100);
      const originPoint = point(origin, cssWidth, cssHeight);
      let step = 0;
      /* Singapore is served in both directions. Both arcs are drawn — that
         is the point — but the name is only written once. */
      const labelled = new Set<string>();

      (Object.keys(ROUTES) as Direction[]).forEach((direction) => {
        const style = DIRECTION_STYLE[direction];

        ROUTES[direction].forEach((destination) => {
          const destinationPoint = point(destination, cssWidth, cssHeight);
          const span = Math.abs(destinationPoint.x - originPoint.x);
          const controlX = (originPoint.x + destinationPoint.x) / 2;
          const controlY =
            (originPoint.y + destinationPoint.y) / 2 + span * style.lift;

          const routeProgress = Math.max(
            0,
            Math.min(1, progress * 1.4 - step * 0.09),
          );
          step += 1;
          if (routeProgress <= 0) return;

          context.beginPath();
          const steps = Math.max(2, Math.floor(70 * routeProgress));
          for (let i = 0; i <= steps; i++) {
            const t = i / 70;
            const inverse = 1 - t;
            const x =
              inverse * inverse * originPoint.x +
              2 * inverse * t * controlX +
              t * t * destinationPoint.x;
            const y =
              inverse * inverse * originPoint.y +
              2 * inverse * t * controlY +
              t * t * destinationPoint.y;
            if (i === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.strokeStyle = style.stroke;
          context.lineWidth = 1.25;
          context.stroke();

          if (routeProgress > 0.9) {
            context.beginPath();
            context.arc(destinationPoint.x, destinationPoint.y, 3, 0, Math.PI * 2);
            context.fillStyle = style.dot;
            context.fill();

            if (!labelled.has(destination.name)) {
              labelled.add(destination.name);
              context.font = "500 11px Arial, sans-serif";
              context.fillStyle = INK.label;
              const above = direction === "outbound";
              context.fillText(
                destination.name,
                destinationPoint.x + 7,
                destinationPoint.y + (above ? -7 : 15),
              );
            }
          }
        });
      });

      context.beginPath();
      context.arc(originPoint.x, originPoint.y, 5, 0, Math.PI * 2);
      context.fillStyle = "rgb(186, 16, 43)";
      context.fill();
      context.font = "600 11px Arial, sans-serif";
      context.fillStyle = INK.label;
      context.fillText(origin.name, originPoint.x + 10, originPoint.y - 9);

      if (!reduced && progress < 1) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    resize.observe(canvas);

    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [dots, reduced]);

  return (
    <div className="route-atlas">
      <canvas ref={canvasRef} className="route-canvas" aria-hidden />

      <div className="route-legend">
        <span data-direction="outbound">
          <i />
          Outbound: {ROUTES.outbound.map((place) => place.name).join(", ")}
        </span>
        <span data-direction="inbound">
          <i />
          Inbound: {ROUTES.inbound.map((place) => place.name).join(", ")}
        </span>
        <span data-direction="origin">
          <i />
          Greater Noida
        </span>
      </div>
    </div>
  );
}
