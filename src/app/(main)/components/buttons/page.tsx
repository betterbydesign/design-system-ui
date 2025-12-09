'use client';

import { ChevronRight, Square, Layers, MousePointer2, CircleDot, SquareDashed } from 'lucide-react';
import Link from 'next/link';

export default function ButtonsPage() {
  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link href="/" style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)', textDecoration: 'none' }}>
            Home
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <Link href="/components" style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)', textDecoration: 'none' }}>
            Components
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Buttons
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
            <Square size={28} />
          </div>

          <div>
            <h1 
              style={{ 
                fontSize: 'var(--font-size-h2)',
                fontWeight: 700,
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
                lineHeight: 'var(--line-height-tight)',
              }}
            >
              Buttons
            </h1>
            <p 
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              Button components using semantic design tokens for consistent styling across all platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
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
            <MousePointer2 size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Primary Buttons
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Main call-to-action buttons
            </p>
          </div>
        </div>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
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
            <CircleDot size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Secondary Buttons
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Supporting action buttons
            </p>
          </div>
        </div>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
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
            <SquareDashed size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Outline Buttons
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Bordered button variants
            </p>
          </div>
        </div>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Token Reference */}
      <div 
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
          {/* Callout icon - just icon, no background */}
          <Layers size={20} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
              Button Tokens
            </h3>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Design token reference for button components
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: '--button-bg', value: 'var(--color-brand)' },
            { name: '--button-bg-hover', value: 'var(--color-brand-hover)' },
            { name: '--button-text', value: 'var(--color-text-on-brand)' },
            { name: '--button-border-radius', value: 'var(--radius-lg)' },
            { name: '--button-padding-x', value: 'var(--spacing-5)' },
            { name: '--button-padding-y', value: 'var(--spacing-2-5)' },
            { name: '--button-height-sm', value: '40px' },
            { name: '--button-height-md', value: '48px' },
            { name: '--button-height-lg', value: '56px' },
          ].map((token) => (
            <div 
              key={token.name}
              className="flex justify-between items-center"
              style={{
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <span 
                className="font-mono"
                style={{ 
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-brand)',
                }}
              >
                {token.name}
              </span>
              <span 
                className="font-mono"
                style={{ 
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-muted)',
                }}
              >
                {token.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

