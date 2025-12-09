'use client';

import { Search, Mail, Lock, Eye, EyeOff, Copy, Check, ChevronRight, TextCursor, Layers, FormInput, MessageSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Reusable copy field component
function CopyField({ 
  value, 
  displayValue, 
  variant = 'default' 
}: { 
  value: string; 
  displayValue?: string; 
  variant?: 'default' | 'primary' | 'muted';
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = {
    default: {
      bg: 'rgba(100, 116, 139, 0.08)',
      bgHover: 'rgba(100, 116, 139, 0.15)',
      text: 'var(--color-foreground)',
    },
    primary: {
      bg: 'rgba(42, 175, 184, 0.1)',
      bgHover: 'rgba(42, 175, 184, 0.2)',
      text: 'var(--color-brand)',
    },
    muted: {
      bg: 'rgba(100, 116, 139, 0.08)',
      bgHover: 'rgba(100, 116, 139, 0.15)',
      text: 'var(--color-muted)',
    },
  };

  const style = colors[variant];

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center gap-1.5 font-mono transition-all group"
      style={{
        fontSize: 'var(--font-size-caption)',
        color: style.text,
        backgroundColor: copied ? 'rgba(16, 185, 129, 0.15)' : style.bg,
        padding: '4px 8px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.backgroundColor = style.bgHover;
      }}
      onMouseLeave={(e) => {
        if (!copied) e.currentTarget.style.backgroundColor = style.bg;
      }}
      title={`Click to copy: ${value}`}
    >
      <span style={{ color: copied ? '#10B981' : style.text }}>
        {displayValue || value}
      </span>
      {copied ? (
        <Check className="w-3 h-3" style={{ color: '#10B981' }} />
      ) : (
        <Copy className="w-3 h-3 opacity-40 group-hover:opacity-70 transition-opacity" />
      )}
    </button>
  );
}

export default function InputsPage() {
  const [showPassword, setShowPassword] = useState(false);

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
            Inputs
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
            <TextCursor size={28} />
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
              Inputs
            </h1>
            <p 
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              Form input components with consistent styling using semantic design tokens.
            </p>
          </div>
        </div>
      </div>

      {/* Text Inputs */}
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
            <FormInput size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Text Inputs
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Standard text input fields
            </p>
          </div>
        </div>
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <div>
            <label 
              className="block font-medium"
              style={{ 
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Default Input
            </label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full outline-none transition-colors focus:border-[var(--color-brand)]"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                borderRadius: 'var(--input-border-radius)',
                padding: 'var(--input-padding-y) var(--input-padding-x)',
                minHeight: 'var(--input-height)',
                fontSize: 'var(--font-size-body-small)',
                color: 'var(--color-foreground)',
              }}
            />
          </div>

          <div>
            <label 
              className="block font-medium"
              style={{ 
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              With Icon
            </label>
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-muted)' }}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none transition-colors focus:border-[var(--color-brand)]"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: 'var(--input-border-radius)',
                  padding: 'var(--input-padding-y) var(--input-padding-x)',
                  paddingLeft: 'var(--spacing-10)',
                  minHeight: 'var(--input-height)',
                  fontSize: 'var(--font-size-body-small)',
                  color: 'var(--color-foreground)',
                }}
              />
            </div>
          </div>

          <div>
            <label 
              className="block font-medium"
              style={{ 
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Email Input
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-muted)' }}
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none transition-colors focus:border-[var(--color-brand)]"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: 'var(--input-border-radius)',
                  padding: 'var(--input-padding-y) var(--input-padding-x)',
                  paddingLeft: 'var(--spacing-10)',
                  minHeight: 'var(--input-height)',
                  fontSize: 'var(--font-size-body-small)',
                  color: 'var(--color-foreground)',
                }}
              />
            </div>
          </div>

          <div>
            <label 
              className="block font-medium"
              style={{ 
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Password Input
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-muted)' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full outline-none transition-colors focus:border-[var(--color-brand)]"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: 'var(--input-border-radius)',
                  padding: 'var(--input-padding-y) var(--input-padding-x)',
                  paddingLeft: 'var(--spacing-10)',
                  paddingRight: 'var(--spacing-10)',
                  minHeight: 'var(--input-height)',
                  fontSize: 'var(--font-size-body-small)',
                  color: 'var(--color-foreground)',
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-muted)' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Textarea */}
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
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Textarea
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Multi-line text input
            </p>
          </div>
        </div>
        <div 
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
            maxWidth: '500px',
          }}
        >
          <label 
            className="block font-medium"
            style={{ 
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              marginBottom: 'var(--spacing-2)',
            }}
          >
            Message
          </label>
          <textarea
            placeholder="Enter your message..."
            rows={4}
            className="w-full outline-none transition-colors focus:border-[var(--color-brand)] resize-none"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              borderRadius: 'var(--input-border-radius)',
              padding: 'var(--input-padding-x)',
              fontSize: 'var(--font-size-body-small)',
              color: 'var(--color-foreground)',
              lineHeight: 'var(--line-height-snug)',
            }}
          />
        </div>
      </div>

      {/* Select */}
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
            <ChevronDown size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Select
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Dropdown selection input
            </p>
          </div>
        </div>
        <div 
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
            maxWidth: '300px',
          }}
        >
          <label 
            className="block font-medium"
            style={{ 
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              marginBottom: 'var(--spacing-2)',
            }}
          >
            Select Option
          </label>
          <select
            className="w-full outline-none transition-colors focus:border-[var(--color-brand)] cursor-pointer"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              borderRadius: 'var(--input-border-radius)',
              padding: 'var(--input-padding-y) var(--input-padding-x)',
              minHeight: 'var(--input-height)',
              fontSize: 'var(--font-size-body-small)',
              color: 'var(--color-foreground)',
            }}
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
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
              Input Tokens
            </h3>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Click to copy the CSS variable or resolved value
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: '--input-bg', value: 'var(--color-background)' },
            { name: '--input-border', value: 'var(--color-border)' },
            { name: '--input-border-radius', value: 'var(--radius-md)' },
            { name: '--input-padding-x', value: 'var(--spacing-3)' },
            { name: '--input-padding-y', value: 'var(--spacing-2)' },
            { name: '--input-height', value: '40px' },
          ].map((token) => (
            <div 
              key={token.name}
              className="flex justify-between items-center gap-3"
              style={{
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <CopyField 
                value={`var(${token.name})`}
                displayValue={token.name}
                variant="primary"
              />
              <CopyField 
                value={token.value}
                variant="muted"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

