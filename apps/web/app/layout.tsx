import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RSA-THE LAW FIRM — Rajneesh Sharma Associates",
    template: "%s | RSA-THE LAW FIRM",
  },
  description:
    "RSA-THE LAW FIRM — Rajneesh Sharma Associates. Experienced litigation attorneys handling civil, criminal, banking, DRT, consumer, and family law matters.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-text-primary font-body antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
