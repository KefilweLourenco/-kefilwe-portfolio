import type { Metadata } from "next";
import { Space_Grotesk, Public_Sans, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import CursorDot from "@/components/CursorDot";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kefilwe.dev"),
  title: "Kefilwe Lourenço — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack JavaScript com experiência em React, TypeScript e NestJS. Também instrutor de tecnologia desde 2019. Disponível para oportunidades que conectem tecnologia e pessoas.",
  openGraph: {
    title: "Kefilwe Lourenço — Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack JavaScript com experiência em React, TypeScript e NestJS. Também instrutor de tecnologia desde 2019.",
    url: "https://kefilwe.dev",
    siteName: "Kefilwe Lourenço",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/kefilwe.jpg", width: 800, height: 1000, alt: "Kefilwe Lourenço" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kefilwe Lourenço — Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack JavaScript com experiência em React, TypeScript e NestJS. Também instrutor de tecnologia desde 2019.",
    images: ["/images/kefilwe.jpg"],
  },
  alternates: {
    canonical: "https://kefilwe.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}
      >
        <ThemeProvider>
          <CursorDot />
          <a className="skip-link" href="#main">
            Pular para o conteúdo
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
