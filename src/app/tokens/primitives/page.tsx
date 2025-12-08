'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Ruler, 
  Square, 
  Clock, 
  Type, 
  ArrowRight,
  Layers,
  Hash,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SpacingScale, SpacingValue } from '@/components/tokens/SpacingVisual';
import { RadiusScale, RadiusValue } from '@/components/tokens/RadiusCurveIcon';

/** Category card data */
interface PrimitiveCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  href?: string;
  preview?: React.ReactNode;
}

/** Color family preview data */
interface ColorFamilyPreview {
  name: string;
  shades: string[];
}

const colorFamilies: ColorFamilyPreview[] = [
  { name: 'Slate', shades: ['#f8fafc', '#cbd5e1', '#64748b', '#1e293b', '#020617'] },
  { name: 'Emerald', shades: ['#ecfdf5', '#6ee7b7', '#10b981', '#047857', '#022c22'] },
  { name: 'Blue', shades: ['#eff6ff', '#93c5fd', '#3b82f6', '#1d4ed8', '#172554'] },
  { name: 'Purple', shades: ['#faf5ff', '#d8b4fe', '#a855f7', '#7e22ce', '#3b0764'] },
  { name: 'Rose', shades: ['#fff1f2', '#fda4af', '#f43f5e', '#be123c', '#4c0519'] },
  { name: 'Amber', shades: ['#fffbeb', '#fcd34d', '#f59e0b', '#b45309', '#451a03'] },
];

const spacingPreview: SpacingValue[] = [
  { key: '2', cssVariable: '--spacing-2', rem: '0.5rem', pixels: 8 },
  { key: '4', cssVariable: '--spacing-4', rem: '1rem', pixels: 16 },
  { key: '6', cssVariable: '--spacing-6', rem: '1.5rem', pixels: 24 },
  { key: '8', cssVariable: '--spacing-8', rem: '2rem', pixels: 32 },
  { key: '12', cssVariable: '--spacing-12', rem: '3rem', pixels: 48 },
];

const radiusPreview: RadiusValue[] = [
  { key: 'sm', cssVariable: '--radius-sm', value: '2px', pixels: 2 },
  { key: 'md', cssVariable: '--radius-md', value: '4px', pixels: 4 },
  { key: 'lg', cssVariable: '--radius-lg', value: '6px', pixels: 6 },
  { key: 'xl', cssVariable: '--radius-xl', value: '8px', pixels: 8 },
  { key: 'full', cssVariable: '--radius-full', value: '9999px', pixels: 9999 },
];

