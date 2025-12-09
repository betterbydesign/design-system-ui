/**
 * CSS Variable Injector for Theme Generator
 * 
 * Handles real-time injection of CSS custom properties
 * based on theme generator state changes.
 */

import { 
  colorPalettes, 
  ColorFamily, 
  NeutralFamily, 
  Shade,
  getColor,
} from './colorPalettes';

export type RadiusPreset = 'sharp' | 'default' | 'rounded' | 'pill';
export type TypeScale = 'ms' | 'mt';

export interface RadiusValues {
  button: number;
  card: number;
  input: number;
  badge: number;
}

export interface ThemeColors {
  brandFamily: ColorFamily;
  brandShade: Shade;
  secondaryFamily: ColorFamily;
  secondaryShade: Shade;
  accentFamily: ColorFamily;
  accentShade: Shade;
  neutralFamily: NeutralFamily;
}

/** Radius preset configurations */
export const RADIUS_PRESETS: Record<RadiusPreset, RadiusValues> = {
  sharp: { button: 0, card: 0, input: 0, badge: 2 },
  default: { button: 6, card: 8, input: 4, badge: 9999 },
  rounded: { button: 12, card: 16, input: 8, badge: 9999 },
  pill: { button: 9999, card: 24, input: 9999, badge: 9999 },
};

/** Get computed brand colors based on family and shade */
export function getBrandColors(family: ColorFamily, shade: Shade) {
  const shadeIndex = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].indexOf(shade);
  
  // Calculate related shades
  const hoverShade = Math.min(950, [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][Math.min(shadeIndex + 1, 10)]) as Shade;
  const lightShade = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][Math.max(shadeIndex - 3, 0)] as Shade;
  const darkShade = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][Math.min(shadeIndex + 3, 10)] as Shade;
  
  return {
    default: getColor(family, shade),
    hover: getColor(family, hoverShade),
    light: getColor(family, lightShade),
    dark: getColor(family, darkShade),
  };
}

/** Get computed neutral colors based on family */
export function getNeutralColors(family: NeutralFamily) {
  return {
    50: getColor(family, 50),
    100: getColor(family, 100),
    200: getColor(family, 200),
    300: getColor(family, 300),
    400: getColor(family, 400),
    500: getColor(family, 500),
    600: getColor(family, 600),
    700: getColor(family, 700),
    800: getColor(family, 800),
    900: getColor(family, 900),
    950: getColor(family, 950),
  };
}

/** Inject all theme CSS variables into the document */
export function injectThemeVariables(options: {
  colors: ThemeColors;
  radiusValues: RadiusValues;
  typeScale: TypeScale;
  baseFontSize: number;
  targetElement?: HTMLElement;
}) {
  const { colors, radiusValues, typeScale, baseFontSize, targetElement } = options;
  const target = targetElement || document.documentElement;
  
  // Inject brand colors
  const brandColors = getBrandColors(colors.brandFamily, colors.brandShade);
  target.style.setProperty('--color-brand', brandColors.default);
  target.style.setProperty('--color-brand-hover', brandColors.hover);
  target.style.setProperty('--color-brand-light', brandColors.light);
  target.style.setProperty('--color-brand-dark', brandColors.dark);
  
  // Inject secondary colors
  const secondaryColors = getBrandColors(colors.secondaryFamily, colors.secondaryShade);
  target.style.setProperty('--color-secondary', secondaryColors.default);
  target.style.setProperty('--color-secondary-hover', secondaryColors.hover);
  target.style.setProperty('--color-secondary-light', secondaryColors.light);
  target.style.setProperty('--color-secondary-dark', secondaryColors.dark);
  
  // Inject accent colors (for feature icons, badges, etc.)
  const accentColors = getBrandColors(colors.accentFamily, colors.accentShade);
  target.style.setProperty('--color-accent', accentColors.default);
  target.style.setProperty('--color-accent-hover', accentColors.hover);
  target.style.setProperty('--color-accent-light', accentColors.light);
  target.style.setProperty('--color-accent-dark', accentColors.dark);
  
  // Inject neutral colors
  const neutralColors = getNeutralColors(colors.neutralFamily);
  target.style.setProperty('--color-background', neutralColors[50]);
  target.style.setProperty('--color-background-alt', neutralColors[100]);
  target.style.setProperty('--color-foreground', neutralColors[900]);
  target.style.setProperty('--color-muted', neutralColors[500]);
  target.style.setProperty('--color-border', neutralColors[200]);
  target.style.setProperty('--color-border-strong', neutralColors[300]);
  target.style.setProperty('--color-surface', '#ffffff');
  target.style.setProperty('--color-surface-dark', neutralColors[800]);
  target.style.setProperty('--color-base', neutralColors[900]);
  
  // Inject radius values
  target.style.setProperty('--radius-button', `${radiusValues.button}px`);
  target.style.setProperty('--radius-card', `${radiusValues.card}px`);
  target.style.setProperty('--radius-input', `${radiusValues.input}px`);
  target.style.setProperty('--radius-badge', `${radiusValues.badge}px`);
  
  // Inject component-level radius aliases
  target.style.setProperty('--button-radius', `${radiusValues.button}px`);
  target.style.setProperty('--card-radius', `${radiusValues.card}px`);
  target.style.setProperty('--input-radius', `${radiusValues.input}px`);
  
  // Inject button colors
  target.style.setProperty('--button-bg', 'var(--color-brand)');
  target.style.setProperty('--button-bg-hover', 'var(--color-brand-hover)');
  target.style.setProperty('--button-text', '#ffffff');
  
  // Inject card colors
  target.style.setProperty('--card-bg', 'var(--color-surface)');
  target.style.setProperty('--card-border', 'var(--color-border)');
  
  // Inject input colors
  target.style.setProperty('--input-bg', 'var(--color-surface)');
  target.style.setProperty('--input-border', 'var(--color-border)');
  
  // Inject base font size
  target.style.setProperty('--font-size-base', `${baseFontSize}px`);
  
  // Type scale selection is handled via CSS class toggle
}

