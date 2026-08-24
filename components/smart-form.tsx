"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "./icons";

export function SmartForm({
  children,
  submitLabel,
  successTitle = "Enquiry received.",
  successText = "The International Office will review your submission and respond by email shortly.",
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle?: string;
  successText?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    window.setTimeout(() => setState("done"), 900);
  };

  if (state === "done") {
    return (
      <div className="panel hatch p-10 text-center sm:p-14">
        <span
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center bg-crimson text-white"
        >
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.03em]">
          {successTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-soot">
          {successText}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-outline-dark btn-sm mt-9"
        >
          <span>Send another enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {children}
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-10 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        <span>{state === "sending" ? "Submitting…" : submitLabel}</span>
        {state !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
