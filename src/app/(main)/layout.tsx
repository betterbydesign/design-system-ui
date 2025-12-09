import { Sidebar } from "@/components/Sidebar";

/**
 * Main Layout
 * 
 * Layout for standard pages with sidebar navigation and content wrapper.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[var(--sidebar-width)] overflow-y-auto">
        <div className="max-w-[var(--layout-wide-width)] mx-auto px-[var(--spacing-8)] py-[var(--spacing-8)]">
          {children}
        </div>
      </main>
    </div>
  );
}
