/**
 * Altitude Design System - TypeScript Interfaces
 * 
 * This file defines all type definitions for the 5-layer token architecture:
 * - Primitives (raw values)
 * - Typography (type scales)
 * - Semantic (role-based tokens)
 * - Components (component-specific tokens)
 * - Greenshift (WordPress/framework adapter)
 */

// =============================================================================
// TOKEN VALUE TYPES
// =============================================================================

/** Supported token value types */
export type TokenType = 'color' | 'number' | 'string';

/** Raw token value as stored in JSON files */
export interface RawTokenValue {
  $value: string | number;
  $type: TokenType;
  $description?: string;
  /** WordPress CSS custom property (Greenshift layer only) */
  $wpVariable?: string;
}

/** Token reference pattern: {Collection.modes.Mode.Path.To.Token} */
export type TokenReference = string;

/** Check if a value is a token reference */
export function isTokenReference(value: string | number): value is TokenReference {
  return typeof value === 'string' && value.startsWith('{') && value.endsWith('}');
}

// =============================================================================
// COLLECTION STRUCTURES (Raw JSON)
// =============================================================================

/** Generic nested token structure (recursive) */
export interface NestedTokenGroup {
  [key: string]: RawTokenValue | NestedTokenGroup;
}

/** Mode structure within a collection */
export interface CollectionModes {
  [modeName: string]: NestedTokenGroup;
}

/** Base collection structure */
export interface TokenCollection {
  modes: CollectionModes;
  $description?: string;
  $framework?: string;
  $mappingVersion?: string;
}

/** Root structure of token JSON files */
export interface RawTokenFile {
  [collectionName: string]: TokenCollection;
}

// =============================================================================
// PRIMITIVES COLLECTION
// =============================================================================

/** Color shade levels (50-950) */
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

/** All primitive color family names */
export type ColorFamily = 
  | 'Slate' | 'Gray' | 'Zinc' | 'Neutral' | 'Stone'  // Neutrals
  | 'Red' | 'Orange' | 'Amber' | 'Yellow' | 'Lime'   // Warm
  | 'Green' | 'Emerald' | 'Teal' | 'Cyan' | 'Sky'    // Cool
  | 'Blue' | 'Indigo' | 'Violet' | 'Purple'          // Blue family
  | 'Fuchsia' | 'Pink' | 'Rose'                       // Pink family
  | 'Base';                                            // Special (White, Black, Transparent)

/** Spacing scale keys */
export type SpacingKey = 
  | '0' | 'px' | '0-5' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4' 
  | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16' 
  | '20' | '24' | '28' | '32' | '36' | '40' | '44' | '48' | '52' | '56' | '60' | '64';

/** Size scale keys */
export type SizeKey = 
  | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' 
  | '14' | '16' | '20' | '24' | '28' | '32' | '36' | '40' | '44' | '48';

/** Layout breakpoint keys */
export type LayoutKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

/** Radius scale keys */
export type RadiusKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

/** Line height keys */
export type LineHeightKey = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

/** Font weight keys */
export type FontWeightKey = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

/** Duration keys */
export type DurationKey = '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';

// =============================================================================
// SEMANTIC COLLECTION
// =============================================================================

/** Semantic color categories */
export type SemanticColorCategory = 
  | 'Brand' 
  | 'Secondary' 
  | 'Background' 
  | 'Surface' 
  | 'Text' 
  | 'Card' 
  | 'Border' 
  | 'Status'
  | 'Base';

/** Brand color roles */
export type BrandColorRole = 'Default' | 'Hover' | 'Light' | 'Dark';

/** Secondary color roles */
export type SecondaryColorRole = 'Default' | 'Hover' | 'Light';

/** Background color roles */
export type BackgroundColorRole = 'Default' | 'Alt';

/** Text color roles */
export type TextColorRole = 'Foreground' | 'Muted' | 'Subtle' | 'OnBrand' | 'OnSecondary';

/** Card color roles */
export type CardColorRole = 'Background' | 'Border';

/** Border color roles */
export type BorderColorRole = 'Default' | 'Strong';

/** Status color roles */
export type StatusColorRole = 'Success' | 'SuccessLight' | 'Warning' | 'WarningLight' | 'Error' | 'ErrorLight' | 'Info' | 'InfoLight';

/** Semantic radius roles */
export type SemanticRadiusRole = 'Button' | 'Card' | 'Input' | 'Badge' | 'Modal';

/** Semantic layout roles */
export type SemanticLayoutRole = 'ContentWidth' | 'WideWidth' | 'ProseWidth';

/** Semantic mode names */
export type SemanticMode = 'Light' | 'Dark';

// =============================================================================
// COMPONENT COLLECTION
// =============================================================================

/** Component names */
export type ComponentName = 'Button' | 'Card' | 'Input';

/** Button variant names */
export type ButtonVariant = 'Default' | 'Secondary' | 'Outline';

