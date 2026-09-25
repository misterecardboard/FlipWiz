import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlipWiz — Know Before You Buy",
  description: "Free resale calculators that help you check profit, break-even price, and maximum buy price before you flip.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
