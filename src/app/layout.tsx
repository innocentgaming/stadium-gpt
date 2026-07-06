import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/ui/SkipToContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "StadiumGPT — AI Operating System for FIFA World Cup Stadiums",
  description:
    "StadiumGPT powers 16 World Cup 2026 venues with 8 AI agents, real-time computer vision, and intelligent crowd management — serving 100K+ fans per match.",
  keywords: [
    "StadiumGPT", "FIFA", "World Cup 2026", "AI", "Smart Stadium",
    "Computer Vision", "LLM", "Crowd Management", "IoT",
  ],
  openGraph: {
    title: "StadiumGPT — AI Operating System for FIFA World Cup Stadiums",
    description: "The AI Operating System powering FIFA World Cup 2026 venues.",
    type: "website",
    siteName: "StadiumGPT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-text-primary font-body">
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}
