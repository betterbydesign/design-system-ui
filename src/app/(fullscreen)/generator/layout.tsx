import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Generator - Altitude Design System",
  description: "Create and export custom themes using the Altitude Design System token architecture",
};

/**
 * Generator Layout
 * 
 * Minimal layout wrapper for the theme generator.
 * The actual layout is handled by ThemeGeneratorLayout component.
 */
export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
