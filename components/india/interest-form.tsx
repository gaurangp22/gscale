"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CaretDown, CaretUp, Check, KeyReturn, PencilSimple } from "@phosphor-icons/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { COUNTRIES, EDITION, PROGRAMMES, type ProgrammeId } from "./content";
import { CountrySelect } from "./country-select";

/* ─────────────────────────────────────────────────────────────────────────
   Expression of interest.

   Mostly for universities considering nominating students; students can
   register too. The first question asks which, and the rest are worded
   for that person. A university is asked for an indicative total of
   students; a student for a contact at their university's international
   office, since places usually come through the institution.

   One question at a time. Enter moves on, letter keys pick programmes.
   ───────────────────────────────────────────────────────────────────────── */

type Role = "rep" | "student";

export type Answers = {
  role?: Role;
  programmes: ProgrammeId[];
  fullName: string;
  email: string;
  institution: string;
  position: string;
  country: string;
  /** indicative total of students, or "TBC" */
  students: string;
  officeContact: string;
  notes: string;
  consent: boolean;
};

const EMPTY: Answers = {
  programmes: [],
  fullName: "",
  email: "",
  institution: "",
  position: "",
  country: "",
  students: "",
  officeContact: "",
  notes: "",
  consent: false,
};

type StepId = "welcome" | "role" | "programmes" | "name" | "email" | "institution" | "position" | "country" | "numbers" | "office" | "notes" | "review";

function stepsFor(a: Answers): StepId[] {
  return a.role === "student"
    ? ["welcome", "role", "programmes", "name", "email", "institution", "country", "office", "notes", "review"]
    : ["welcome", "role", "programmes", "name", "email", "institution", "position", "country", "numbers", "notes", "review"];
}

