import type { Metadata } from "next";
import { Inter } from "next/font/google";   // ✅ Using Inter
import "./globals.css";
import ClientWrapper from "@/components/clientwrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://adresnetwork.iitr.ac.in"),
  title: {
    default: "ADRES Network",
    template: "%s | ADRES Network",   // ← every page title becomes "Page | ICARS Network"
  },
  description: "Connecting Centers of Excellence and Researchers across India.",
  keywords: ["research", "center of excellence", "COE", "ICARS", "India" ],
  openGraph: {
    siteName: "ADRES Network",
    locale: "en_IN",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
