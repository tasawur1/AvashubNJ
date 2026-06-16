import type { Metadata } from "next";
import "./fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ScrollRevealController } from "@/components/ScrollRevealController";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://avashubnj.com";

const defaultTitle =
  "Ava's Hub | Life Skills & Independence for Kids, Teens & Young Adults";

const defaultDescription =
  "Ava's Hub provides occupational therapy-based life skills, independence, social skills, after-school programs, and vocational support for children, teens, and young adults in East Orange, NJ.";

const defaultKeywords = [
  "occupational therapy East Orange NJ",
  "pediatric OT",
  "teen life skills",
  "autism support",
  "NJ FamilyCare OT",
  "DDD programs",
  "Ava's Hub",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Ava's Hub",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ava's Hub",
    title: defaultTitle,
    description:
      "Occupational therapy-based life skills, after-school programs, and vocational support for neurodiverse youth in East Orange, NJ.",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Occupational therapy-based life skills and independence programming in East Orange, NJ.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Script
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_SITE_ID}`}
          strategy="afterInteractive"
        />
        <Header />
        <ScrollRevealController />
        {children}
      </body>
    </html>
  );
}
