import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sumit · Full-Stack Engineer & SRE",
  description:
    "Portfolio of Sumit, a full-stack engineer building TypeScript products, AI tools, and enterprise systems. SRE L3 by day, side-project builder by night.",
  keywords: [
    "Full-Stack Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "SRE",
    "Portfolio",
  ],
  metadataBase: new URL("https://sumit.dev"),
  authors: [{ name: "Sumit" }],
  openGraph: {
    title: "Sumit · Full-Stack Engineer & SRE",
    description: "Building products that ship, scale, and feel good to use.",
    url: "https://sumit.dev",
    siteName: "Sumit Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sumit Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit · Full-Stack Engineer & SRE",
    description: "Building products that ship, scale, and feel good to use.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sumit",
              url: "https://sumit.dev",
              jobTitle: "Full-Stack Engineer",
              sameAs: [
                "https://github.com/YOUR_HANDLE",
                "https://linkedin.com/in/YOUR_HANDLE",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