/** Button size names */
export type ButtonSize = 'sm' | 'md' | 'lg';

// =============================================================================
// TYPOGRAPHY COLLECTION
// =============================================================================

/** Typography scale names */
export type TypographyScale = 'Major Second' | 'Major Third';

/** Typography mode names (responsive) */
export type TypographyMode = 'Mobile' | 'Desktop';

/** Font size keys */
export type FontSizeKey = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

// =============================================================================
// GREENSHIFT COLLECTION
// =============================================================================

/** Greenshift category names */
export type GreenshiftCategory = 'Preset' | 'Custom' | 'Style';

/** Greenshift preset subcategories */
export type GreenshiftPresetType = 'Color';

/** Greenshift custom component types */
export type GreenshiftCustomType = 'Button' | 'Card' | 'Input' | 'Badge' | 'Modal';

/** Greenshift style types */
export type GreenshiftStyleType = 'Global';

// =============================================================================
// TOKEN LAYER ENUM
// =============================================================================

/** Token layer/collection names */
export enum TokenLayer {
  Primitives = 'Primitives',
  Typography = 'Typography',
  Semantic = 'Semantic',
  Components = 'Components',
  Greenshift = 'Greenshift',
}

/** Token layer display info */
export interface TokenLayerInfo {
  layer: TokenLayer;
  displayName: string;
  shortName: string;
  description: string;
  order: number;
  color: string;
}

/** Layer info lookup */
export const TOKEN_LAYER_INFO: Record<TokenLayer, TokenLayerInfo> = {
  [TokenLayer.Primitives]: {
    layer: TokenLayer.Primitives,
    displayName: 'Primitives',
    shortName: 'PRM',
    description: 'Raw values: Colors, Spacing, Radius, etc.',
    order: 1,
    color: '#3b82f6', // blue-500
  },
  [TokenLayer.Typography]: {
    layer: TokenLayer.Typography,
    displayName: 'Typography',
    shortName: 'TYP',
    description: 'Type scales: Major Second (1.125) / Major Third (1.25)',
    order: 2,
    color: '#8b5cf6', // violet-500
  },
  [TokenLayer.Semantic]: {
    layer: TokenLayer.Semantic,
    displayName: 'Semantic',
    shortName: 'SEM',
    description: 'Role-based tokens: Brand, Background, Text, Status',
    order: 3,
    color: '#10b981', // emerald-500
  },
  [TokenLayer.Components]: {
    layer: TokenLayer.Components,
    displayName: 'Components',
    shortName: 'CMP',
    description: 'Button, Card, Input component tokens',
    order: 4,
    color: '#f59e0b', // amber-500
  },
  [TokenLayer.Greenshift]: {
    layer: TokenLayer.Greenshift,
    displayName: 'Greenshift',
    shortName: 'GRS',
    description: 'WordPress/Greenshift CSS custom properties',
    order: 5,
    color: '#6366f1', // indigo-500
  },
};

// =============================================================================
// PARSED/PROCESSED TOKEN TYPES
// =============================================================================

/** Parsed token with resolved metadata */
export interface ParsedToken {
  /** Full path: "Color.Emerald.400" */
  path: string;
  /** Display name: "Emerald 400" */
  name: string;
  /** Resolved final value: "#34d399" or 24 */
  value: string | number;
  /** Original value (may be reference): "{Primitives.modes.Default.Color.Emerald.400}" */
  originalValue: string | number;
  /** Token type */
  type: TokenType;
  /** CSS variable name: "--primitives-color-emerald-400" */
  cssVariable: string;
  /** Collection name */
  collection: string;
  /** Mode name */
  mode: string;
  /** Token layer */
  layer: TokenLayer;
  /** Reference string if value references another token */
  reference?: TokenReference;
  /** WordPress variable (Greenshift only) */
  wpVariable?: string;
  /** Optional description */
  description?: string;
}

/** Token with its full reference chain */
export interface TokenWithChain extends ParsedToken {
  /** Chain of tokens from this token to the primitive value */
  referenceChain: ParsedToken[];
  /** Tokens that reference this token */
  referencedBy: ParsedToken[];
}

// =============================================================================
// REFERENCE CHAIN TYPES
// =============================================================================

/** A single step in a reference chain */
export interface ReferenceChainStep {
  /** The token at this step */
  token: ParsedToken;
  /** Position in chain (0 = start, higher = closer to primitive) */
  depth: number;
  /** Is this the final resolved value? */
  isFinal: boolean;
}

