'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  RefreshCcw, 
  Palette, 
  Type, 
  Ruler, 
  Box,
  ArrowRight,
  Star,
  Mail,
  Droplet,
  Circle,
  Square,
  Sparkles
} from 'lucide-react';

interface ThemeColors {
  brand: string;
  secondary: string;
  accent: string;
  cardBg: string;
  cardBorder: string;
  background: string;
}

interface ColorConfig {
  key: keyof ThemeColors;
  label: string;
  variable: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const colorConfigs: ColorConfig[] = [
  { key: 'brand', label: 'Primary', variable: '--color-brand', icon: Droplet },
  { key: 'secondary', label: 'Secondary', variable: '--color-secondary', icon: Circle },
  { key: 'accent', label: 'Accent', variable: '--color-accent', icon: Sparkles },
  { key: 'cardBg', label: 'Card Background', variable: '--card-bg', icon: Square },
  { key: 'cardBorder', label: 'Card Border', variable: '--card-border', icon: Box },
  { key: 'background', label: 'Page Background', variable: '--color-background', icon: Palette },
];

const radiusOptions = [
  { label: 'Sharp', value: '0', variable: '--radius-none' },
  { label: 'Subtle', value: '4px', variable: '--radius-md' },
  { label: 'Rounded', value: '8px', variable: '--radius-xl' },
  { label: 'Soft', value: '12px', variable: '--radius-2xl' },
  { label: 'Pill', value: '24px', variable: '--radius-4xl' },
];

const defaultColors: ThemeColors = {
  brand: '#2AAFB8',
  secondary: '#444B8C',
  accent: '#7C3AED',
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',
  background: '#F8FAFC',
};

// Small component for displaying CSS variable info
const VarInfo = ({ variables, note }: { variables: string[]; note?: string }) => (
  <div 
    className="mt-2"
    style={{ 
      fontSize: '11px',
      color: '#64748B',
    }}
  >
    {note && (
      <span style={{ display: 'block', marginBottom: '2px' }}>{note}</span>
    )}
    <div className="flex flex-wrap gap-1">
      {variables.map((v, i) => (
        <code 
          key={i}
          className="font-mono"
          style={{ 
            backgroundColor: 'rgba(100, 116, 139, 0.1)',
            padding: '1px 4px',
            borderRadius: '3px',
            letterSpacing: '-0.2px',
          }}
        >
          {v}
        </code>
      ))}
    </div>
  </div>
);

export default function PreviewPage() {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [typeScale, setTypeScale] = useState<'ms' | 'mt'>('mt');
  const [spacingMultiplier, setSpacingMultiplier] = useState(1);
  const [borderRadius, setBorderRadius] = useState('8px');
  
  const previewRef = useRef<HTMLDivElement>(null);

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!previewRef.current) return;
    const style = previewRef.current.style;

    // Update colors
    style.setProperty('--color-brand', colors.brand);
    style.setProperty('--color-brand-hover', colors.brand);
    style.setProperty('--color-secondary', colors.secondary);
    style.setProperty('--color-secondary-hover', colors.secondary);
    style.setProperty('--color-accent', colors.accent);
    style.setProperty('--card-bg', colors.cardBg);
    style.setProperty('--card-border', colors.cardBorder);
    style.setProperty('--color-background', colors.background);
    style.setProperty('--button-bg', colors.brand);
    style.setProperty('--button-bg-hover', colors.brand);

    // Update border radius
    style.setProperty('--card-border-radius', borderRadius);
    style.setProperty('--radius-button', borderRadius);
    style.setProperty('--radius-card', borderRadius);
    style.setProperty('--input-border-radius', borderRadius === '24px' ? '12px' : borderRadius);

    // Update typography scale
    const scale = typeScale === 'ms' ? '--ms' : '--mt';
    style.setProperty('--font-size-caption', `var(--font-size-2xs${scale})`);
    style.setProperty('--font-size-label', `var(--font-size-xs${scale})`);
    style.setProperty('--font-size-body-small', `var(--font-size-sm${scale})`);
    style.setProperty('--font-size-body', `var(--font-size-md${scale})`);
    style.setProperty('--font-size-lead', `var(--font-size-lg${scale})`);
    style.setProperty('--font-size-h6', `var(--font-size-xl${scale})`);
    style.setProperty('--font-size-h5', `var(--font-size-2xl${scale})`);
    style.setProperty('--font-size-h4', `var(--font-size-3xl${scale})`);
    style.setProperty('--font-size-h3', `var(--font-size-4xl${scale})`);
    style.setProperty('--font-size-h2', `var(--font-size-5xl${scale})`);
    style.setProperty('--font-size-h1', `var(--font-size-6xl${scale})`);

