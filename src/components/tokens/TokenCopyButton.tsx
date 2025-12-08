'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TokenCopyButtonProps {
  value: string;
  displayValue?: string;
  variant?: 'default' | 'primary' | 'muted' | 'ghost';
  className?: string;
}

export function TokenCopyButton({
  value,
  displayValue,
  variant = 'default',
  className = '',
}: TokenCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const colors = {
    default: { 
      bg: 'var(--color-background)', 
      border: 'var(--color-border)', 
      text: 'var(--color-foreground)', 
      hoverBg: 'var(--color-card-border)' 
    },
    primary: { 
      bg: 'rgba(42, 175, 184, 0.1)', 
      border: 'rgba(42, 175, 184, 0.2)', 
      text: 'var(--color-brand)', 
      hoverBg: 'rgba(42, 175, 184, 0.15)' 
    },
    muted: { 
      bg: 'var(--color-background)', 
      border: 'transparent', 
      text: 'var(--color-muted)', 
      hoverBg: 'var(--color-card-border)' 
    },
    ghost: {
      bg: 'transparent',
      border: 'transparent',
      text: 'currentColor',
      hoverBg: 'rgba(0,0,0,0.05)'
    }
  };

  const style = colors[variant];
  const label = displayValue || value;

  return (
    <button
      onClick={handleCopy}
      className={`group relative inline-flex items-center gap-2 font-mono transition-all duration-200 ${className}`}
      style={{
        fontSize: 'var(--font-size-caption)',
        color: copied ? 'var(--color-success)' : style.text,
        backgroundColor: copied ? 'rgba(16, 185, 129, 0.1)' : style.bg,
        border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.2)' : style.border}`,
        padding: '4px 8px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        maxWidth: '100%',
      }}
      title={`Copy ${value}`}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = style.hoverBg;
          if (variant === 'primary') {
            e.currentTarget.style.borderColor = 'var(--color-brand)';
          } else if (variant !== 'ghost') {
            e.currentTarget.style.borderColor = 'var(--color-muted)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = style.bg;
          e.currentTarget.style.borderColor = style.border;
        }
      }}
    >
      <span style={{ 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        marginRight: '14px' // Reserve space for icon
      }}>
        {label}
      </span>
      
      <div
        style={{
          position: 'absolute',
          right: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {copied ? (
          <Check size={12} className="text-emerald-500 animate-in zoom-in duration-200" />
        ) : (
          <Copy 
            size={12} 
            style={{ opacity: 0.4 }} 
            className="group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
    </button>
  );
}
