"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 bg-surface z-50 flex flex-col shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Link href="/" onClick={onClose} aria-label="RSA-THE LAW FIRM — Home">
            <Image
              src="/logo.png"
              alt="RSA-THE LAW FIRM"
              width={40}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-base font-medium text-text-primary border-b border-border/50 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 pb-8">
          <Link
            href="/consultation"
            onClick={onClose}
            className="block w-full text-center bg-accent text-white px-6 py-3 rounded-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
