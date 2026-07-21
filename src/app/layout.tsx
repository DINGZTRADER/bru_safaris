import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SafariConcierge } from "@/components/safari-concierge";
import { site } from "@/content/site";
import "./globals.css";
import "./brand.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"], display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "Bru-Safaris | Private Rwanda Safaris", template: "%s | Bru-Safaris" }, description: "Thoughtfully designed private Rwanda safaris, gorilla trekking and East African journeys from our team in Kigali.", openGraph: { type: "website", locale: "en_US", siteName: site.name }, alternates: { canonical: "/" } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en" className={`${display.variable} ${sans.variable}`}><body><a className="skip" href="#content">Skip to content</a><Header/><main id="content">{children}</main><Footer/><SafariConcierge/><Analytics/><SpeedInsights/></body></html> }
