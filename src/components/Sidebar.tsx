'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Palette, 
  Type, 
  Component,
  Eye,
  ChevronRight,
  Layers,
  Box,
  ToggleLeft,
  Square,
  Hash,
  Ruler,
  Globe,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  children?: NavItem[];
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, description: 'System overview' },
    ]
  },
  {
    section: 'Primitives',
    items: [
      { name: 'Overview', href: '/tokens/primitives', icon: Hash, description: 'Raw values' },
      { name: 'Colors', href: '/tokens/primitives/colors', icon: Palette, description: '22 color families' },
      { name: 'Typography', href: '/tokens/typography', icon: Type, description: 'Type scale & fonts' },
      { name: 'Spacing & Layout', href: '/tokens/spacing', icon: Ruler, description: '8px grid system' },
    ]
  },
  {
    section: 'Semantic Tokens',
    items: [
      { name: 'Overview', href: '/tokens/semantic', icon: Sparkles, description: 'Role-based tokens' },
      { name: 'Colors', href: '/tokens/colors', icon: Palette, description: 'Semantic colors' },
    ]
  },
  {
    section: 'Component Tokens',
    items: [
      { name: 'Overview', href: '/tokens/components', icon: Component, description: 'Button, Card, Input' },
    ]
  },
  {
    section: 'Frameworks',
    items: [
      { name: 'Greenshift / WP', href: '/frameworks/greenshift', icon: Globe, description: 'WordPress mapping' },
    ]
  },
  {
    section: 'Components',
    items: [
      { name: 'Buttons', href: '/components/buttons', icon: Square, description: 'Button variants' },
      { name: 'Cards', href: '/components/cards', icon: Box, description: 'Card layouts' },
      { name: 'Inputs', href: '/components/inputs', icon: ToggleLeft, description: 'Form elements' },
    ]
  },
  {
    section: 'Tools',
    items: [
      { name: 'Theme Preview', href: '/preview', icon: Eye, description: 'Interactive preview' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside 
      className="fixed left-0 top-0 h-screen flex flex-col"
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--sidebar-bg)',
      }}
    >
      {/* Logo Section */}
      <div 
        className="flex items-center gap-3 border-b border-white/10"
        style={{ padding: 'var(--spacing-6)' }}
      >
        <div className="relative w-40 h-10">
          <Image 
            src="/logo.svg" 
            alt="Altitude Marketing" 
            fill
            className="object-contain object-left brightness-0 invert"
            priority
          />
        </div>
      </div>
      
      {/* Navigation */}
      <nav 
        className="flex-1 overflow-y-auto"
        style={{ padding: 'var(--spacing-4)' }}
      >
        {navSections.map((section) => (
          <div key={section.section} style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 
              className="uppercase tracking-wider font-semibold"
              style={{ 
                fontSize: 'var(--font-size-caption)',
                color: 'var(--sidebar-text)',
                padding: `var(--spacing-2) var(--spacing-3)`,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="flex items-center gap-3 group transition-all duration-200"
                      style={{
                        padding: `var(--spacing-2-5) var(--spacing-3)`,
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: active ? 'rgba(42, 175, 184, 0.15)' : 'transparent',
                        color: active ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                      }}
                    >
                      <item.icon 
                        className="w-5 h-5 transition-colors"
                        style={{
                          color: active ? 'var(--sidebar-accent)' : 'currentColor',
                        }}
                      />
                      <span 
                        className="font-medium transition-colors"
                        style={{ fontSize: 'var(--font-size-label)' }}
                      >
                        {item.name}
                      </span>
                      {active && (
                        <ChevronRight 
                          className="w-4 h-4 ml-auto"
                          style={{ color: 'var(--sidebar-accent)' }}
                        />
                      )}
                    </Link>
                    {/* Render children if they exist */}
                    {item.children && item.children.length > 0 && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <li key={child.name}>
                              <Link 
                                href={child.href}
                                className="flex items-center gap-2 group transition-all duration-200"
                                style={{
                                  padding: `var(--spacing-2) var(--spacing-3)`,
                                  borderRadius: 'var(--radius-md)',
                                  backgroundColor: childActive ? 'rgba(42, 175, 184, 0.15)' : 'transparent',
                                  color: childActive ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                                }}
                              >
                                <child.icon 
                                  className="w-4 h-4"
                                  style={{
                                    color: childActive ? 'var(--sidebar-accent)' : 'currentColor',
                                    opacity: 0.8,
                                  }}
                                />
                                <span 
                                  className="font-medium"
                                  style={{ fontSize: 'var(--font-size-caption)' }}
                                >
                                  {child.name}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div 
        className="border-t border-white/10"
        style={{ padding: 'var(--spacing-4)' }}
      >
        <p 
          className="text-center"
          style={{ 
            fontSize: 'var(--font-size-caption)',
            color: 'var(--sidebar-text)',
          }}
        >
          v2.0.0 · Design System
        </p>
      </div>
    </aside>
  );
}
