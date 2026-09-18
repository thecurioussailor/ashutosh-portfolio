import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashutosh Sagar — Software Engineer",
  description:
    "Software engineer building products, systems, and infrastructure — from developer tools to systems running on-chain.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <SmoothScroll>
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
