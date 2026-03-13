import type { Metadata } from "next";
import { Inter } from "next/font/google";   // ✅ Using Inter
import "./globals.css";
import ClientWrapper from "@/components/clientwrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ADRES Network",
  description:
    "Adaptation, Resilience and Sustainability Network - Integrating research, policy, and implementation.",
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
