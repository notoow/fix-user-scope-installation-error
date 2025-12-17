import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RunAsUser - Fix User Scope Installation Errors | Windows Admin Fix",
  description: "Instantly fix 'Updates are disabled because you are running as Administrator' and 'User Installer is not meant to be run as Administrator' errors in VS Code, Cursor, Antigravity and more. One-click solution generator.",
  keywords: [
    "User scope installation error fix",
    "Updates are disabled administrator",
    "Run as invoker windows 10",
    "Run as invoker windows 11",
    "VS Code user setup admin error",
    "Cursor IDE admin error",
    "Antigravity update fail",
    "runas trustlevel 0x20000",
    "Windows UAC fix",
    "De-elevate admin privileges"
  ],
  authors: [{ name: "RunAsUser" }],
  openGraph: {
    title: "RunAsUser - Fix User Scope Installation Errors",
    description: "Fix Windows admin privilege conflicts in 3 seconds. Works with VS Code, Cursor, Antigravity, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
