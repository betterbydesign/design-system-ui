'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ChevronRight, Type, ArrowRight, Sparkles, Hash, Layers, ALargeSmall, Weight, Baseline } from 'lucide-react';
import { TokenCopyButton } from '@/components/tokens/TokenCopyButton';

// =============================================================================
// DATA
// =============================================================================

interface TypeToken {
  name: string;
  semantic: string;
  variable: string;
  msValue: string;
  mtValue: string;
  msClamp: string;
  mtClamp: string;
}

const typeTokens: TypeToken[] = [
  { name: '2XS', semantic: 'Caption', variable: '--font-size-2xs', msValue: '10px → 12px', mtValue: '8px → 13px', msClamp: 'clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem)', mtClamp: 'clamp(0.5rem, 0.43rem + 0.39vw, 0.8rem)' },
  { name: 'XS', semantic: 'Label', variable: '--font-size-xs', msValue: '12px → 14px', mtValue: '10px → 16px', msClamp: 'clamp(0.75rem, 0.68rem + 0.31vw, 0.875rem)', mtClamp: 'clamp(0.625rem, 0.54rem + 0.49vw, 1rem)' },
  { name: 'SM', semantic: 'Body Small', variable: '--font-size-sm', msValue: '14px → 16px', mtValue: '13px → 20px', msClamp: 'clamp(0.875rem, 0.81rem + 0.35vw, 1rem)', mtClamp: 'clamp(0.8rem, 0.68rem + 0.61vw, 1.25rem)' },
  { name: 'MD', semantic: 'Body', variable: '--font-size-md', msValue: '16px → 18px', mtValue: '16px → 25px', msClamp: 'clamp(1rem, 0.93rem + 0.39vw, 1.125rem)', mtClamp: 'clamp(1rem, 0.85rem + 0.76vw, 1.56rem)' },
  { name: 'LG', semantic: 'Lead', variable: '--font-size-lg', msValue: '18px → 20px', mtValue: '20px → 31px', msClamp: 'clamp(1.125rem, 1.04rem + 0.44vw, 1.25rem)', mtClamp: 'clamp(1.25rem, 1.06rem + 0.95vw, 1.95rem)' },
  { name: 'XL', semantic: 'H6', variable: '--font-size-xl', msValue: '20px → 24px', mtValue: '25px → 39px', msClamp: 'clamp(1.25rem, 1.16rem + 0.49vw, 1.5rem)', mtClamp: 'clamp(1.56rem, 1.33rem + 1.19vw, 2.44rem)' },
  { name: '2XL', semantic: 'H5', variable: '--font-size-2xl', msValue: '24px → 28px', mtValue: '31px → 49px', msClamp: 'clamp(1.5rem, 1.39rem + 0.56vw, 1.75rem)', mtClamp: 'clamp(1.95rem, 1.66rem + 1.48vw, 3.05rem)' },
  { name: '3XL', semantic: 'H4', variable: '--font-size-3xl', msValue: '28px → 32px', mtValue: '39px → 61px', msClamp: 'clamp(1.75rem, 1.62rem + 0.63vw, 2rem)', mtClamp: 'clamp(2.44rem, 2.08rem + 1.85vw, 3.81rem)' },
  { name: '4XL', semantic: 'H3', variable: '--font-size-4xl', msValue: '32px → 36px', mtValue: '49px → 76px', msClamp: 'clamp(2rem, 1.85rem + 0.7vw, 2.25rem)', mtClamp: 'clamp(3.05rem, 2.6rem + 2.31vw, 4.77rem)' },
  { name: '5XL', semantic: 'H2', variable: '--font-size-5xl', msValue: '36px → 40px', mtValue: '61px → 95px', msClamp: 'clamp(2.25rem, 2.08rem + 0.78vw, 2.5rem)', mtClamp: 'clamp(3.81rem, 3.25rem + 2.89vw, 5.96rem)' },
  { name: '6XL', semantic: 'H1/Hero', variable: '--font-size-6xl', msValue: '40px → 48px', mtValue: '76px → 119px', msClamp: 'clamp(2.5rem, 2.31rem + 0.85vw, 3rem)', mtClamp: 'clamp(4.77rem, 4.06rem + 3.61vw, 7.45rem)' },
];

