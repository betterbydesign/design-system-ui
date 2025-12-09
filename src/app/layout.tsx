import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Altitude Design System",
  description: "Design system tokens and components for Altitude Marketing",
};

/**
 * Root Layout
 * 
 * Minimal root layout that just provides html/body wrapper with font.
 * Page-specific layouts (sidebar, fullscreen, etc.) are handled by route groups.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
