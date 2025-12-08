'use client';

import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Copy, Check } from 'lucide-react';

interface TokenCopyButtonProps {
  value: string;
  label?: string; // Optional label to show instead of the value
  displayValue?: string; // What to show in the button if different from value (e.g. truncated)
  variant?: 'default' | 'muted';
}

export function TokenCopyButton({ value, label, displayValue, variant = 'default' }: TokenCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click handlers
    
    try {
      await navigator.clipboard.writeText(value);
      
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      }
      
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTooltipPos(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isMuted = variant === 'muted';
  const displayText = label || displayValue || value;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleCopy}
        className="group"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-1) var(--spacing-2)',
          backgroundColor: isMuted ? 'var(--color-background)' : 'rgba(42, 175, 184, 0.08)',
          border: '1px solid',
          borderColor: isMuted ? 'var(--color-border)' : 'rgba(42, 175, 184, 0.2)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-caption)',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          color: isMuted ? 'var(--color-muted)' : 'var(--color-brand)',
          cursor: 'pointer',
          transition: 'all var(--duration-150) var(--ease-out)',
          width: 'fit-content',
          maxWidth: '100%',
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = isMuted ? 'var(--color-card-border)' : 'rgba(42, 175, 184, 0.15)';
            e.currentTarget.style.borderColor = isMuted ? 'var(--color-muted)' : 'var(--color-brand)';
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.backgroundColor = isMuted ? 'var(--color-background)' : 'rgba(42, 175, 184, 0.08)';
            e.currentTarget.style.borderColor = isMuted ? 'var(--color-border)' : 'rgba(42, 175, 184, 0.2)';
          }
        }}
      >
        <span style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          maxWidth: '300px' 
        }}>
          {displayText}
        </span>
        {copied ? (
          <Check size={12} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
        ) : (
          <Copy 
            size={12} 
            style={{ 
              opacity: 0.6, 
              flexShrink: 0,
              transition: 'opacity var(--duration-150)' 
            }}
            className="group-hover:opacity-100" 
          />
        )}
      </button>

      {copied && tooltipPos && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
            padding: '4px 8px',
            backgroundColor: 'var(--color-foreground)',
            color: 'var(--color-background)',
            fontSize: '11px',
            fontWeight: 500,
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          Copied!
        </div>,
        document.body
      )}
    </>
  );
}
