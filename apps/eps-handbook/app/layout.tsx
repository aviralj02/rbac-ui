import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EPS Guide",
  description:
    "A focused practical language and standard for rendering interfaces from permissions with deterministic rules small surface area and strong ergonomics",
  openGraph: {
    title: "EPS Guide",
    description:
      "A focused practical language and standard for rendering interfaces from permissions with deterministic rules small surface area and strong ergonomics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
