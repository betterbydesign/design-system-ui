/**
 * Fullscreen Layout
 * 
 * Minimal layout for full-width pages like the Theme Generator.
 * No sidebar, no padding - content fills the entire viewport.
 */
export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
