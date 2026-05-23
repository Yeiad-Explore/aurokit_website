import type { Metadata } from "next";
import "./globals.css";
import { sans, mono, serif } from "./fonts";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Aurokit — AI Automation, engineered for compounding leverage.",
  description:
    "Aurokit designs and ships AI automation systems that quietly do the work — orchestrated agents, custom pipelines, and ops infrastructure that scales without headcount.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Aurokit — AI Automation, engineered for compounding leverage.",
    description:
      "Custom AI agents, automation pipelines, and ops infrastructure that scales without headcount.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