/** Complete reference chain from one token to its primitive source */
export interface ReferenceChain {
  /** Starting token (e.g., Greenshift variable) */
  source: ParsedToken;
  /** All steps in the chain */
  steps: ReferenceChainStep[];
  /** Final resolved primitive value */
  resolvedValue: string | number;
  /** Total chain depth */
  depth: number;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/** Metadata included in API responses */
export interface TokenResponseMetadata {
  /** Total count of tokens */
  count: number;
  /** Token types present */
  types: TokenType[];
  /** Modes available */
  modes: string[];
  /** Last updated timestamp */
  lastUpdated: string;
  /** Layer/collection name */
  layer: TokenLayer;
}

/** Standard API response for token endpoints */
export interface TokenApiResponse {
  /** Collection name */
  collection: string;
  /** Current mode (if applicable) */
  mode?: string;
  /** Array of parsed tokens */
  tokens: ParsedToken[];
  /** Response metadata */
  metadata: TokenResponseMetadata;
}

/** API response for a single token with full chain */
export interface TokenDetailResponse {
  /** The requested token */
  token: TokenWithChain;
  /** Related tokens in same group */
  siblings?: ParsedToken[];
}

/** Export format options */
export type ExportFormat = 'css' | 'json' | 'figma' | 'wordpress';

/** Export API request */
export interface ExportRequest {
  /** Format to export */
  format: ExportFormat;
  /** Mode to export */
  mode?: string;
  /** Specific layers to include */
  layers?: TokenLayer[];
  /** Include custom overrides */
  overrides?: Record<string, string | number>;
}

/** Export API response */
export interface ExportResponse {
  /** Exported content */
  content: string;
  /** File extension */
  extension: string;
  /** MIME type */
  mimeType: string;
  /** Suggested filename */
  filename: string;
}

// =============================================================================
// FILTER & SEARCH TYPES
// =============================================================================

/** Token search/filter criteria */
export interface TokenFilter {
  /** Search query */
  query?: string;
  /** Filter by layer(s) */
  layers?: TokenLayer[];
  /** Filter by type(s) */
  types?: TokenType[];
  /** Filter by mode */
  mode?: string;
  /** Filter by category/group */
  category?: string;
  /** Only tokens with references */
  hasReference?: boolean;
}

/** Grouped token results */
export interface TokenGroup {
  /** Group name/path */
  name: string;
  /** Display label */
  label: string;
  /** Tokens in this group */
  tokens: ParsedToken[];
  /** Subgroups */
  subgroups?: TokenGroup[];
}

// =============================================================================
// COLOR PALETTE TYPES
// =============================================================================

/** Single color swatch */
export interface ColorSwatch {
  /** Shade level (50-950) or name (White, Black) */
  shade: string;
  /** Hex color value */
  hex: string;
  /** CSS variable name */
  cssVariable: string;
  /** Is this a light shade (for text contrast) */
  isLight: boolean;
}

/** Complete color family/palette */
export interface ColorPalette {
  /** Family name (Emerald, Blue, etc.) */
  name: ColorFamily;
  /** Display name */
  displayName: string;
  /** Array of swatches */
  swatches: ColorSwatch[];
  /** Category (Neutral, Warm, Cool, etc.) */
  category: 'neutral' | 'warm' | 'cool' | 'blue' | 'pink' | 'base';
}

// =============================================================================
// SPACING & SIZE TYPES
// =============================================================================

/** Spacing token with visual metadata */
export interface SpacingToken extends ParsedToken {
  /** Pixel value */
  pixels: number;
  /** Rem value */
  rem: number;
  /** Scale key (0, 1, 2, etc.) */
  scaleKey: string;
}

/** Radius token with visual metadata */
export interface RadiusToken extends ParsedToken {
  /** Pixel value */
  pixels: number;
  /** Scale key (sm, md, lg, etc.) */
  scaleKey: RadiusKey;
}

// =============================================================================
// COMPONENT TOKEN TYPES
// =============================================================================

/** Button component tokens */
export interface ButtonTokens {
  background: {
    default: ParsedToken;
    hover: ParsedToken;
  };
  text: ParsedToken;
  radius: ParsedToken;
  paddingX: ParsedToken;
  paddingY: ParsedToken;
  height: {
    sm: ParsedToken;
    md: ParsedToken;
    lg: ParsedToken;
  };
  secondary: {
    background: ParsedToken;
    backgroundHover: ParsedToken;
    text: ParsedToken;
  };
  outline: {
    background: ParsedToken;
    border: ParsedToken;
    text: ParsedToken;
    hoverBackground: ParsedToken;
  };
}

/** Card component tokens */
export interface CardTokens {
  background: ParsedToken;
  border: ParsedToken;
  text: ParsedToken;
  radius: ParsedToken;
  padding: ParsedToken;
}

/** Input component tokens */
export interface InputTokens {
  background: ParsedToken;
  border: {
    default: ParsedToken;
    focus: ParsedToken;
  };
  radius: ParsedToken;
  paddingX: ParsedToken;
  paddingY: ParsedToken;
  height: ParsedToken;
  text: ParsedToken;
  placeholder: ParsedToken;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Deep partial type */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Extract keys of type */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/** CSS variable name format */
export type CSSVariableName = `--${string}`;

/** WordPress variable name format */
export type WPVariableName = `--wp--${string}`;
