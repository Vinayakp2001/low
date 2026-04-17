"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { SuccessCard } from "@/components/ui/success-card";
import { ErrorBanner } from "@/components/ui/error-banner";
import { postContact } from "@/lib/api";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export function ContactSection() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleBlur(field: keyof FormState) {
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    setServerError("");
    try {
      await postContact({ ...values, subject: "Homepage inquiry", honeypot: "" });
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight mb-6">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Have a question or want to discuss your legal needs? Send us a message and we&apos;ll respond within one business day.
            </p>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                rsathelawfirm@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                96496 44440 / 91351 79011
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                Bani Park, Jaipur - 302016
              </li>
            </ul>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <SuccessCard
                title="Message received"
                message="Thank you for reaching out. We'll be in touch within one business day."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {serverError && <ErrorBanner message={serverError} />}

                <FormField label="Name" htmlFor="cs-name" error={errors.name} required>
                  <Input
                    id="cs-name"
                    value={values.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Your name"
                    aria-describedby={errors.name ? "cs-name-error" : undefined}
                  />
                </FormField>

                <FormField label="Email" htmlFor="cs-email" error={errors.email} required>
                  <Input
                    id="cs-email"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@company.com"
                    aria-describedby={errors.email ? "cs-email-error" : undefined}
                  />
                </FormField>

                <FormField label="Message" htmlFor="cs-message" error={errors.message} required>
                  <Textarea
                    id="cs-message"
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    placeholder="How can we help?"
                    aria-describedby={errors.message ? "cs-message-error" : undefined}
                  />
                </FormField>

                {/* Honeypot */}
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} aria-hidden="true" />

                <SubmitButton loading={loading}>Send Message</SubmitButton>
              </form>
            )}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