/** Get CSS variable string for export */
export function generateCSSExport(options: {
  colors: ThemeColors;
  radiusValues: RadiusValues;
  typeScale: TypeScale;
  baseFontSize: number;
}): string {
  const { colors, radiusValues, typeScale, baseFontSize } = options;
  
  const brandColors = getBrandColors(colors.brandFamily, colors.brandShade);
  const secondaryColors = getBrandColors(colors.secondaryFamily, colors.secondaryShade);
  const accentColors = getBrandColors(colors.accentFamily, colors.accentShade);
  const neutralColors = getNeutralColors(colors.neutralFamily);
  
  return `:root {
  /* Brand Colors */
  --color-brand: ${brandColors.default};
  --color-brand-hover: ${brandColors.hover};
  --color-brand-light: ${brandColors.light};
  --color-brand-dark: ${brandColors.dark};
  
  /* Secondary Colors */
  --color-secondary: ${secondaryColors.default};
  --color-secondary-hover: ${secondaryColors.hover};
  --color-secondary-light: ${secondaryColors.light};
  --color-secondary-dark: ${secondaryColors.dark};
  
  /* Accent Colors */
  --color-accent: ${accentColors.default};
  --color-accent-hover: ${accentColors.hover};
  --color-accent-light: ${accentColors.light};
  --color-accent-dark: ${accentColors.dark};
  
  /* Neutral Colors */
  --color-background: ${neutralColors[50]};
  --color-background-alt: ${neutralColors[100]};
  --color-foreground: ${neutralColors[900]};
  --color-muted: ${neutralColors[500]};
  --color-border: ${neutralColors[200]};
  --color-border-strong: ${neutralColors[300]};
  --color-surface: #ffffff;
  
  /* Radius */
  --radius-button: ${radiusValues.button}px;
  --radius-card: ${radiusValues.card}px;
  --radius-input: ${radiusValues.input}px;
  --radius-badge: ${radiusValues.badge}px;
  
  /* Typography */
  --font-size-base: ${baseFontSize}px;
  --type-scale: ${typeScale === 'ms' ? '1.125' : '1.250'};
  
  /* Component Tokens */
  --button-bg: var(--color-brand);
  --button-bg-hover: var(--color-brand-hover);
  --button-text: #ffffff;
  --button-radius: var(--radius-button);
  
  --card-bg: var(--color-surface);
  --card-border: var(--color-border);
  --card-radius: var(--radius-card);
  
  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
  --input-radius: var(--radius-input);
}`;
}

/** Clear all injected theme variables */
export function clearThemeVariables(targetElement?: HTMLElement) {
  const target = targetElement || document.documentElement;
  const properties = [
    '--color-brand', '--color-brand-hover', '--color-brand-light', '--color-brand-dark',
    '--color-secondary', '--color-secondary-hover', '--color-secondary-light', '--color-secondary-dark',
    '--color-accent', '--color-accent-hover', '--color-accent-light', '--color-accent-dark',
    '--color-background', '--color-background-alt', '--color-foreground',
    '--color-muted', '--color-border', '--color-border-strong', '--color-surface',
    '--radius-button', '--radius-card', '--radius-input', '--radius-badge',
    '--button-radius', '--card-radius', '--input-radius',
    '--button-bg', '--button-bg-hover', '--button-text',
    '--card-bg', '--card-border',
    '--input-bg', '--input-border',
    '--font-size-base',
  ];
  
  properties.forEach(prop => target.style.removeProperty(prop));
}
