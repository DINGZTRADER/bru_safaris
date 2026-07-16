import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MessageCircle } from "lucide-react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
export const metadata: Metadata = { metadataBase: new URL("https://brusafaris.com"), title: { default: "bru Safaris | Remarkable Rwanda, Personally Designed", template: "%s | bru Safaris" }, description: "Private gorilla trekking, chimpanzee tracking and Big Five safaris across Rwanda, designed by local experts.", openGraph: { title: "bru Safaris", description: "Remarkable Rwanda, personally designed.", type: "website" } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body className="antialiased"><Header />{children}<Footer /><a href="https://wa.me/250798978710?text=Hello%20bru%20Safaris%2C%20I%27d%20like%20to%20plan%20a%20Rwanda%20safari." target="_blank" rel="noreferrer" aria-label="Chat with bru Safaris on WhatsApp" className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"><MessageCircle className="size-6" /></a></body></html>;
}
