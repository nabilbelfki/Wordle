import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Settings from "./components/Settings/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wordle | Guess the Hidden Word",
    template: "%s | Wordle",
  },
  description: "A fun Wordle-like game where you guess the hidden word in 6 attempts. Play daily and challenge your friends!",
  keywords: ["wordle", "word game", "puzzle", "word puzzle", "daily word game"],
  authors: [{ name: "Nabil Belfki", url: "https://nabilbelfki.com" }],
  metadataBase: new URL("https://nabilbelfki.com"),
  openGraph: {
    title: "Wordle | Guess the Hidden Word",
    description: "A fun Wordle-like game where you guess the hidden word in 6 attempts. Play daily and challenge your friends!",
    url: "https://nabilbelfki.com",
    siteName: "Wordle",
    images: [
      {
        url: "/wordle.svg",
        width: 1200,
        height: 630,
        alt: "Wordle - A Daily Word Guessing Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wordle | Guess the Hidden Word",
    description: "A fun Wordle-like game where you guess the hidden word in 6 attempts. Play daily and challenge your friends!",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/wordle.svg", // Apple touch icon
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Franklin+Gothic:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <Settings />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}