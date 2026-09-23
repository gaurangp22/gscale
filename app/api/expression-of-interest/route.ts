import { neon } from "@neondatabase/serverless";
import { createHash } from "node:crypto";

/* ─────────────────────────────────────────────────────────────────────────
   Expression of interest — International Short-Term Programmes,
   December 2026. From university representatives or students.

   Validates the submission and issues a reference derived from the
   submission id, so a retried send gets the same reference. It does NOT
   store to Postgres and/or
   email the office, depending on which environment variables are set.
   ───────────────────────────────────────────────────────────────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PROGRAMMES = ["A", "B", "C", "D"] as const;
type ProgrammeId = (typeof PROGRAMMES)[number];

type Submission = {
  id: string;
  programmes: ProgrammeId[];
  fullName: string;
  email: string;
  institution: string;
  position: string;
  country: string;
  role: "rep" | "student";
  students: string;
  officeContact: string;
  notes: string;
  consent: boolean;
};

const clip = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function parse(body: Record<string, unknown>): Submission | string {
  const programmes = Array.isArray(body.programmes)
    ? PROGRAMMES.filter((p) => (body.programmes as unknown[]).includes(p))
    : [];
  const s: Submission = {
    id: clip(body.id, 64),
    programmes,
    fullName: clip(body.fullName, 120),
    email: clip(body.email, 160),
    institution: clip(body.institution, 200),
    position: clip(body.position, 120),
    country: clip(body.country, 80),
    role: body.role === "student" ? "student" : "rep",
    students: clip(body.students, 8),
    officeContact: clip(body.officeContact, 160),
    notes: clip(body.notes, 1500),
    consent: body.consent === true,
  };
  if (!/^[\w-]{8,64}$/.test(s.id)) return "Missing submission id.";
  if (!s.programmes.length) return "Choose at least one programme.";
  if (!s.fullName) return "Missing name.";
  if (!EMAIL.test(s.email)) return "Invalid email.";
  if (!s.institution) return "Missing institution.";
  if (s.role === "rep" && !s.position) return "Missing role or job title.";
  if (!s.country) return "Missing country or region.";
  if (s.role === "rep" && !(s.students === "TBC" || /^\d{1,4}$/.test(s.students))) return "Missing number of students.";
  if (s.officeContact && !EMAIL.test(s.officeContact)) return "Invalid international office email.";
  if (!s.consent) return "Consent is required.";
  return s;
}

/* Two independent destinations, so one failing never loses a submission:
     1. the database (DATABASE_URL, a Neon Postgres connection string)
     2. an email copy to the office (RESEND_API_KEY + EOI_NOTIFY_TO)
   The submission counts as delivered if either succeeds. If neither is
   configured yet, it is only logged. */
async function toDatabase(s: Submission, reference: string) {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  const sql = neon(url);
  await sql`create table if not exists eoi_submissions (
    id text primary key,
    reference text not null,
    created_at timestamptz not null default now(),
    role text, programmes text[], full_name text, email text, institution text,
    position text, country text, students text, office_contact text, notes text
  )`;
  // id is the client's submission id: a retried send updates nothing new
  await sql`insert into eoi_submissions
    (id, reference, role, programmes, full_name, email, institution, position, country, students, office_contact, notes)
    values (${s.id}, ${reference}, ${s.role}, ${s.programmes}, ${s.fullName}, ${s.email}, ${s.institution},
            ${s.position}, ${s.country}, ${s.students}, ${s.officeContact}, ${s.notes})
    on conflict (id) do nothing`;
  return true;
}

async function toEmail(s: Submission, reference: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.EOI_NOTIFY_TO;
  if (!key || !to) return false;
  const lines = [
    `Reference: ${reference}`,
    `Registering as: ${s.role === "student" ? "Student" : "University representative"}`,
    `Programmes: ${s.programmes.join(", ")}`,
    `Name: ${s.fullName}`,
    `Email: ${s.email}`,
    `Institution: ${s.institution}`,
    s.position && `Role: ${s.position}`,
    `Country: ${s.country}`,
    s.students && `Indicative students: ${s.students}`,
    s.officeContact && `International office contact: ${s.officeContact}`,
    s.notes && `Notes: ${s.notes}`,
  ].filter(Boolean);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": s.id },
    body: JSON.stringify({
      from: process.env.EOI_NOTIFY_FROM ?? "Expressions of interest <onboarding@resend.dev>",
      to: to.split(",").map((x) => x.trim()),
      reply_to: s.email,
      subject: `Expression of interest ${reference}: ${s.institution}`,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  return true;
}

async function deliver(s: Submission, reference: string) {
  const results = await Promise.allSettled([toDatabase(s, reference), toEmail(s, reference)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);
  const configured = Boolean(process.env.DATABASE_URL || process.env.RESEND_API_KEY);
  for (const r of results) if (r.status === "rejected") console.error("[expression-of-interest]", reference, r.reason);
  if (!configured) console.info("[expression-of-interest]", reference, JSON.stringify(s));
  return delivered || !configured;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = parse(body);
  if (typeof parsed === "string") {
    return Response.json({ ok: false, error: parsed }, { status: 422 });
  }

  const reference = `GS26-${createHash("sha256").update(parsed.id).digest("hex").slice(0, 6).toUpperCase()}`;
  if (!(await deliver(parsed, reference))) {
    // both destinations failed: the form keeps the answers and retries
    return Response.json({ ok: false, error: "Temporarily unavailable." }, { status: 503 });
  }
  return Response.json({ ok: true, reference });
}
