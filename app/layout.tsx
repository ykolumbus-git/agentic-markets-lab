import type { Metadata } from "next";
import { siteUrl } from "./content";
import "./globals.css";

export const metadataBase = new URL(`${siteUrl}/`);

export const metadata: Metadata = {
  title: "Agentic Markets Lab",
  description:
    "Agentic Markets Lab is a new interdisciplinary research lab studying learning agents, markets, incentives, collective behavior, and human–AI interaction. Recruiting PhD students and postdoctoral researchers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
