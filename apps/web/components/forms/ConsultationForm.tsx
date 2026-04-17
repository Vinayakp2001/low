"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { ErrorBanner } from "@/components/ui/error-banner";
import { SuccessCard } from "@/components/ui/success-card";
import { postConsultationRequest, postBookConsultation } from "@/lib/api";
import { cn } from "@/lib/utils";

const PRACTICE_AREAS = [
  { value: "civil-litigation", label: "Civil Litigation" },
  { value: "criminal-defense", label: "Criminal Defense" },
  { value: "personal-injury", label: "Personal Injury" },
  { value: "family-law", label: "Family Law" },
  { value: "employment-disputes", label: "Employment Disputes" },
  { value: "real-estate-disputes", label: "Real Estate Disputes" },
  { value: "other", label: "Other / Not Sure" },
];

interface Fields {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  practice_area: string;
  matter_description: string;
  preferred_contact: string;
  consultation_type: "free" | "paid";
}

interface FieldErrors {
  full_name?: string;
  email?: string;
  practice_area?: string;
  matter_description?: string;
  preferred_contact?: string;
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.full_name.trim()) errors.full_name = "Full name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (!fields.practice_area) errors.practice_area = "Please select a practice area.";
  if (!fields.matter_description.trim()) errors.matter_description = "Please briefly describe your matter.";
  if (!fields.preferred_contact) errors.preferred_contact = "Please select a preferred contact method.";
  return errors;
}

export function ConsultationForm() {
  const [fields, setFields] = useState<Fields>({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    practice_area: "",
    matter_description: "",
    preferred_contact: "",
    consultation_type: "free",
  });
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

  function handleChange(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      full_name: true, email: true, practice_area: true,
      matter_description: true, preferred_contact: true,
    });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setServerError("");

    const payload = {
      full_name: fields.full_name,
      email: fields.email,
      phone: fields.phone || undefined,
      company_name: fields.company_name || undefined,
      practice_area: fields.practice_area,
      matter_description: fields.matter_description,
      preferred_contact: fields.preferred_contact,
      honeypot,
    };

    try {
      if (fields.consultation_type === "paid") {
        const { checkout_url } = await postBookConsultation(payload);
        window.location.href = checkout_url;
      } else {
        await postConsultationRequest(payload);
        setSuccess(true);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <SuccessCard
        title="Request received"
        message="We'll review your request and reach out within one business day to confirm your consultation."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && <ErrorBanner message={serverError} />}

      {/* Honeypot */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cons-name" className="block text-sm font-medium text-text-primary mb-1.5">
            Full name <span aria-hidden="true" className="text-error">*</span>
          </label>
          <Input
            id="cons-name"
            type="text"
            autoComplete="name"
            value={fields.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            onBlur={() => handleBlur("full_name")}
            aria-invalid={!!visibleErrors.full_name}
          />
          {visibleErrors.full_name && (
            <p className="mt-1.5 text-xs text-error">{visibleErrors.full_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="cons-email" className="block text-sm font-medium text-text-primary mb-1.5">
            Email address <span aria-hidden="true" className="text-error">*</span>
          </label>
          <Input
            id="cons-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!visibleErrors.email}
          />
          {visibleErrors.email && (
            <p className="mt-1.5 text-xs text-error">{visibleErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="cons-phone" className="block text-sm font-medium text-text-primary mb-1.5">
            Phone <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <Input
            id="cons-phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cons-company" className="block text-sm font-medium text-text-primary mb-1.5">
            Company <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <Input
            id="cons-company"
            type="text"
            autoComplete="organization"
            value={fields.company_name}
            onChange={(e) => handleChange("company_name", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cons-area" className="block text-sm font-medium text-text-primary mb-1.5">
          Practice area <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Select
          id="cons-area"
          options={PRACTICE_AREAS}
          placeholder="Select a practice area"
          value={fields.practice_area}
          onChange={(e) => { handleChange("practice_area", e.target.value); handleBlur("practice_area"); }}
          aria-invalid={!!visibleErrors.practice_area}
        />
        {visibleErrors.practice_area && (
          <p className="mt-1.5 text-xs text-error">{visibleErrors.practice_area}</p>
        )}
      </div>

      <div>
        <label htmlFor="cons-matter" className="block text-sm font-medium text-text-primary mb-1.5">
          Briefly describe your matter <span aria-hidden="true" className="text-error">*</span>
        </label>
        <Textarea
          id="cons-matter"
          rows={4}
          value={fields.matter_description}
          onChange={(e) => handleChange("matter_description", e.target.value)}
          onBlur={() => handleBlur("matter_description")}
          aria-invalid={!!visibleErrors.matter_description}
          placeholder="What do you need help with?"
        />
        {visibleErrors.matter_description && (
          <p className="mt-1.5 text-xs text-error">{visibleErrors.matter_description}</p>
        )}
      </div>

      {/* Preferred contact */}
      <fieldset>
        <legend className="block text-sm font-medium text-text-primary mb-2">
          Preferred contact method <span aria-hidden="true" className="text-error">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {["Email", "Phone", "Either"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferred_contact"
                value={opt.toLowerCase()}
                checked={fields.preferred_contact === opt.toLowerCase()}
                onChange={() => { handleChange("preferred_contact", opt.toLowerCase()); handleBlur("preferred_contact"); }}
                className="accent-accent"
              />
              <span className="text-sm text-text-primary">{opt}</span>
            </label>
          ))}
        </div>
        {visibleErrors.preferred_contact && (
          <p className="mt-1.5 text-xs text-error">{visibleErrors.preferred_contact}</p>
        )}
      </fieldset>

      {/* Consultation type */}
      <fieldset className="border border-border rounded-sm p-5">
        <legend className="text-sm font-medium text-text-primary px-1">Consultation type</legend>
        <div className="space-y-3 mt-2">
          <label className={cn(
            "flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-colors",
            fields.consultation_type === "free" ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
          )}>
            <input
              type="radio"
              name="consultation_type"
              value="free"
              checked={fields.consultation_type === "free"}
              onChange={() => handleChange("consultation_type", "free")}
              className="accent-accent mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Free initial consultation</p>
              <p className="text-xs text-text-secondary mt-0.5">A 20-minute call to discuss your situation and see if we&apos;re a good fit.</p>
            </div>
          </label>

          <label className={cn(
            "flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-colors",
            fields.consultation_type === "paid" ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
          )}>
            <input
              type="radio"
              name="consultation_type"
              value="paid"
              checked={fields.consultation_type === "paid"}
              onChange={() => handleChange("consultation_type", "paid")}
              className="accent-accent mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Paid consultation — $350</p>
              <p className="text-xs text-text-secondary mt-0.5">A 60-minute deep-dive session. You&apos;ll be redirected to complete payment via Stripe.</p>
            </div>
          </label>
        </div>
      </fieldset>

      <SubmitButton loading={loading} className="w-full sm:w-auto">
        {fields.consultation_type === "paid" ? "Continue to Payment" : "Request Consultation"}
      </SubmitButton>
    </form>
  );
}
