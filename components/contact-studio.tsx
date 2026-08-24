"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  Graduate,
  Handshake,
  PlaneTakeoff,
  ShieldCheck,
  Users,
} from "./icons";
import { ENQUIRY_TYPES } from "@/lib/data";

const routes = [
  {
    title: "International admissions",
    hint: "Arriving at Galgotias University",
    Icon: Graduate,
  },
  {
    title: "Outbound mobility",
    hint: "Studying, building or competing abroad",
    Icon: PlaneTakeoff,
  },
  {
    title: "Institutional partnerships",
    hint: "Exchange, research, pathways and MoUs",
    Icon: Handshake,
  },
  {
    title: "Visa and FRRO",
    hint: "Compliance and arrival support",
    Icon: ShieldCheck,
  },
  {
    title: "Something else",
    hint: "Let the office route your question",
    Icon: Users,
  },
];

export function ContactStudio() {
  const [selected, setSelected] = useState(routes[0].title);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact-studio section-pad" id="enquiry">
      <div className="site-shell contact-grid">
        <div>
          <p className="statement-kicker">Route your enquiry</p>
          <h2 className="section-title">Start in the right place.</h2>
          <p className="section-copy">
            Choose the closest route. Your selection travels with the form so the right desk can respond.
          </p>
          <div className="router-list">
            {routes.map(({ title, hint, Icon }) => (
              <button
                className="router-button"
                data-selected={selected === title ? "true" : "false"}
                key={title}
                type="button"
                onClick={() => {
                  setSelected(title);
                  setSubmitted(false);
                }}
              >
                <Icon size={24} aria-hidden />
                <div>
                  <strong>{title}</strong>
                  <span>{hint}</span>
                </div>
                <ArrowRight size={18} weight="bold" aria-hidden />
              </button>
            ))}
          </div>
        </div>

        <div>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-head">
              <strong>{selected}</strong>
              <span>Response route selected</span>
            </div>
            <div className="form-body">
              <div className="form-field">
                <label htmlFor="full-name">Full name</label>
                <input id="full-name" name="fullName" autoComplete="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="form-field">
                <label htmlFor="country">Country or region</label>
                <input id="country" name="country" autoComplete="country-name" />
              </div>
              <div className="form-field">
                <label htmlFor="enquiry-type">Programme or enquiry type</label>
                <select id="enquiry-type" name="enquiryType" defaultValue="">
                  <option value="" disabled>Select one</option>
                  {ENQUIRY_TYPES.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="intake">Intended intake</label>
                <input id="intake" name="intake" placeholder="For example, Winter 2026" />
              </div>
              <div className="form-field form-field-full">
                <label htmlFor="message">What would you like to move forward?</label>
                <textarea id="message" name="message" required />
              </div>
              <button className="form-submit" type="submit">
                Send to the International Office
              </button>
            </div>
          </form>
          {submitted ? (
            <div className="form-success" role="status">
              <Check size={24} weight="bold" aria-hidden />
              <span>
                <strong>Your route is ready.</strong><br />
                This prototype confirms the interaction. Connect the form endpoint before launch.
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