const ROLES: Array<{ value: Role; label: string }> = [
  { value: "rep", label: "I represent a university or college" },
  { value: "student", label: "I’m a student" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PERSONAL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton(mail)?|yandex|rediffmail|mail)\./i;

const programmeLabel = (id: ProgrammeId) => {
  const p = PROGRAMMES.find((x) => x.id === id)!;
  return p.withLT ? `${p.title} (with L&T)` : `${p.title} (iOS Developer programme)`;
};

function validate(step: StepId, a: Answers): string | null {
  switch (step) {
    case "role":
      return a.role ? null : "Choose the option that fits.";
    case "programmes":
      return a.programmes.length ? null : "Choose at least one programme.";
    case "name":
      return a.fullName.trim().split(/\s+/).length >= 2 ? null : "Please enter your full name.";
    case "email":
      return EMAIL.test(a.email.trim()) ? null : "That email doesn’t look quite right.";
    case "institution":
      return a.institution.trim() ? null : "Please enter the university or institution.";
    case "position":
      return a.position.trim() ? null : "Please add your role or job title.";
    case "country":
      return COUNTRIES.includes(a.country) ? null : "Please choose a country from the list.";
    case "numbers":
      return a.students === "TBC" || /^\d{1,4}$/.test(a.students.trim()) ? null : "Add a number, or mark it TBC.";
    case "office":
      return !a.officeContact.trim() || EMAIL.test(a.officeContact.trim()) ? null : "That email doesn’t look quite right.";
    case "review":
      return a.consent ? null : "Please confirm we may contact you about the programmes.";
    default:
      return null;
  }
}

function Field({ label, children, optional }: { label: string; children: ReactNode; optional?: boolean }) {
  return (
    <label className="eoi-field">
      <span className="eoi-label">
        {label}
        {optional && <em>optional</em>}
      </span>
      {children}
    </label>
  );
}

const KEYS = "ABCDEFGH";

/* ── The form ────────────────────────────────────────────────────────── */

export function InterestForm({ initialProgramme }: { initialProgramme?: ProgrammeId }) {
  const reduced = useReducedMotion();
  const [a, setA] = useState<Answers>(() => ({
    ...EMPTY,
    programmes: initialProgramme ? [initialProgramme] : [],
  }));
  // The latest answers, for handlers that fire before a re-render lands.
  const aRef = useRef(a);
  useLayoutEffect(() => {
    aRef.current = a;
  }, [a]);
  const [step, setStep] = useState<StepId>("welcome");
  const [dir, setDir] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [reference, setReference] = useState<string>();
  const [touched, setTouched] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const steps = stepsFor(a);
  const questionNo = steps.indexOf(step);
  const total = steps.length - 1;
  const student = a.role === "student";

  const set = useCallback(<K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((prev) => ({ ...prev, [k]: v }));
    setError(null);
  }, []);


  /* Focus follows the question, once the visitor has started. */
  useEffect(() => {
    if (!touched) return;
    const id = window.setTimeout(() => {
      stageRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    }, reduced ? 0 : 380);
    return () => window.clearTimeout(id);
  }, [step, touched, reduced]);

  const go = useCallback((target: StepId, direction: number) => {
    setDir(direction);
    setError(null);
    setTouched(true);
    setStep(target);
  }, []);

  /* Answers are kept on this device as they are typed, so a refresh, a
     closed tab or a failed send never loses them. Cleared once sent. */
  const DRAFT = "lii-eoi-draft-v2";
  const restoreDraft = (cur: Answers): Answers => {
    try {
      const raw = window.localStorage.getItem(DRAFT);
      if (!raw) return cur;
      const saved = JSON.parse(raw) as Partial<Answers>;
      return {
        ...cur,
        ...saved,
        programmes: saved.programmes?.length ? saved.programmes : cur.programmes,
        consent: false,
      };
    } catch {
      return cur;
    }
  };
  useEffect(() => {
    if (!touched || status === "done") return;
    try {
      window.localStorage.setItem(DRAFT, JSON.stringify({ ...a, consent: false }));
    } catch {
      /* storage unavailable: nothing to do */
    }
  }, [a, touched, status]);

  /* One id per submission: a retried send is recognised as the same one
     by the server, so it is never stored twice and keeps its reference. */
  const idRef = useRef<string | null>(null);

  const submit = useCallback(async (cur: Answers) => {
    setStatus("sending");
    idRef.current ??= typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const body = JSON.stringify({ ...cur, id: idRef.current });
    // A dropped connection or a busy server is retried quietly; a
    // validation problem (4xx) is shown straight away.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch("/api/expression-of-interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        const data = (await res.json().catch(() => ({ ok: false }))) as { ok: boolean; reference?: string; error?: string };
        if (res.ok && data.ok) {
          setReference(data.reference);
          setStatus("done");
          try {
            window.localStorage.removeItem(DRAFT);
          } catch {
            /* ignore */
          }
          return;
        }
        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          setStatus("failed");
          setError(data.error ?? "Something in the form needs another look.");
          return;
        }
      } catch {
        /* network error: fall through to retry */
      }
      await new Promise((r) => window.setTimeout(r, 800 * (attempt + 1) ** 2));
    }
    setStatus("failed");
    setError(`We couldn’t send that just now. Your answers are saved on this device, so please try again in a moment, or email ${EDITION.email}.`);
  }, []);

  const next = useCallback(() => {
    let cur = aRef.current;
    if (step === "welcome") {
      cur = restoreDraft(cur);
      aRef.current = cur;
      setA(cur);
    }
    const problem = validate(step, cur);
    if (problem) {
      setError(problem);
      return;
    }
    if (step === "review") {
      void submit(cur);
      return;
    }
    const list = stepsFor(cur);
    const i = list.indexOf(step);
    if (i < list.length - 1) go(list[i + 1], 1);
  }, [step, go, submit]);

  const back = useCallback(() => {
    const list = stepsFor(aRef.current);
    const i = list.indexOf(step);
    if (i > 0) go(list[i - 1], -1);
  }, [step, go]);

  const pickRole = (r: Role) => {
    const nextA = { ...aRef.current, role: r };
    aRef.current = nextA;
    setA(nextA);
    setError(null);
    window.setTimeout(() => next(), reduced ? 60 : 340);
  };

  const toggleProgramme = (id: ProgrammeId) => {
    setA((prev) => ({
      ...prev,
      programmes: prev.programmes.includes(id) ? prev.programmes.filter((x) => x !== id) : [...prev.programmes, id],
    }));
    setError(null);
  };

  /* Keyboard: Enter advances; letters pick programmes. */
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (status === "done") return;
    const t = e.target as HTMLElement;
    const typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
    if (e.key === "Enter") {
      if (t.tagName === "TEXTAREA" && !(e.metaKey || e.ctrlKey)) return;
      if (t.tagName === "BUTTON" || t.tagName === "A" || (t.tagName === "INPUT" && (t as HTMLInputElement).type === "checkbox")) return;
      e.preventDefault();
      next();
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
    const k = KEYS.indexOf(e.key.toUpperCase());
    if (step === "role" && ROLES[k]) {
      e.preventDefault();
      pickRole(ROLES[k].value);
      return;
    }
    if (step === "programmes" && PROGRAMMES[k]) {
      e.preventDefault();
      toggleProgramme(PROGRAMMES[k].id);
    }
  };

  const personal = PERSONAL.test(a.email);

  /* ── Question bodies ─────────────────────────────────────────────── */

  const text = (key: "fullName" | "email" | "institution" | "position", props: Record<string, string>) => (
    <input data-autofocus value={a[key]} onChange={(e) => set(key, e.target.value)} {...props} />
  );

  const question: { kicker?: ReactNode; title: ReactNode; help?: ReactNode; body?: ReactNode; cta?: string; hint?: string } = (() => {
    switch (step) {
      case "welcome":
        return {
          kicker: <>Galgotias University · International Short-Term Programmes · December 2026</>,
          title: <>Express interest.</>,
          help: (
            <>
              {EDITION.dates} at Galgotias University, Greater Noida. About three minutes. The
              international office will get back to you.
            </>
          ),
          cta: "Begin",
        };
      case "role":
        return {
          title: <>Which best describes you?</>,
          body: (
            <div className="eoi-choices" role="radiogroup" aria-label="Which best describes you">
              {ROLES.map((r, i) => (
                <button
                  key={r.value}
                  type="button"
                  role="radio"
                  aria-checked={a.role === r.value}
                  className="eoi-choice"
                  data-on={a.role === r.value ? "true" : "false"}
                  data-autofocus={i === 0 ? "" : undefined}
                  onClick={() => pickRole(r.value)}
                >
                  <kbd>{KEYS[i]}</kbd>
                  <span>{r.label}</span>
                  <Check className="tick" size={18} weight="bold" />
                </button>
              ))}
            </div>
          ),
        };
      case "programmes":
        return {
          title: student ? <>Which programme(s) interest you?</> : <>Which programme(s) would your institution consider for student nominations?</>,
          help: <>Choose all that apply.</>,
          body: (
            <div className="eoi-progs">
              {PROGRAMMES.map((p, i) => {
                const on = a.programmes.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    className="eoi-prog"
                    data-on={on ? "true" : "false"}
                    data-autofocus={i === 0 ? "" : undefined}
                    style={{ "--hue": p.hue } as CSSProperties}
                    onClick={() => toggleProgramme(p.id)}
                  >
                    <kbd>{KEYS[i]}</kbd>
                    <span className="t">{p.title}</span>
                    <span className="m">
                      {p.withLT ? "With L&T" : "iOS Developer programme"} · {p.fee}
                    </span>
                    <Check className="tick" size={18} weight="bold" />
                  </button>
                );
              })}
            </div>
          ),
        };
      case "name":
        return {
          title: <>Your full name</>,
          body: <Field label="Full name">{text("fullName", { autoComplete: "name" })}</Field>,
        };
      case "email":
        return {
          title: student ? <>Your email address</> : <>Official university email address</>,
          body: (
            <Field label="Email">
              {text("email", { type: "email", inputMode: "email", autoComplete: "email", placeholder: student ? "you@example.com" : "name@university.edu" })}
            </Field>
          ),
          help: personal && !student ? <>This looks like a personal address. If you have an official university email, please use that.</> : undefined,
        };
      case "institution":
        return {
          title: student ? <>Your university or college</> : <>University / institution name</>,
          body: <Field label={student ? "University or college" : "Institution"}>{text("institution", { autoComplete: "organization", placeholder: "Full name" })}</Field>,
        };
      case "position":
        return {
          title: <>Your role / job title</>,
          body: <Field label="Role or job title">{text("position", { autoComplete: "organization-title", placeholder: "e.g. Director, International Office" })}</Field>,
        };
      case "country":
        return {
          title: student ? <>Country or region you study in</> : <>Country or region</>,
          body: <CountrySelect value={a.country} onChange={(c) => set("country", c)} label="Country or region" autoFocus />,
        };
      case "numbers":
        return {
          title: <>Indicative number of students</>,
          help: <>In total, across the programmes you chose. A rough figure is fine, or mark it TBC.</>,
          body: (
            <div className="eoi-total">
              <input
                type="text"
                inputMode="numeric"
                aria-label="Indicative number of students"
                data-autofocus
                value={a.students === "TBC" ? "" : a.students}
                placeholder={a.students === "TBC" ? "TBC" : "0"}
                disabled={a.students === "TBC"}
                onChange={(e) => set("students", e.target.value.replace(/\D/g, "").slice(0, 4))}
              />
              <button
                type="button"
                className="eoi-tbc"
                aria-pressed={a.students === "TBC"}
                data-on={a.students === "TBC" ? "true" : "false"}
                onClick={() => set("students", a.students === "TBC" ? "" : "TBC")}
              >
                TBC
              </button>
            </div>
          ),
        };
      case "office":
        return {
          title: <>A contact at your university&rsquo;s international office</>,
          help: <>Places usually come through your university. If you share a contact there, we can include them when we reply.</>,
          body: (
            <Field label="Their email" optional>
              <input data-autofocus type="email" inputMode="email" value={a.officeContact} onChange={(e) => set("officeContact", e.target.value)} placeholder="international@university.edu" />
            </Field>
          ),
        };
      case "notes":
        return {
          title: <>Questions or context for the International Office</>,
          body: (
            <Field label="Your note" optional>
              <textarea data-autofocus rows={4} value={a.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Type here…" maxLength={1500} />
            </Field>
          ),
          hint: "Ctrl + Enter to continue",
        };
      case "review": {
        const rows: Array<[string, string, StepId]> = [
          ["Programmes", a.programmes.map(programmeLabel).join(", "), "programmes"],
          ["Name", a.fullName, "name"],
          ["Email", a.email, "email"],
          [student ? "University" : "Institution", a.institution, "institution"],
          ...(student ? [] : ([["Role", a.position, "position"]] as Array<[string, string, StepId]>)),
          ["Country or region", a.country, "country"],
          ...(student
            ? a.officeContact
              ? ([["International office contact", a.officeContact, "office"]] as Array<[string, string, StepId]>)
              : []
            : ([
                ["Indicative students", a.students, "numbers"],
              ] as Array<[string, string, StepId]>)),
        ];
        return {
          title: <>One last look.</>,
          body: (
            <div className="eoi-review">
              <dl>
                {rows.map(([k, v, s]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                    <button type="button" onClick={() => go(s, -1)} aria-label={`Edit ${k}`}>
                      <PencilSimple size={14} /> Edit
                    </button>
                  </div>
                ))}
              </dl>
              <label className="eoi-consent">
                <input type="checkbox" data-autofocus checked={a.consent} onChange={(e) => set("consent", e.target.checked)} />
                <span>
                  I agree that Galgotias University&rsquo;s international office may use these
                  details to contact me about the International Short-Term Programmes.
                </span>
              </label>
            </div>
          ),
          cta: status === "sending" ? "Sending…" : "Send",
        };
      }
    }
  })();

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: reduced ? 0 : d * 48, filter: reduced ? "none" : "blur(6px)" }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, y: reduced ? 0 : d * -48, filter: reduced ? "none" : "blur(6px)" }),
  };

  const progress = status === "done" ? 1 : questionNo / total;
  const chosen = PROGRAMMES.find((p) => a.programmes.includes(p.id));

  return (
    <section
      className="eoi"
      style={{ "--accent": chosen?.hue ?? "var(--clay)" } as CSSProperties}
      onKeyDown={onKeyDown}
    >
      <header className="eoi-bar">
        <Link href="/learn-in-india" className="eoi-back">
          <ArrowLeft size={15} weight="bold" /> <span>The programmes</span>
        </Link>
        <p className="eoi-title">Galgotias University · International Short-Term Programmes</p>
        <p className="eoi-count" aria-live="polite">
          {status === "done" ? "Sent" : step === "welcome" ? "About 3 min" : `${questionNo} of ${total}`}
        </p>
      </header>

      <div
        className="eoi-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Form progress"
      >
        <motion.span className="eoi-progress-fill" animate={{ scaleX: progress }} transition={{ type: "spring", stiffness: 90, damping: 20 }} />
        <motion.span className="eoi-plane" animate={{ left: `${progress * 100}%` }} transition={{ type: "spring", stiffness: 90, damping: 20 }} aria-hidden>
          <svg viewBox="-36 -14 40 28">
            <path d="M0 0 L-34 -12 L-24 0 Z" fill="var(--ivory)" />
            <path d="M0 0 L-24 0 L-30 10 Z" fill="var(--shade)" />
            <path d="M0 0 L-34 -12 L-24 0 L-30 10 Z M-24 0 L0 0" fill="none" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </div>

      <div className="eoi-stage" ref={stageRef}>
        {status === "done" ? (
          <motion.div className="eoi-q eoi-done" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <h1>Thank you, {a.fullName.trim().split(/\s+/)[0]}.</h1>
            <p className="eoi-help">
              We&rsquo;ve received your expression of interest. Your reference is{" "}
              <strong>{reference}</strong>. Galgotias University&rsquo;s international office will get
              back to you at <strong>{a.email}</strong>.
            </p>
            <p className="eoi-help">
              Questions in the meantime: <a href={`mailto:${EDITION.email}`}>{EDITION.email}</a>
            </p>
            <div className="eoi-actions">
              <Link href="/learn-in-india#programmes" className="btn btn-primary">
                <ArrowLeft size={16} weight="bold" /> Back to the programmes
              </Link>
              <Link href="/learn-in-india#notes" className="btn btn-quiet">
                Programme notes
              </Link>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              className="eoi-q"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduced ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              role="group"
              aria-labelledby={`q-${step}`}
            >
              {question.kicker && <p className="eoi-kicker">{question.kicker}</p>}
              <h1 id={`q-${step}`} className={step === "welcome" ? "eoi-welcome" : undefined}>
                {question.title}
              </h1>
              {question.help && <p className="eoi-help">{question.help}</p>}
              {question.body && <div className="eoi-body">{question.body}</div>}

              <div className="eoi-error" role="alert" aria-live="assertive">
                {error && (
                  <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    {error}
                  </motion.span>
                )}
              </div>

              <div className="eoi-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setTouched(true);
                    next();
                  }}
                  disabled={status === "sending"}
                  data-autofocus={step === "welcome" ? "" : undefined}
                >
                  {question.cta ?? "OK"} <ArrowRight size={16} weight="bold" />
                </button>
                <span className="eoi-hint">
                  {question.hint ?? (
                    <>
                      or press <strong>Enter</strong> <KeyReturn size={14} />
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {status !== "done" && step !== "welcome" && (
        <div className="eoi-nav">
          <button type="button" onClick={back} aria-label="Previous question">
            <CaretUp size={16} weight="bold" />
          </button>
          <button type="button" onClick={next} aria-label="Next question">
            <CaretDown size={16} weight="bold" />
          </button>
        </div>
      )}
    </section>
  );
}
