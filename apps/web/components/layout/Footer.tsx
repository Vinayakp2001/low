import Link from "next/link";
import Image from "next/image";

const practiceAreas = [
  { label: "Civil Litigation", href: "/services/civil-litigation" },
  { label: "Criminal Defense", href: "/services/criminal-defense" },
  { label: "Personal Injury", href: "/services/personal-injury" },
  { label: "Family Law", href: "/services/family-law" },
  { label: "Employment Disputes", href: "/services/employment-disputes" },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg text-dark-text">
      <div className="container-legal py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="RSA-THE LAW FIRM — Home">
              <Image
                src="/logo.png"
                alt="RSA-THE LAW FIRM"
                width={56}
                height={56}
                className="h-14 w-auto object-contain mb-3"
              />
            </Link>
            <p className="text-sm text-dark-text/60 leading-relaxed max-w-xs">
              Experienced litigation attorneys fighting for your rights in court and at the negotiating table.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dark-text/40 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-text/70 hover:text-dark-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dark-text/40 mb-4">
              Practice Areas
            </p>
            <ul className="space-y-2.5">
              {practiceAreas.map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    className="text-sm text-dark-text/70 hover:text-dark-text transition-colors"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dark-text/40 mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-dark-text/70">
              <li>
                <a href="mailto:rsathelawfirm@gmail.com" className="hover:text-dark-text transition-colors">
                  rsathelawfirm@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:rajneesh458@gmail.com" className="hover:text-dark-text transition-colors">
                  rajneesh458@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919649644440" className="hover:text-dark-text transition-colors">
                  96496 44440
                </a>
              </li>
              <li>
                <a href="tel:+919135179011" className="hover:text-dark-text transition-colors">
                  91351 79011
                </a>
              </li>
              <li className="leading-relaxed">
                306, Bhavya Tower, Kabir Marg<br />
                Bani Park, Jaipur - 302016
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-text/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dark-text/40">
          <p>© {year} RSA-THE LAW FIRM — Rajneesh Sharma Associates. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-dark-text/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-dark-text/70 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-dark-text/70 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
