import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Altitude Design System",
  description: "Design system tokens and components for Altitude Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[var(--sidebar-width)] overflow-y-auto">
            <div className="max-w-[var(--layout-wide-width)] mx-auto px-[var(--spacing-8)] py-[var(--spacing-8)]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