const lineHeights = [
  { name: 'None', variable: '--line-height-none', value: '1', description: 'Text only' },
  { name: 'Tight', variable: '--line-height-tight', value: '1.25', description: 'Headings' },
  { name: 'Snug', variable: '--line-height-snug', value: '1.375', description: 'Compact' },
  { name: 'Normal', variable: '--line-height-normal', value: '1.5', description: 'Body default' },
  { name: 'Relaxed', variable: '--line-height-relaxed', value: '1.625', description: 'Comfortable' },
  { name: 'Loose', variable: '--line-height-loose', value: '2', description: 'Max readability' },
];

const fontWeights = [
  { name: 'Thin', variable: '--font-weight-thin', value: '100' },
  { name: 'Light', variable: '--font-weight-light', value: '300' },
  { name: 'Normal', variable: '--font-weight-normal', value: '400' },
  { name: 'Medium', variable: '--font-weight-medium', value: '500' },
  { name: 'Semibold', variable: '--font-weight-semibold', value: '600' },
  { name: 'Bold', variable: '--font-weight-bold', value: '700' },
  { name: 'Extrabold', variable: '--font-weight-extrabold', value: '800' },
  { name: 'Black', variable: '--font-weight-black', value: '900' },
];

// =============================================================================
// MAIN
// =============================================================================

