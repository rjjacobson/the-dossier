import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Dossier — NY Political Tracker",
  description: "Track where every New York elected official stands on Israel and Jewish issues. From your school board to the US Senate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <nav className="border-b border-gray-100 px-4 py-3">
          <div className="max-w-[720px] mx-auto flex items-center justify-between">
            <Link href="/" className="text-[15px] font-bold text-[#1a3a5c]">
              The Dossier
            </Link>
            <Link href="/methodology" className="text-xs text-gray-500 hover:text-gray-700">
              Methodology
            </Link>
          </div>
        </nav>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-gray-100 px-4 py-4 text-center">
          <p className="text-[11px] text-gray-400">
            Tracking elected officials&apos; positions on Israel and Jewish issues.{' '}
            <Link href="/methodology" className="underline hover:text-gray-600">
              Read our methodology
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
