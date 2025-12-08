'use client';

import { useState, useMemo } from 'react';
import { ColorSwatch } from './ColorSwatch';
import { Copy, Check, Filter, Grid, List } from 'lucide-react';
import { TokenLayer } from '@/lib/types';

export interface ColorPaletteData {
  /** Color family name (e.g., "Emerald", "Blue") */
  name: string;
  /** Display name */
  displayName: string;
  /** Category for filtering */
  category: 'neutral' | 'warm' | 'cool' | 'blue' | 'pink' | 'base';
  /** Array of color shades */
  shades: {
    shade: string;
    hex: string;
    cssVariable: string;
  }[];
}

export interface ColorPaletteGridProps {
  /** Array of color palettes to display */
  palettes: ColorPaletteData[];
  /** Token layer (for styling) */
  layer?: TokenLayer;
  /** View mode */
  viewMode?: 'grid' | 'compact' | 'list';
  /** Initially selected category filter */
  initialCategory?: string | null;
  /** Show category filters */
  showFilters?: boolean;
  /** Show view mode toggle */
  showViewToggle?: boolean;
  /** Swatch size */
  swatchSize?: 'sm' | 'md' | 'lg';
  /** Click handler for individual swatches */
  onSwatchClick?: (palette: string, shade: string, hex: string, cssVariable: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/** Category labels for display */
const CATEGORY_LABELS: Record<string, { label: string; description: string }> = {
  neutral: { label: 'Neutrals', description: 'Slate, Gray, Zinc, Neutral, Stone' },
  warm: { label: 'Warm', description: 'Red, Orange, Amber, Yellow, Lime' },
  cool: { label: 'Cool', description: 'Green, Emerald, Teal, Cyan, Sky' },
  blue: { label: 'Blues', description: 'Blue, Indigo, Violet, Purple' },
  pink: { label: 'Pinks', description: 'Fuchsia, Pink, Rose' },
  base: { label: 'Base', description: 'White, Black, Transparent' },
};

/** Shade labels (50-950) */
const SHADE_LABELS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

/**
 * ColorPaletteGrid - Displays a complete grid of color palettes
 * 
 * Shows all color families organized by category with filtering options.
 * Supports multiple view modes (grid, compact, list) and copy functionality.
 */
export function ColorPaletteGrid({
  palettes,
  layer = TokenLayer.Primitives,
  viewMode: initialViewMode = 'grid',
  initialCategory = null,
  showFilters = true,
  showViewToggle = true,
  swatchSize = 'md',
  onSwatchClick,
  className = '',
}: ColorPaletteGridProps) {
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);

  // Get unique categories from palettes
  const categories = useMemo(() => {
    const cats = new Set(palettes.map(p => p.category));
    return Array.from(cats);
  }, [palettes]);

  // Filter palettes by category
  const filteredPalettes = useMemo(() => {
    if (!activeCategory) return palettes;
    return palettes.filter(p => p.category === activeCategory);
  }, [palettes, activeCategory]);

  // Group palettes by category for display
  const groupedPalettes = useMemo(() => {
    const groups: Record<string, ColorPaletteData[]> = {};
    filteredPalettes.forEach(palette => {
      if (!groups[palette.category]) {
        groups[palette.category] = [];
      }
      groups[palette.category].push(palette);
    });
    return groups;
  }, [filteredPalettes]);

  // Copy all CSS variables for a palette
  const handleCopyPalette = async (palette: ColorPaletteData) => {
    const cssVars = palette.shades
      .map(s => `${s.cssVariable}: ${s.hex};`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(cssVars);
      setCopiedPalette(palette.name);
      setTimeout(() => setCopiedPalette(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`color-palette-grid ${className}`}>
      {/* Toolbar */}
      {(showFilters || showViewToggle) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-6)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-4)',
          }}
        >
          {/* Category Filters */}
          {showFilters && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
              <Filter size={16} style={{ color: 'var(--color-muted)' }} />
              <button
                onClick={() => setActiveCategory(null)}
                style={{
                  padding: 'var(--spacing-1-5) var(--spacing-3)',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: activeCategory === null ? 'var(--color-brand)' : 'var(--color-background)',
                  color: activeCategory === null ? 'white' : 'var(--color-foreground)',
                  fontSize: 'var(--font-size-label)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--duration-150) var(--ease-out)',
                }}
              >
                All ({palettes.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: 'var(--spacing-1-5) var(--spacing-3)',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: activeCategory === cat ? 'var(--color-brand)' : 'var(--color-background)',
                    color: activeCategory === cat ? 'white' : 'var(--color-foreground)',
                    fontSize: 'var(--font-size-label)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all var(--duration-150) var(--ease-out)',
                  }}
                  title={CATEGORY_LABELS[cat]?.description}
                >
                  {CATEGORY_LABELS[cat]?.label || cat}
                </button>
              ))}
            </div>
          )}

          {/* View Mode Toggle */}
          {showViewToggle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-0-5)',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? 'var(--color-card)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-brand)' : 'var(--color-muted)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-150) var(--ease-out)',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
                }}
                title="Grid view"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? 'var(--color-card)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--color-brand)' : 'var(--color-muted)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-150) var(--ease-out)',
                  boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                }}
                title="List view"
              >
                <List size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Palette Grid */}
      {viewMode === 'grid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {Object.entries(groupedPalettes).map(([category, categoryPalettes]) => (
            <div key={category}>
              {/* Category Header */}
              {showFilters && !activeCategory && (
                <h3
                  style={{
                    fontSize: 'var(--font-size-lead)',
                    fontWeight: 600,
                    color: 'var(--color-foreground)',
                    marginBottom: 'var(--spacing-4)',
                  }}
                >
                  {CATEGORY_LABELS[category]?.label || category}
                </h3>
              )}

              {/* Palettes in Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                {categoryPalettes.map(palette => (
                  <div
                    key={palette.name}
                    className="color-palette-row group"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-card-border)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--spacing-4)',
                    }}
                  >
                    {/* Palette Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--spacing-3)',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: 'var(--font-size-body)',
                            fontWeight: 600,
                            color: 'var(--color-foreground)',
                            margin: 0,
                          }}
                        >
                          {palette.displayName}
                        </h4>
                        <span
                          style={{
                            fontSize: 'var(--font-size-caption)',
                            color: 'var(--color-muted)',
                            fontFamily: 'ui-monospace, monospace',
                          }}
                        >
                          {palette.shades.length} shades
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyPalette(palette)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-1)',
                          padding: 'var(--spacing-1-5) var(--spacing-2-5)',
                          borderRadius: 'var(--radius-md)',
                          border: 'none',
                          backgroundColor: copiedPalette === palette.name ? 'var(--color-success)' : 'var(--color-background)',
                          color: copiedPalette === palette.name ? 'white' : 'var(--color-muted)',
                          fontSize: 'var(--font-size-caption)',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all var(--duration-150) var(--ease-out)',
                          opacity: 0,
                        }}
                        className="copy-palette-btn"
                        title="Copy all CSS variables"
                      >
                        {copiedPalette === palette.name ? <Check size={12} /> : <Copy size={12} />}
                        {copiedPalette === palette.name ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>

                    {/* Color Swatches Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(11, 1fr)',
                        gap: 'var(--spacing-1)',
                      }}
                    >
                      {palette.shades.map(shade => (
                        <ColorSwatch
                          key={shade.shade}
                          color={shade.hex}
                          shade={shade.shade}
                          cssVariable={shade.cssVariable}
                          layer={layer}
                          size={swatchSize}
                          shape="rounded"
                          showLabel={true}
                          showHex={false}
                          showCopy={true}
                          onClick={onSwatchClick ? () => onSwatchClick(palette.name, shade.shade, shade.hex, shade.cssVariable) : undefined}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 80px 1fr',
              gap: 'var(--spacing-4)',
              padding: 'var(--spacing-3) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderBottom: '1px solid var(--color-card-border)',
              fontSize: 'var(--font-size-caption)',
              fontWeight: 600,
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <span>Color</span>
            <span>Shade</span>
            <span>CSS Variable / Hex</span>
          </div>

          {/* Color Rows */}
          {filteredPalettes.map(palette =>
            palette.shades.map((shade, idx) => (
              <div
                key={`${palette.name}-${shade.shade}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 80px 1fr',
                  gap: 'var(--spacing-4)',
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderBottom: idx === palette.shades.length - 1 ? '2px solid var(--color-card-border)' : '1px solid var(--color-card-border)',
                  alignItems: 'center',
                  transition: 'background-color var(--duration-100) var(--ease-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: shade.hex,
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 'var(--font-size-label)',
                      fontWeight: 500,
                      color: 'var(--color-foreground)',
                    }}
                  >
                    {idx === 0 ? palette.displayName : ''}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 'var(--font-size-label)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {shade.shade}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <code
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      fontFamily: 'ui-monospace, monospace',
                      color: 'var(--color-muted)',
                      flex: 1,
                    }}
                  >
                    {shade.cssVariable}
                  </code>
                  <code
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      fontFamily: 'ui-monospace, monospace',
                      color: 'var(--color-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {shade.hex}
                  </code>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Hover styles */}
      <style jsx>{`
        .color-palette-row:hover .copy-palette-btn {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default ColorPaletteGrid;