export default function PrimitivesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories: PrimitiveCategory[] = [
    {
      id: 'colors',
      name: 'Colors',
      description: '22 color families with 11 shades each (50-950), plus base colors',
      icon: <Palette size={24} />,
      count: 245,
      href: '/tokens/primitives/colors',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)' }}>
          {colorFamilies.map((family) => (
            <div key={family.name} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {family.shades.map((shade, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 32,
                    height: 12,
                    backgroundColor: shade,
                    borderRadius: idx === 0 ? '4px 4px 0 0' : idx === family.shades.length - 1 ? '0 0 4px 4px' : 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'spacing',
      name: 'Spacing',
      description: '31 spacing values from 0px to 256px based on 4px/8px grid',
      icon: <Ruler size={24} />,
      count: 31,
      preview: (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-4)', height: 48 }}>
          {spacingPreview.map((spacing) => (
            <div
              key={spacing.key}
              style={{
                width: 24,
                height: Math.min(spacing.pixels, 48),
                backgroundColor: 'var(--color-brand)',
                borderRadius: 'var(--radius-sm)',
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'radius',
      name: 'Border Radius',
      description: '9 radius values from 0px to full (9999px)',
      icon: <Square size={24} />,
      count: 9,
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-4)' }}>
          {radiusPreview.map((radius) => (
            <div
              key={radius.key}
              style={{
                width: 32,
                height: 32,
                backgroundColor: 'var(--color-brand)',
                borderRadius: radius.key === 'full' ? '50%' : `${radius.pixels}px`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'duration',
      name: 'Durations',
      description: '8 animation timing values from 75ms to 1000ms',
      icon: <Clock size={24} />,
      count: 8,
      preview: (
        <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-4)' }}>
          {['75', '150', '300', '500', '1000'].map((ms) => (
            <div
              key={ms}
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-caption)',
                fontFamily: 'ui-monospace, monospace',
                color: 'var(--color-muted)',
              }}
            >
              {ms}ms
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'font-weight',
      name: 'Font Weights',
      description: '9 font weight values from thin (100) to black (900)',
      icon: <Type size={24} />,
      count: 9,
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-0-5)', marginTop: 'var(--spacing-4)' }}>
          {[{ w: 300, n: 'Light' }, { w: 400, n: 'Normal' }, { w: 600, n: 'Semibold' }, { w: 700, n: 'Bold' }].map((item) => (
            <span
              key={item.w}
              style={{
                fontWeight: item.w,
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-foreground)',
              }}
            >
              {item.n} ({item.w})
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 'line-height',
      name: 'Line Heights',
      description: '6 line height multipliers from 1 to 2',
      icon: <Layers size={24} />,
      count: 6,
      preview: (
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-4)' }}>
          {[{ lh: 1, n: 'none' }, { lh: 1.25, n: 'tight' }, { lh: 1.5, n: 'normal' }, { lh: 2, n: 'loose' }].map((item) => (
            <div
              key={item.n}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
              }}
            >
              {/* Visual: Stacked lines with actual line-height spacing */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 6px',
                  width: 36,
                }}
              >
                {[1, 2, 3].map((line) => (
                  <div
                    key={line}
                    style={{
                      fontSize: '10px',
                      lineHeight: item.lh,
                      color: 'var(--color-brand)',
                      fontWeight: 600,
                    }}
                  >
                    Aa
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)', fontWeight: 500 }}>
                {item.lh}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link
            href="/tokens"
            style={{
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
          >
            Tokens
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Primitives
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
          {/* Layer badge */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: '#3b82f620',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Hash size={28} style={{ color: '#3b82f6' }} />
          </div>

          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-h2)',
                fontWeight: 700,
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Primitives
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              The foundation layer of the design system. Raw, immutable values that define colors, 
              spacing, typography metrics, and other fundamental measurements. These tokens are 
              referenced by semantic and component tokens.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        {[
          { label: 'Total Tokens', value: '308', color: '#3b82f6' },
          { label: 'Color Families', value: '22', color: '#10b981' },
          { label: 'Spacing Values', value: '31', color: '#8b5cf6' },
          { label: 'Categories', value: '7', color: '#f59e0b' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-4)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: stat.color,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Category Cards */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2
          style={{
            fontSize: 'var(--font-size-h5)',
            fontWeight: 600,
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Token Categories
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--spacing-4)',
          }}
        >
          {categories.map((category) => {
            const CardContent = (
              <div
                className="group"
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--spacing-5)',
                  cursor: category.href ? 'pointer' : 'default',
                  transition: 'all var(--duration-150) var(--ease-out)',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  if (category.href) {
                    e.currentTarget.style.borderColor = 'var(--color-brand)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-card-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-background)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-brand)',
                    }}
                  >
                    {category.icon}
                  </div>
                  <span
                    style={{
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-background)',
                      fontSize: 'var(--font-size-caption)',
                      fontWeight: 600,
                      color: 'var(--color-muted)',
                    }}
                  >
                    {category.count} tokens
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--font-size-lead)',
                    fontWeight: 600,
                    color: 'var(--color-foreground)',
                    marginTop: 'var(--spacing-4)',
                    marginBottom: 'var(--spacing-1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  {category.name}
                  {category.href && (
                    <ArrowRight
                      size={16}
                      style={{
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all var(--duration-150) var(--ease-out)',
                      }}
                      className="arrow-icon"
                    />
                  )}
                </h3>
                <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', lineHeight: 'var(--line-height-snug)' }}>
                  {category.description}
                </p>

                {category.preview}
              </div>
            );

            if (category.href) {
              return (
                <Link key={category.id} href={category.href} style={{ textDecoration: 'none' }}>
                  {CardContent}
                </Link>
              );
            }

            return <div key={category.id}>{CardContent}</div>;
          })}
        </div>
      </div>

      {/* Architecture Note */}
      <div
        style={{
          backgroundColor: '#3b82f610',
          border: '1px solid #3b82f630',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            color: '#3b82f6',
            marginBottom: 'var(--spacing-2)',
          }}
        >
          About Primitives
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-3)' }}>
          Primitives are the lowest layer in our token architecture. They contain raw, literal values 
          that never reference other tokens. Semantic tokens (like <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>--color-brand</code>) reference 
          these primitives to create meaningful, context-aware tokens.
        </p>
        {/* Token Chain: Raw Value → Primitive → Semantic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
          {/* Raw Value */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
              #10b981
            </span>
          </div>
          <ArrowRight size={12} style={{ color: 'var(--color-muted)' }} />
          {/* Primitive */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              backgroundColor: '#3b82f610',
              border: '1px solid #3b82f630',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Hash size={12} style={{ color: '#3b82f6' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: '#3b82f6', fontWeight: 500 }}>
              Emerald.500
            </span>
          </div>
          <ArrowRight size={12} style={{ color: 'var(--color-muted)' }} />
          {/* Semantic */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              backgroundColor: '#10b98110',
              border: '1px solid #10b98130',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Sparkles size={12} style={{ color: '#10b981' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontWeight: 500, color: '#10b981' }}>
              Color.Brand
            </span>
          </div>
        </div>
      </div>

      {/* Hover styles */}
      <style jsx global>{`
        .group:hover .arrow-icon {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
}
