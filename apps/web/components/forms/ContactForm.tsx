"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { ErrorBanner } from "@/components/ui/error-banner";
import { SuccessCard } from "@/components/ui/success-card";
import { postContact } from "@/lib/api";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(fields: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = validate(fields);
  const visibleErrors: FieldErrors = Object.fromEntries(
    Object.entries(errors).filter(([key]) => touched[key])
  );

  function handleBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleChange(field: string, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mark all touched to show all errors
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setServerError("");
    try {
      await postContact({ ...fields, honeypot });
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <SuccessCard
        title="Message received"
        message="Thank you for reaching out. We'll be in touch within one business day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && <ErrorBanner message={serverError} />}

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary mb-1.5">
          Full name <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-describedby={visibleErrors.name ? "contact-name-error" : undefined}
          aria-invalid={!!visibleErrors.name}
        />
        {visibleErrors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-error">{visibleErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-1.5">
          Email address <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-describedby={visibleErrors.email ? "contact-email-error" : undefined}
          aria-invalid={!!visibleErrors.email}
        />
        {visibleErrors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-error">{visibleErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-text-primary mb-1.5">
          Subject <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Input
          id="contact-subject"
          type="text"
          value={fields.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-describedby={visibleErrors.subject ? "contact-subject-error" : undefined}
          aria-invalid={!!visibleErrors.subject}
        />
        {visibleErrors.subject && (
          <p id="contact-subject-error" className="mt-1.5 text-xs text-error">{visibleErrors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary mb-1.5">
          Message <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Textarea
          id="contact-message"
          rows={5}
          value={fields.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-describedby={visibleErrors.message ? "contact-message-error" : undefined}
          aria-invalid={!!visibleErrors.message}
        />
        {visibleErrors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-error">{visibleErrors.message}</p>
        )}
      </div>

      <SubmitButton loading={loading} className="w-full sm:w-auto">
        Send Message
      </SubmitButton>
    </form>
  );
}
