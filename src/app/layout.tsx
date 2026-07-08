import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Umar Zaki Gunawan — Engineering Physics & Software Engineer",
  description:
    "Portfolio of Umar Zaki Gunawan: bridging software engineering, scientific computing, embedded systems, and semiconductor R&D.",
  openGraph: {
    title: "Umar Zaki Gunawan — Engineering Physics & Software Engineer",
    description:
      "Modern Engineering + Scientific Research + Digital Laboratory portfolio.",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gainsboro text-charcoal selection:bg-light-salmon-2 selection:text-charcoal">
        {children}
      </body>
    </html>
  );
}
