import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://notoow.github.io/fix-user-scope-installation-error";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fix User Scope Installation Error | RunAsUser - Windows Admin Fix",
  description: "Instantly fix 'Updates are disabled because you are running as Administrator' and 'This User Installer is not meant to be run as Administrator' errors. Works with VS Code, Cursor, Antigravity. One-click solution.",
  keywords: [
    "This User Installer is not meant to be run as an Administrator",
    "User Installer is not meant to be run as Administrator",
    "Updates are disabled because you are running as Administrator",
    "User scope installation error fix",
    "download the System Installer instead",
    "Run as invoker windows 10",
    "Run as invoker windows 11",
    "VS Code user setup admin error",
    "VS Code updates disabled administrator",
    "Cursor IDE admin error",
    "Antigravity update fail",
    "Antigravity installer admin error",
    "runas trustlevel 0x20000",
    "Windows UAC fix",
    "De-elevate admin privileges",
    "user installer admin error",
    "electron app admin error",
    "install for all users error"
  ],
  authors: [{ name: "RunAsUser" }],
  creator: "RunAsUser",
  publisher: "RunAsUser",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Fix 'User Installer is not meant to be run as Administrator'",
    description: "One-click solution. No registry edits. Works with VS Code, Cursor, Antigravity.",
    url: siteUrl,
    siteName: "RunAsUser",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fix User Installer is not meant to be run as Administrator - One-click solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix 'User Installer is not meant to be run as Administrator'",
    description: "One-click solution. No registry edits. Works with VS Code, Cursor, Antigravity.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "RunAsUser",
              "description": "Fix User Scope Installation Errors on Windows",
              "url": siteUrl,
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Windows 10, Windows 11",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
