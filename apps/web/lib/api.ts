const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function postContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail ?? "Request failed");
  }
  return res.json();
}

export async function postConsultationRequest(data: {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  practice_area: string;
  matter_description: string;
  preferred_contact: string;
  honeypot: string;
}) {
  const res = await fetch(`${API_URL}/consultation-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail ?? "Request failed");
  }
  return res.json();
}

export async function postBookConsultation(data: {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  practice_area: string;
  matter_description: string;
  preferred_contact: string;
  honeypot: string;
}): Promise<{ checkout_url: string }> {
  const res = await fetch(`${API_URL}/book-consultation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, consultation_type: "paid" }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail ?? "Request failed");
  }
  return res.json();
}

export async function postNewsletterSubscribe(data: { email: string; honeypot: string }) {
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail ?? "Request failed");
  }
  return res.json();
}
