import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/clientwrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://adresnetwork.iitr.ac.in"
  ),
  title: {
    default: "ADRES Network",
    template: "%s | ADRES Network",
  },
  description:
    "Connecting Centers of Excellence and Researchers across India.",
  keywords: ["research", "center of excellence", "COE", "ICARS", "India"],

  // ✅ ADD THIS PART (favicon.io setup)
  icons: {
    icon: [
      { url: "/favicon.ico" },                 // standard favicon
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

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
