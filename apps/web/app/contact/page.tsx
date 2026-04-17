import { Mail, Phone, MapPin } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getOfficeInfo } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackContact = {
  email: "rsathelawfirm@gmail.com",
  phone: "96496 44440",
  address: "306, Bhavya Tower, Kabir Marg",
  city: "Bani Park, Jaipur - 302016",
};

export default async function ContactPage() {
  const officeInfo = await getOfficeInfo().catch(() => null);
  const contactInfo = {
    email: officeInfo?.email ?? fallbackContact.email,
    phone: officeInfo?.phone ?? fallbackContact.phone,
    address: officeInfo?.address ?? fallbackContact.address,
    city: officeInfo ? `${officeInfo.city}, ${officeInfo.state} ${officeInfo.zip}` : fallbackContact.city,
  };
  return (
    <main>
      <Section variant="stone">
        <PageContainer>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-2xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl">
            Have a question or want to discuss your legal needs? Send us a message and we&apos;ll respond within one business day.
          </p>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">
                  Contact Info
                </p>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-text-primary hover:text-accent transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                        className="text-sm text-text-primary hover:text-accent transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Office</p>
                      <p className="text-sm text-text-primary">{contactInfo.address}</p>
                      <p className="text-sm text-text-secondary">{contactInfo.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  Office Hours
                </p>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>Monday – Saturday: 10am – 6pm IST</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