export default function TypographyPage() {
  const [activeScale, setActiveScale] = useState<'ms' | 'mt'>('mt');

  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link href="/tokens" style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)', textDecoration: 'none' }}>
            Tokens
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Typography
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
          {/* H1 Page Icon Box - white bg, light thin border */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-card)',
              border: '1px solid rgba(68, 75, 140, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-secondary)',
            }}
          >
            <Type size={28} />
          </div>

          <div>
            <h1 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-2)', lineHeight: 'var(--line-height-tight)' }}>
              Typography
            </h1>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-muted)', lineHeight: 'var(--line-height-relaxed)', maxWidth: '65ch' }}>
              Fluid typography scales using CSS <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>clamp()</code> for responsive sizing. 
              Choose between two modular scales based on your content needs.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        {[
          { label: 'Type Sizes', value: '11' },
          { label: 'Line Heights', value: '6' },
          { label: 'Font Weights', value: '8' },
          { label: 'Type Scales', value: '2' },
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
            <div style={{ fontSize: 'var(--font-size-h4)', fontWeight: 700, color: 'var(--color-brand)', marginBottom: 'var(--spacing-1)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scale Comparison Info */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Type Scale Comparison
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
          <div
            style={{
              padding: 'var(--spacing-4)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: activeScale === 'ms' ? 'rgba(68, 75, 140, 0.05)' : 'var(--color-background)',
              border: activeScale === 'ms' ? '1px solid rgba(68, 75, 140, 0.3)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--duration-150) var(--ease-out)',
            }}
            onClick={() => setActiveScale('ms')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeScale === 'ms' ? 'var(--color-secondary)' : 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeScale === 'ms' && <Check size={14} style={{ color: 'white' }} />}
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-foreground)' }}>Major Second (1.125)</span>
            </div>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-2)' }}>
              Conservative scale with subtle size progression
            </p>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
              <strong>Best for:</strong> Dashboards, data-dense interfaces, admin panels
            </div>
          </div>

          <div
            style={{
              padding: 'var(--spacing-4)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: activeScale === 'mt' ? 'rgba(42, 175, 184, 0.05)' : 'var(--color-background)',
              border: activeScale === 'mt' ? '1px solid rgba(42, 175, 184, 0.3)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all var(--duration-150) var(--ease-out)',
            }}
            onClick={() => setActiveScale('mt')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeScale === 'mt' ? 'var(--color-brand)' : 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeScale === 'mt' && <Check size={14} style={{ color: 'white' }} />}
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-foreground)' }}>Major Third (1.25)</span>
            </div>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-2)' }}>
              Expressive scale with dramatic size contrast
            </p>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
              <strong>Best for:</strong> Marketing sites, editorial content, landing pages
            </div>
          </div>
        </div>
      </div>

      {/* Type Scale Table */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
          {/* H2 Icon Box - 48x48px, light purple bg, no border */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(68, 75, 140, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'var(--color-secondary)',
          }}>
            <ALargeSmall size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Type Scale
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              11 fluid sizes from caption to hero · Click variable to copy
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-card-border)',
            overflow: 'hidden',
          }}
        >
          <div
            className="grid font-semibold"
            style={{
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 2fr 0.5fr',
              gap: 'var(--spacing-3)',
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderBottom: '1px solid var(--color-card-border)',
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <div>Token</div>
            <div>Semantic Use</div>
            <div>Size Range</div>
            <div>Clamp Value</div>
            <div>Preview</div>
          </div>
          {typeTokens.map((token, index) => (
            <div
              key={token.name}
              className="grid items-center hover:bg-[var(--color-background)] transition-colors"
              style={{
                gridTemplateColumns: '1.5fr 0.8fr 0.8fr 2fr 0.5fr',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-4)',
                borderBottom: index < typeTokens.length - 1 ? '1px solid var(--color-card-border)' : 'none',
              }}
            >
              <div>
                <span
                  className="font-mono font-semibold block"
                  style={{
                    fontSize: 'var(--font-size-label)',
                    color: 'var(--color-foreground)',
                    marginBottom: '4px',
                  }}
                >
                  {token.name}
                </span>
                <TokenCopyButton
                  value={`var(${token.variable}--${activeScale})`}
                  displayValue={`${token.variable}--${activeScale}`}
                  variant="primary"
                />
              </div>
              <div style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)' }}>
                {token.semantic}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-foreground)' }}>
                {activeScale === 'ms' ? token.msValue : token.mtValue}
              </div>
              <div>
                <TokenCopyButton
                  value={activeScale === 'ms' ? token.msClamp : token.mtClamp}
                  variant="muted"
                />
              </div>
              <div
                className="font-semibold truncate text-right"
                style={{
                  fontSize: `var(${token.variable}--${activeScale})`,
                  color: 'var(--color-foreground)',
                  lineHeight: 'var(--line-height-tight)',
                }}
              >
                Aa
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
          {/* H2 Icon Box - 48x48px, light purple bg, no border */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(68, 75, 140, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'var(--color-secondary)',
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Line Heights
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              6 unitless ratio values · Click variable to copy
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lineHeights.map((lh) => (
            <div
              key={lh.name}
              style={{
                backgroundColor: 'var(--color-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-4)',
                border: '1px solid var(--color-card-border)',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-h5)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
                {lh.value}
              </div>
              <p style={{ fontSize: 'var(--font-size-label)', fontWeight: 500, color: 'var(--color-brand)', marginBottom: 'var(--spacing-2)' }}>
                {lh.name}
              </p>
              <div style={{ marginBottom: 'var(--spacing-2)' }}>
                <TokenCopyButton value={`var(${lh.variable})`} displayValue={lh.variable} variant="primary" />
              </div>
              <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
                {lh.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
          {/* H2 Icon Box - 48x48px, light purple bg, no border */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(68, 75, 140, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'var(--color-secondary)',
          }}>
            <Baseline size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Font Weights
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              8 weight values from thin (100) to black (900)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fontWeights.map((fw) => (
            <div
              key={fw.name}
              style={{
                backgroundColor: 'var(--color-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-4)',
                border: '1px solid var(--color-card-border)',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-body)', fontWeight: parseInt(fw.value), color: 'var(--color-foreground)', marginBottom: 'var(--spacing-2)' }}>
                {fw.name}
              </p>
              <div style={{ marginBottom: 'var(--spacing-2)' }}>
                <TokenCopyButton value={`var(${fw.variable})`} displayValue={fw.variable} variant="primary" />
              </div>
              <div>
                <TokenCopyButton value={fw.value} variant="muted" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Example */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-h6)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Usage Example
        </h3>
        <pre
          className="overflow-x-auto"
          style={{
            backgroundColor: 'var(--color-base)',
            color: '#e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            lineHeight: 'var(--line-height-relaxed)',
          }}
        >
{`/* Use Major Third scale (mt) for marketing sites */
.hero-heading {
  font-size: var(--font-size-6xl--mt);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

/* Use Major Second scale (ms) for dashboards */
.dashboard-heading {
  font-size: var(--font-size-4xl--ms);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
}

.body-text {
  font-size: var(--font-size-md--mt);
  line-height: var(--line-height-normal);
}`}
        </pre>
      </div>

      {/* Related Pages */}
      <div style={{ marginTop: 'var(--spacing-8)' }}>
        <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Related Pages
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
          <Link
            href="/tokens/primitives"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Hash size={14} />
            Primitives Overview
          </Link>
          <Link
            href="/tokens/spacing"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Sparkles size={14} />
            Spacing & Layout
          </Link>
        </div>
      </div>
    </div>
  );
}
