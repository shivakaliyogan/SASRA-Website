import type { Metadata, Viewport } from "next";
import ThemeSync from "@/components/ThemeSync";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
export const metadata: Metadata = {
  title: "Sri Adhinarayana Swamy Rajayogashramam",
  description:
    "Official devotional portal for temples, poojas, festivals, donations, spiritual knowledge and community service.",
  manifest: "/manifest.json",
  keywords: [
    "Sri Adhinarayana Swamy Rajayogashramam",
    "Hindu temple",
    "pooja booking",
    "donations",
    "festivals",
    "spiritual programs",
  ],
  openGraph: {
    title: "Sri Adhinarayana Swamy Rajayogashramam",
    description:
      "Experience divine bliss, devotion and spiritual growth.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#d6a22d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider>
            <ThemeSync />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}