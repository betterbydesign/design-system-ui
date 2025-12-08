'use client';

import { ArrowRight, Star, User, Calendar } from 'lucide-react';

export default function CardsPage() {
  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h3)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          Cards
        </h1>
        <p 
          style={{ 
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-muted)',
            lineHeight: 'var(--line-height-snug)',
            maxWidth: '60ch',
          }}
        >
          Card components for content organization, featuring various layouts and interactive states.
        </p>
      </div>

      {/* Basic Cards */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-3)',
          }}
        >
          Basic Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--card-border-radius)',
                padding: 'var(--card-padding)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 
                className="font-semibold"
                style={{ 
                  fontSize: 'var(--card-title-font-size)',
                  color: 'var(--card-text)',
                  marginBottom: 'var(--spacing-2)',
                  lineHeight: 'var(--line-height-snug)',
                }}
              >
                Card Title {i}
              </h3>
              <p 
                style={{ 
                  fontSize: 'var(--card-subtitle-font-size)',
                  color: 'var(--color-muted)',
                  lineHeight: 'var(--line-height-snug)',
                }}
              >
                This is a basic card using semantic design tokens for consistent styling.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Feature Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Star, color: 'var(--color-brand)' },
            { icon: User, color: 'var(--color-secondary)' },
            { icon: Calendar, color: 'var(--color-accent)' },
          ].map((item, i) => (
            <div
              key={i}
              className="group transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--card-border-radius)',
                padding: 'var(--card-padding)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                  marginBottom: 'var(--spacing-4)',
                }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 
                className="font-semibold"
                style={{ 
                  fontSize: 'var(--card-title-font-size)',
                  color: 'var(--card-text)',
                  marginBottom: 'var(--spacing-2)',
                  lineHeight: 'var(--line-height-snug)',
                }}
              >
                Feature {i + 1}
              </h3>
              <p 
                style={{ 
                  fontSize: 'var(--card-subtitle-font-size)',
                  color: 'var(--color-muted)',
                  lineHeight: 'var(--line-height-snug)',
                  marginBottom: 'var(--spacing-4)',
                }}
              >
                Feature cards with icon headers and hover states using component tokens.
              </p>
              <div 
                className="flex items-center gap-2 font-semibold"
                style={{ 
                  fontSize: 'var(--font-size-label)',
                  color: item.color,
                }}
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Card */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Horizontal Card
        </h2>
        <div
          className="flex flex-col md:flex-row gap-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--card-border-radius)',
            padding: 'var(--card-padding)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div 
            className="w-full md:w-48 h-32 rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'var(--color-background)' }}
          />
          <div className="flex-1">
            <h3 
              className="font-semibold"
              style={{ 
                fontSize: 'var(--card-title-lg-font-size)',
                color: 'var(--card-text)',
                marginBottom: 'var(--spacing-2)',
                lineHeight: 'var(--line-height-snug)',
              }}
            >
              Horizontal Card Layout
            </h3>
            <p 
              style={{ 
                fontSize: 'var(--card-subtitle-font-size)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-snug)',
                marginBottom: 'var(--spacing-4)',
              }}
            >
              A horizontal card layout suitable for list views, featuring an image area and content section with consistent spacing.
            </p>
            <button
              className="font-medium"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-text-on-brand)',
                borderRadius: 'var(--radius-button)',
                padding: 'var(--spacing-2) var(--spacing-4)',
                fontSize: 'var(--font-size-label)',
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Token Reference */}
      <div 
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--card-border)',
        }}
      >
        <h3 
          className="font-semibold"
          style={{ 
            fontSize: 'var(--card-title-lg-font-size)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
            lineHeight: 'var(--line-height-snug)',
          }}
        >
          Card Tokens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: '--card-bg', value: 'var(--color-card)' },
            { name: '--card-border', value: 'var(--color-card-border)' },
            { name: '--card-text', value: 'var(--color-foreground)' },
            { name: '--card-border-radius', value: 'var(--radius-xl)' },
            { name: '--card-padding', value: 'var(--spacing-6)' },
            { name: '--card-shadow', value: 'var(--shadow-sm)' },
            { name: '--card-title-font-size', value: 'var(--font-size-body)' },
            { name: '--card-title-lg-font-size', value: 'var(--font-size-lead)' },
            { name: '--card-subtitle-font-size', value: 'var(--font-size-body-small)' },
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

