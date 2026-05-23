import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});
