'use client';

import Link from 'next/link';
import { 
  Palette, 
  Type, 
  Component, 
  Eye,
  ArrowRight,
  Layers,
  Grid,
  Sparkles,
  Hash,
  Globe,
  Ruler,
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
}

function FeatureCard({ title, description, icon: Icon, href, color, bgColor }: FeatureCardProps) {
  return (
    <Link 
      href={href}
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-6)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 -mr-8 -mt-8 rounded-full transition-transform duration-300 group-hover:scale-150"
        style={{ backgroundColor: color }}
      />
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3 
        className="font-semibold mb-2"
        style={{ 
          fontSize: 'var(--card-title-lg-font-size)',
          color: 'var(--color-foreground)',
          lineHeight: 'var(--line-height-snug)',
        }}
      >
        {title}
      </h3>
      <p 
        className="mb-4"
        style={{ 
          fontSize: 'var(--card-subtitle-font-size)',
          color: 'var(--color-muted)',
          lineHeight: 'var(--line-height-snug)',
        }}
      >
        {description}
      </p>
      <div 
        className="flex items-center gap-2 font-semibold transition-colors"
        style={{ 
          fontSize: 'var(--font-size-label)',
          color: color,
        }}
      >
        <span>Explore</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div 
      className="flex items-center gap-4"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-5)',
        boxShadow: 'var(--shadow-xs)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'rgba(42, 175, 184, 0.1)' }}
      >
        <Icon className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
      </div>
      <div>
        <p 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-xl--ms)',
            color: 'var(--color-foreground)',
          }}
        >
          {value}
        </p>
        <p 
          style={{ 
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-muted)',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: 'rgba(42, 175, 184, 0.1)',
              color: 'var(--color-brand)',
              fontSize: 'var(--font-size-caption)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span>Version 2.0</span>
          </div>
        </div>
        <h1 
          className="font-bold mb-4"
          style={{ 
            fontSize: 'var(--font-size-h2)',
            color: 'var(--color-foreground)',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          Altitude Design System
        </h1>
        <p 
          className="max-w-2xl"
          style={{ 
            fontSize: 'var(--font-size-lead)',
            color: 'var(--color-muted)',
            lineHeight: 'var(--line-height-snug)',
          }}
        >
          A comprehensive 5-layer design system with semantic tokens, component tokens, 
          and WordPress/Greenshift integration. Built on an 8px grid for consistent, 
          scalable, and accessible interfaces.
        </p>
      </div>

      {/* Stats Grid - Updated with accurate counts */}
      <div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        style={{ marginBottom: 'var(--spacing-10)' }}
      >
        <StatCard value="245" icon={Palette} label="Color Primitives" />
        <StatCard value="22" icon={Type} label="Type Sizes" />
        <StatCard value="31" icon={Ruler} label="Spacing Values" />
        <StatCard value="8px" icon={Grid} label="Grid System" />
      </div>

      {/* Token Architecture */}
      <div 
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--card-border)',
          marginBottom: 'var(--spacing-10)',
        }}
      >
        <h2 
          className="font-semibold mb-4"
          style={{ 
            fontSize: 'var(--font-size-h6)',
            color: 'var(--color-foreground)',
          }}
        >
          5-Layer Token Architecture
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {[
            { name: 'Greenshift', desc: 'WordPress/Greenshift CSS variables', color: '#06b6d4', icon: Globe },
            { name: 'Components', desc: 'Button, Card, Input tokens', color: '#8b5cf6', icon: Component },
            { name: 'Semantic', desc: 'Role-based: Brand, Background, Text', color: '#10b981', icon: Sparkles },
            { name: 'Typography', desc: 'Major Second & Major Third scales', color: '#f59e0b', icon: Type },
            { name: 'Primitives', desc: 'Raw values: Colors, Spacing, Radius', color: '#3b82f6', icon: Hash },
          ].map((layer, index) => (
            <div 
              key={layer.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                backgroundColor: `${layer.color}08`,
                borderRadius: 'var(--radius-lg)',
                borderLeft: `3px solid ${layer.color}`,
              }}
            >
              <layer.icon style={{ color: layer.color, width: 18, height: 18 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, color: 'var(--color-foreground)', fontSize: 'var(--font-size-body-small)' }}>
                  {layer.name}
                </span>
                <span style={{ marginLeft: 'var(--spacing-2)', color: 'var(--color-muted)', fontSize: 'var(--font-size-caption)' }}>
                  {layer.desc}
                </span>
              </div>
              <span style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace' }}>
                Layer {5 - index}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          Explore the System
        </h2>
        <p 
          style={{ 
            fontSize: 'var(--font-size-body-small)',
            color: 'var(--color-muted)',
          }}
        >
          Navigate through tokens, components, and interactive tools
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          title="Primitives"
          description="22 color families with 11 shades, spacing scale, radius, and typography values."
          icon={Hash}
          href="/tokens/primitives"
          color="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <FeatureCard 
          title="Semantic Tokens"
          description="Role-based tokens for colors, radius, and layout with Light/Dark mode support."
          icon={Sparkles}
          href="/tokens/semantic"
          color="#10b981"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
        <FeatureCard 
          title="Component Tokens"
          description="Button, Card, and Input component tokens with semantic references."
          icon={Component}
          href="/tokens/components"
          color="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
        <FeatureCard 
          title="Typography"
          description="Two fluid type scales - Major Second (1.125) and Major Third (1.25)."
          icon={Type}
          href="/tokens/typography"
          color="var(--color-secondary)"
          bgColor="rgba(68, 75, 140, 0.1)"
        />
      </div>

      {/* Secondary Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: 'var(--spacing-6)' }}>
        <FeatureCard 
          title="Colors"
          description="Semantic color system with primitive palettes and role-based tokens."
          icon={Palette}
          href="/tokens/colors"
          color="#2AAFB8"
          bgColor="rgba(42, 175, 184, 0.1)"
        />
        <FeatureCard 
          title="Greenshift"
          description="WordPress/Greenshift integration with preset colors and custom properties."
          icon={Globe}
          href="/frameworks/greenshift"
          color="#06b6d4"
          bgColor="rgba(6, 182, 212, 0.1)"
        />
        <FeatureCard 
          title="Theme Preview"
          description="Interactive preview panel to test colors, spacing, and components."
          icon={Eye}
          href="/preview"
          color="#10B981"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
      </div>

      {/* Quick Info Section */}
      <div 
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ marginTop: 'var(--spacing-12)' }}
      >
        <div 
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <h3 
            className="font-semibold mb-4"
            style={{ 
              fontSize: 'var(--card-title-lg-font-size)',
              color: 'var(--color-foreground)',
              lineHeight: 'var(--line-height-snug)',
            }}
          >
            Design Principles
          </h3>
          <ul 
            className="space-y-3"
            style={{ 
              fontSize: 'var(--card-subtitle-font-size)',
              color: 'var(--color-muted)',
            }}
          >
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              5-layer token architecture
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              Semantic naming for clear intent
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              Accessible by default (WCAG 2.1)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              Responsive 8px grid system
            </li>
          </ul>
        </div>
        <div 
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <h3 
            className="font-semibold mb-4"
            style={{ 
              fontSize: 'var(--card-title-lg-font-size)',
              color: 'var(--color-foreground)',
              lineHeight: 'var(--line-height-snug)',
            }}
          >
            Platform Support
          </h3>
          <ul 
            className="space-y-3"
            style={{ 
              fontSize: 'var(--card-subtitle-font-size)',
              color: 'var(--color-muted)',
            }}
          >
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
              WordPress / Greenshift CMS
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
              Figma Design System
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
              React / Next.js Applications
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
              CSS Custom Properties
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
