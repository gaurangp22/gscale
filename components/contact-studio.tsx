"use client";

import { FormEvent, useState } from "react";
import {
  AirplaneLanding,
  AirplaneTakeoff,
  ArrowRight,
  Buildings,
  CalendarBlank,
  CheckCircle,
  Question,
  UsersThree,
} from "@phosphor-icons/react";
import { INQUIRY_CATEGORIES } from "@/lib/site-content";

const icons = [
  AirplaneTakeoff,
  AirplaneLanding,
  Buildings,
  CalendarBlank,
  UsersThree,
  Question,
];

export function ContactStudio() {
  const [selected, setSelected] = useState<(typeof INQUIRY_CATEGORIES)[number]>(
    INQUIRY_CATEGORIES[0],
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact-workspace" id="inquiry">
      <div className="contact-router" aria-label="Choose an inquiry category">
        <h2>Start by choosing what this is about.</h2>
        <p>
          The category decides who reads your message first, so it is worth
          thirty seconds. Everything else is on the form.
        </p>
        <div>
          {INQUIRY_CATEGORIES.map((category, index) => {
            const Icon = icons[index];
            return (
              <button
                type="button"
                key={category}
                data-selected={selected === category}
                onClick={() => {
                  setSelected(category);
                  setSubmitted(false);
                }}
              >
                <Icon size={23} aria-hidden />
                <span>{category}</span>
                <ArrowRight size={18} aria-hidden />
              </button>
            );
          })}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-selection">
          <div>
            <span>Selected inquiry</span>
            <strong>{selected}</strong>
          </div>
          <a href="#inquiry">Change category</a>
        </div>
        <input type="hidden" name="category" value={selected} />

        <div className="form-grid">
          <label className="form-field form-field-wide">
            Full name
            <input name="fullName" autoComplete="name" required />
          </label>
          <label className="form-field">
            Institutional email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="form-field">
            Organization or department
            <input name="organization" autoComplete="organization" required />
          </label>
          <label className="form-field">
            Role
            <input name="role" autoComplete="organization-title" required />
          </label>
          <label className="form-field">
            Country or region
            <input name="country" autoComplete="country-name" required />
          </label>
          <label className="form-field">
            Program or initiative <span>(optional)</span>
            <input name="program" />
          </label>
          <label className="form-field">
            Proposed dates <span>(optional)</span>
            <input name="dates" placeholder="For example, October 2026" />
          </label>
          <label className="form-field form-field-wide">
            Message
            <textarea name="message" rows={6} required />
          </label>
        </div>

        <button type="submit" className="form-submit">Submit inquiry</button>

        {submitted ? (
          <div className="form-success" role="status">
            <CheckCircle size={25} weight="fill" aria-hidden />
            <div>
              <strong>Your inquiry is ready.</strong>
              <span>This local preview does not transmit data. Connect the approved University endpoint before launch.</span>
            </div>
          </div>
        ) : null}
      </form>
    </section>
  );
}