    // Line heights based on type scale
    const headingLineHeight = typeScale === 'ms' ? '1.25' : '1.1';
    const bodyLineHeight = typeScale === 'ms' ? '1.625' : `${1.5 * spacingMultiplier}`;
    style.setProperty('--line-height-heading', headingLineHeight);
    style.setProperty('--line-height-body', bodyLineHeight);

    // Update spacing (padding, gaps, and vertical rhythm)
    const baseSpacings = [2, 3, 4, 5, 6, 8, 10, 12, 16];
    baseSpacings.forEach(s => {
      const baseValue = s * 0.25; // rem
      style.setProperty(`--spacing-${s}`, `${baseValue * spacingMultiplier}rem`);
    });

    // Gap values for layouts
    style.setProperty('--gap-sm', `${0.5 * spacingMultiplier}rem`);
    style.setProperty('--gap-md', `${1 * spacingMultiplier}rem`);
    style.setProperty('--gap-lg', `${1.5 * spacingMultiplier}rem`);
    style.setProperty('--gap-xl', `${2 * spacingMultiplier}rem`);

    // Card padding based on density
    style.setProperty('--card-padding', `${1.5 * spacingMultiplier}rem`);

  }, [colors, typeScale, spacingMultiplier, borderRadius]);

  const resetDefaults = () => {
    setColors(defaultColors);
    setTypeScale('mt');
    setSpacingMultiplier(1);
    setBorderRadius('8px');
  };

  return (
    <div style={{ maxWidth: 'var(--layout-7xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h3)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-3)',
          }}
        >
          Theme Preview
        </h1>
        <p 
          style={{ 
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-muted)',
            lineHeight: 'var(--line-height-snug)',
            maxWidth: '60ch',
          }}
        >
          Experiment with colors, typography, and spacing to see how the design tokens work together.
        </p>
      </div>

      {/* Controls Panel */}
      <div 
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-8)',
          border: '1px solid var(--card-border)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 
            className="font-bold flex items-center gap-3"
            style={{ 
              fontSize: 'var(--font-size-h6)',
              color: 'var(--color-foreground)',
            }}
          >
            <Palette className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
            Theme Customizer
          </h2>
          <button 
            onClick={resetDefaults}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ 
              fontSize: 'var(--font-size-body-small)',
              color: 'var(--color-muted)',
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
            }}
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Color Palette Section */}
        <div className="mb-8">
          <h3 
            className="font-semibold mb-4 flex items-center gap-2"
            style={{ 
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-foreground)',
            }}
          >
            <Palette className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
            Color Palette
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colorConfigs.map(({ key, label, variable, icon: Icon }) => (
              <div 
                key={key}
                className="group"
              >
                <label 
                  className="block mb-2 font-medium"
                  style={{ 
                    fontSize: 'var(--font-size-body-small)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: colors[key] }} />
                    {label}
                  </span>
                </label>
                <label 
                  className="relative block cursor-pointer"
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                  }}
                >
                  <div 
                    className="w-full h-12"
                    style={{ backgroundColor: colors[key] }}
                  />
                  <input 
                    type="color" 
                    value={colors[key]}
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 px-2 py-1 text-center font-mono"
                    style={{ 
                      fontSize: '10px',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'rgba(255,255,255,0.9)',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {colors[key].toUpperCase()}
                  </div>
                </label>
                <VarInfo variables={[variable]} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Border Radius */}
          <div>
            <h3 
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-foreground)',
              }}
            >
              <Box className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
              Border Radius
            </h3>
            <div className="flex flex-wrap gap-2">
              {radiusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBorderRadius(option.value)}
                  className="px-4 py-2 transition-all"
                  style={{
                    fontSize: 'var(--font-size-body-small)',
                    backgroundColor: borderRadius === option.value ? colors.brand : 'var(--color-background)',
                    color: borderRadius === option.value ? 'white' : 'var(--color-muted)',
                    borderRadius: option.value === '24px' ? '12px' : option.value,
                    border: `1px solid ${borderRadius === option.value ? colors.brand : 'var(--color-border)'}`,
                    fontWeight: borderRadius === option.value ? 600 : 400,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <VarInfo 
              variables={['--radius-card', '--radius-button', '--radius-xl']}
              note="Sets card and button corners"
            />
          </div>

          {/* Typography Scale */}
          <div>
            <h3 
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-foreground)',
              }}
            >
              <Type className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
              Type Scale
            </h3>
            <div 
              className="flex p-1 rounded-lg"
              style={{ 
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
              }}
            >
              <button 
                onClick={() => setTypeScale('ms')}
                className="flex-1 py-3 px-4 rounded-md text-center transition-all"
                style={{
                  fontSize: 'var(--font-size-body-small)',
                  backgroundColor: typeScale === 'ms' ? 'var(--card-bg)' : 'transparent',
                  color: typeScale === 'ms' ? colors.brand : 'var(--color-muted)',
                  boxShadow: typeScale === 'ms' ? 'var(--shadow-sm)' : 'none',
                  fontWeight: typeScale === 'ms' ? 600 : 400,
                }}
              >
                Major Second
              </button>
              <button 
                onClick={() => setTypeScale('mt')}
                className="flex-1 py-3 px-4 rounded-md text-center transition-all"
                style={{
                  fontSize: 'var(--font-size-body-small)',
                  backgroundColor: typeScale === 'mt' ? 'var(--card-bg)' : 'transparent',
                  color: typeScale === 'mt' ? colors.brand : 'var(--color-muted)',
                  boxShadow: typeScale === 'mt' ? 'var(--shadow-sm)' : 'none',
                  fontWeight: typeScale === 'mt' ? 600 : 400,
                }}
              >
                Major Third
              </button>
            </div>
            <p 
              style={{ 
                marginTop: 'var(--spacing-2)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-muted)',
              }}
            >
              {typeScale === 'ms' ? '1.125 ratio – tighter headings' : '1.25 ratio – dramatic hierarchy'}
            </p>
            <VarInfo 
              variables={[
                `--font-size-*--${typeScale}`,
                '--font-size-h1',
                '--font-size-body'
              ]}
              note={`Using ${typeScale === 'ms' ? 'Major Second' : 'Major Third'} scale suffix`}
            />
          </div>

          {/* Spacing Density */}
          <div>
            <h3 
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-foreground)',
              }}
            >
              <Ruler className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
              Spacing & Density
            </h3>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={spacingMultiplier}
              onChange={(e) => setSpacingMultiplier(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ 
                backgroundColor: 'var(--color-border)',
                accentColor: colors.brand,
              }}
            />
            <div 
              className="flex justify-between mt-2"
              style={{ 
                fontSize: 'var(--font-size-body-small)',
                color: 'var(--color-muted)',
              }}
            >
              <span>Compact</span>
              <span className="font-semibold" style={{ color: colors.brand }}>
                {Math.round(spacingMultiplier * 100)}%
              </span>
              <span>Spacious</span>
            </div>
            <p 
              style={{ 
                marginTop: 'var(--spacing-2)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-muted)',
              }}
            >
              Affects padding, gaps, and line height
            </p>
            <VarInfo 
              variables={['--spacing-*', '--gap-*', '--card-padding', '--line-height-body']}
            />
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div 
        ref={previewRef}
        style={{
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--card-border)',
        }}
      >
        {/* Hero Section */}
        <div 
          className="relative overflow-hidden text-center"
          style={{ 
            backgroundColor: 'var(--color-base)',
            padding: 'var(--spacing-16) var(--spacing-8)',
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{ 
              background: `linear-gradient(90deg, var(--color-brand), var(--color-secondary))`,
            }}
          />
          <h1 
            className="font-bold text-white"
            style={{ 
              fontSize: 'var(--font-size-h1)',
              lineHeight: 'var(--line-height-heading, 1.1)',
              marginBottom: 'var(--gap-md)',
            }}
          >
            Build with <span style={{ color: 'var(--color-brand)' }}>Altitude</span>
          </h1>
          <p 
            className="text-gray-300 mx-auto"
            style={{ 
              fontSize: 'var(--font-size-lead)',
              maxWidth: '40rem',
              lineHeight: 'var(--line-height-body, 1.5)',
              marginBottom: 'var(--gap-xl)',
            }}
          >
            A modern design system with semantic tokens for consistent, 
            scalable, and accessible interfaces across all platforms.
          </p>
          <div className="flex items-center justify-center" style={{ gap: 'var(--gap-md)' }}>
            <button 
              className="font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-text-on-brand)',
                borderRadius: 'var(--radius-button)',
                padding: 'var(--spacing-3) var(--spacing-6)',
                fontSize: 'var(--font-size-body-small)',
                boxShadow: 'var(--shadow-button)',
              }}
            >
              Get Started
            </button>
            <button 
              className="font-semibold border-2 transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius-button)',
                padding: 'var(--spacing-3) var(--spacing-6)',
                fontSize: 'var(--font-size-body-small)',
              }}
            >
              Documentation
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div 
          style={{ 
            backgroundColor: 'var(--color-background)',
            padding: 'var(--spacing-12) var(--spacing-8)',
          }}
        >
          {/* Text Content */}
          <div className="max-w-3xl mx-auto" style={{ marginBottom: 'var(--gap-xl)' }}>
            <h2 
              className="font-bold"
              style={{ 
                fontSize: 'var(--font-size-h2)',
                color: 'var(--color-foreground)',
                lineHeight: 'var(--line-height-heading, 1.1)',
                marginBottom: 'var(--gap-md)',
              }}
            >
              Semantic Typography
            </h2>
            <div 
              style={{ 
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-body, 1.5)',
              }}
            >
              <p style={{ marginBottom: 'var(--gap-md)' }}>
                This paragraph uses the <code 
                  className="font-mono font-medium"
                  style={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#DC2626',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                  }}
                >body</code> token. 
                Notice how headings and body text scale proportionally based on your selected type scale.
              </p>
              <p>
                The design system uses fluid typography with <code 
                  className="font-mono font-medium"
                  style={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#DC2626',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                  }}
                >clamp()</code> functions, 
                ensuring optimal readability from mobile to ultra-wide displays.
              </p>
            </div>
          </div>

          {/* Card Grid */}
          <div style={{ marginBottom: 'var(--gap-xl)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--gap-lg)' }}>
              <h3 
                className="font-bold"
                style={{ 
                  fontSize: 'var(--font-size-h3)',
                  color: 'var(--color-foreground)',
                  lineHeight: 'var(--line-height-heading, 1.1)',
                }}
              >
                Components
              </h3>
              <a 
                href="#"
                className="flex items-center font-semibold"
                style={{ 
                  fontSize: 'var(--font-size-label)',
                  color: 'var(--color-brand)',
                  gap: 'var(--gap-sm)',
                }}
              >
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'var(--gap-lg)' }}>
              {[
                { icon: Star, primary: true },
                { icon: Box, primary: false },
                { icon: Mail, primary: true },
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
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ 
                      borderRadius: 'var(--card-border-radius)',
                      backgroundColor: item.primary ? 'var(--color-brand)' : 'var(--color-secondary)',
                      marginBottom: 'var(--gap-md)',
                    }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 
                    className="font-semibold"
                    style={{ 
                      fontSize: 'var(--card-title-lg-font-size)',
                      color: 'var(--color-foreground)',
                      lineHeight: 'var(--line-height-snug)',
                      marginBottom: 'var(--gap-sm)',
                    }}
                  >
                    Feature Card {i + 1}
                  </h4>
                  <p 
                    style={{ 
                      fontSize: 'var(--card-subtitle-font-size)',
                      color: 'var(--color-muted)',
                      lineHeight: 'var(--line-height-body, 1.5)',
                      marginBottom: 'var(--gap-md)',
                    }}
                  >
                    Card component using semantic tokens for consistent styling and spacing.
                  </p>
                  <span 
                    className="font-semibold"
                    style={{ 
                      fontSize: 'var(--font-size-label)',
                      color: item.primary ? 'var(--color-brand)' : 'var(--color-secondary)',
                    }}
                  >
                    Learn more
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div 
            className="max-w-md mx-auto"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: 'var(--card-border-radius)',
              padding: 'var(--card-padding)',
              border: '1px solid var(--card-border)',
            }}
          >
            <h3 
              className="font-semibold"
              style={{ 
                fontSize: 'var(--card-title-lg-font-size)',
                color: 'var(--color-foreground)',
                lineHeight: 'var(--line-height-snug)',
                marginBottom: 'var(--gap-md)',
              }}
            >
              Contact Form
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
              <div>
                <label 
                  className="block font-medium"
                  style={{ 
                    fontSize: 'var(--font-size-label)',
                    color: 'var(--color-foreground)',
                    marginBottom: 'var(--gap-sm)',
                  }}
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full outline-none transition-all"
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
              <div className="flex" style={{ gap: 'var(--gap-md)' }}>
                <button 
                  className="flex-1 font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-text-on-secondary)',
                    borderRadius: 'var(--radius-button)',
                    minHeight: 'var(--size-10)',
                    fontSize: 'var(--font-size-body-small)',
                  }}
                >
                  Subscribe
                </button>
                <button 
                  className="flex-1 font-semibold transition-colors border"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-muted)',
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                    minHeight: 'var(--size-10)',
                    fontSize: 'var(--font-size-body-small)',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
