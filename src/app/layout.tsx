import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SafariConcierge } from "@/components/safari-concierge";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
export const metadata: Metadata = { metadataBase: new URL("https://brusafaris.com"), title: { default: "bru Safaris | Remarkable Rwanda, Personally Designed", template: "%s | bru Safaris" }, description: "Private gorilla trekking, chimpanzee tracking and Big Five safaris across Rwanda, designed by local experts.", openGraph: { title: "bru Safaris", description: "Remarkable Rwanda, personally designed.", type: "website" } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body className="antialiased"><Header />{children}<Footer /><SafariConcierge /></body></html>;
}
