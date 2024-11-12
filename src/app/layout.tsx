import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads API Demo",
  description: "Demo application for the Threads API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        <main className="container mx-auto py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
