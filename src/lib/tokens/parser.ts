/**
 * Token Parser Utility
 * 
 * Parses raw token JSON files into structured ParsedToken objects.
 * Handles nested token groups and generates CSS variable names.
 */

import {
  RawTokenValue,
  RawTokenFile,
  NestedTokenGroup,
  ParsedToken,
  TokenType,
  TokenLayer,
  TokenGroup,
  ColorPalette,
  ColorFamily,
  ColorSwatch,
  SpacingToken,
  RadiusToken,
  isTokenReference,
} from '../types';

// =============================================================================
// TOKEN FILE LOADING
// =============================================================================

// Import token data (these will be loaded from public or as static imports)
import PrimitivesData from '../../../../tokens/01-Primitives.json';
import TypographyMajorSecondData from '../../../../tokens/02a-Typography-MajorSecond.json';
import TypographyMajorThirdData from '../../../../tokens/02b-Typography-MajorThird.json';
import SemanticData from '../../../../tokens/03-Semantic.json';
import ComponentsData from '../../../../tokens/04-Components.json';
import GreenshiftData from '../../../../tokens/05-Greenshift.json';

/** All loaded token collections */
export const TOKEN_DATA = {
  primitives: PrimitivesData as RawTokenFile,
  typographyMajorSecond: TypographyMajorSecondData as RawTokenFile,
  typographyMajorThird: TypographyMajorThirdData as RawTokenFile,
  semantic: SemanticData as RawTokenFile,
  components: ComponentsData as RawTokenFile,
  greenshift: GreenshiftData as RawTokenFile,
};

// =============================================================================
// COLLECTION NAME MAPPING
// =============================================================================

/** Map collection names from JSON to TokenLayer */
export function getTokenLayer(collectionName: string): TokenLayer {
  const normalized = collectionName.toLowerCase();
  
  if (normalized.includes('primitive')) return TokenLayer.Primitives;
  if (normalized.includes('typography')) return TokenLayer.Typography;
  if (normalized.includes('semantic')) return TokenLayer.Semantic;
  if (normalized.includes('component')) return TokenLayer.Components;
  if (normalized.includes('greenshift')) return TokenLayer.Greenshift;
  
  return TokenLayer.Primitives; // Default fallback
}

/** Get collection name from file */
export function getCollectionName(data: RawTokenFile): string {
  return Object.keys(data)[0];
}

// =============================================================================
// CSS VARIABLE NAME GENERATION
// =============================================================================

/** Convert path segments to CSS variable name */
export function pathToCssVariable(collection: string, path: string): string {
  const prefix = collection.toLowerCase()
    .replace(/\s+-\s+/g, '-')
    .replace(/\s+/g, '-');
  
  const segments = path
    .split('.')
    .map(segment => 
      segment
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/\s+/g, '-')
    );
  
  return `--${prefix}-${segments.join('-')}`;
}

/** Convert path to display name */
export function pathToDisplayName(path: string): string {
  return path
    .split('.')
    .map(segment => 
      segment
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    )
    .join(' › ');
}

// =============================================================================
// TOKEN PARSING
// =============================================================================

/** Check if an object is a raw token value */
function isRawTokenValue(obj: unknown): obj is RawTokenValue {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    '$value' in obj &&
    '$type' in obj
  );
}

/** Parse a single token value into ParsedToken */
function parseTokenValue(
  value: RawTokenValue,
  path: string,
  collection: string,
  mode: string,
  layer: TokenLayer
): ParsedToken {
  const rawValue = value.$value;
  const isRef = typeof rawValue === 'string' && isTokenReference(rawValue);
  
  return {
    path,
    name: pathToDisplayName(path),
    value: rawValue, // Will be resolved later if it's a reference
    originalValue: rawValue,
    type: value.$type as TokenType,
    cssVariable: pathToCssVariable(collection, path),
    collection,
    mode,
    layer,
    reference: isRef ? rawValue : undefined,
    wpVariable: value.$wpVariable,
    description: value.$description,
  };
}

/** Recursively parse nested token groups */
function parseTokenGroup(
  group: NestedTokenGroup,
  parentPath: string,
  collection: string,
  mode: string,
  layer: TokenLayer
): ParsedToken[] {
  const tokens: ParsedToken[] = [];
  
  for (const [key, value] of Object.entries(group)) {
    // Skip metadata fields
    if (key.startsWith('$')) continue;
    
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    
    if (isRawTokenValue(value)) {
      tokens.push(parseTokenValue(value, currentPath, collection, mode, layer));
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested groups
      tokens.push(...parseTokenGroup(value as NestedTokenGroup, currentPath, collection, mode, layer));
    }
  }
  
  return tokens;
}

/** Parse all tokens from a collection */
export function parseCollection(data: RawTokenFile): ParsedToken[] {
  const tokens: ParsedToken[] = [];
  const collectionName = getCollectionName(data);
  const collection = data[collectionName];
  const layer = getTokenLayer(collectionName);
  
  if (!collection.modes) return tokens;
  
  for (const [modeName, modeData] of Object.entries(collection.modes)) {
    tokens.push(...parseTokenGroup(modeData, '', collectionName, modeName, layer));
  }
  
  return tokens;
}

// =============================================================================
// TOKEN COLLECTION PARSERS
// =============================================================================

/** Parse all primitive tokens */
export function parsePrimitives(): ParsedToken[] {
  return parseCollection(TOKEN_DATA.primitives);
}

/** Parse typography tokens (both scales) */
export function parseTypography(scale: 'majorSecond' | 'majorThird' = 'majorSecond'): ParsedToken[] {
  const data = scale === 'majorSecond' 
    ? TOKEN_DATA.typographyMajorSecond 
    : TOKEN_DATA.typographyMajorThird;
  return parseCollection(data);
}

/** Parse semantic tokens */
export function parseSemantic(mode: 'Light' | 'Dark' = 'Light'): ParsedToken[] {
  const allTokens = parseCollection(TOKEN_DATA.semantic);
  return allTokens.filter(token => token.mode === mode);
}

/** Parse component tokens */
export function parseComponents(): ParsedToken[] {
  return parseCollection(TOKEN_DATA.components);
}

/** Parse Greenshift tokens */
export function parseGreenshift(mode: 'Light' | 'Dark' = 'Light'): ParsedToken[] {
  const allTokens = parseCollection(TOKEN_DATA.greenshift);
  return allTokens.filter(token => token.mode === mode);
}

/** Parse all tokens from all collections */
export function parseAllTokens(): ParsedToken[] {
  return [
    ...parsePrimitives(),
    ...parseTypography('majorSecond'),
    ...parseTypography('majorThird'),
    ...parseSemantic('Light'),
    ...parseSemantic('Dark'),
    ...parseComponents(),
    ...parseGreenshift('Light'),
    ...parseGreenshift('Dark'),
  ];
}

// =============================================================================
// TOKEN GROUPING UTILITIES
// =============================================================================

/** Group tokens by their first path segment */
export function groupTokensByCategory(tokens: ParsedToken[]): TokenGroup[] {
  const groups = new Map<string, ParsedToken[]>();
  
  for (const token of tokens) {
    const category = token.path.split('.')[0];
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(token);
  }
  
  return Array.from(groups.entries()).map(([name, tokens]) => ({
    name,
    label: pathToDisplayName(name),
    tokens,
  }));
}

/** Group tokens by layer */
export function groupTokensByLayer(tokens: ParsedToken[]): Record<TokenLayer, ParsedToken[]> {
  const result: Record<TokenLayer, ParsedToken[]> = {
    [TokenLayer.Primitives]: [],
    [TokenLayer.Typography]: [],
    [TokenLayer.Semantic]: [],
    [TokenLayer.Components]: [],
    [TokenLayer.Greenshift]: [],
  };
  
  for (const token of tokens) {
    result[token.layer].push(token);
  }
  
  return result;
}

/** Group tokens by type */
export function groupTokensByType(tokens: ParsedToken[]): Record<TokenType, ParsedToken[]> {
  const result: Record<TokenType, ParsedToken[]> = {
    color: [],
    number: [],
    string: [],
  };
  
  for (const token of tokens) {
    result[token.type].push(token);
  }
  
  return result;
}

// =============================================================================
// COLOR PALETTE UTILITIES
// =============================================================================

/** Color category mapping */
const COLOR_CATEGORIES: Record<ColorFamily, ColorPalette['category']> = {
  Slate: 'neutral',
  Gray: 'neutral',
  Zinc: 'neutral',
  Neutral: 'neutral',
  Stone: 'neutral',
  Red: 'warm',
  Orange: 'warm',
  Amber: 'warm',
  Yellow: 'warm',
  Lime: 'warm',
  Green: 'cool',
  Emerald: 'cool',
  Teal: 'cool',
  Cyan: 'cool',
  Sky: 'cool',
  Blue: 'blue',
  Indigo: 'blue',
  Violet: 'blue',
  Purple: 'blue',
  Fuchsia: 'pink',
  Pink: 'pink',
  Rose: 'pink',
  Base: 'base',
};

/** Determine if a color is light (for text contrast) */
function isLightColor(hex: string): boolean {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5;
}

/** Parse color tokens into color palettes */
export function parseColorPalettes(): ColorPalette[] {
  const primitives = parsePrimitives();
  const colorTokens = primitives.filter(
    t => t.type === 'color' && t.path.startsWith('Color.')
  );
  
  // Group by color family
  const families = new Map<string, ParsedToken[]>();
  
  for (const token of colorTokens) {
    const parts = token.path.split('.');
    if (parts.length >= 2) {
      const family = parts[1];
      if (!families.has(family)) {
        families.set(family, []);
      }
      families.get(family)!.push(token);
    }
  }
  
  // Convert to ColorPalette format
  const palettes: ColorPalette[] = [];
  
  for (const [name, tokens] of families) {
    const swatches: ColorSwatch[] = tokens.map(token => {
      const parts = token.path.split('.');
      const shade = parts[parts.length - 1];
      const hex = token.value as string;
      
      return {
        shade,
        hex,
        cssVariable: token.cssVariable,
        isLight: isLightColor(hex),
      };
    });
    
    // Sort swatches by shade number (50-950) or special names
    swatches.sort((a, b) => {
      const numA = parseInt(a.shade) || 999;
      const numB = parseInt(b.shade) || 999;
      return numA - numB;
    });
    
    palettes.push({
      name: name as ColorFamily,
      displayName: name,
      swatches,
      category: COLOR_CATEGORIES[name as ColorFamily] || 'neutral',
    });
  }
  
  // Sort palettes by category order
  const categoryOrder = ['neutral', 'warm', 'cool', 'blue', 'pink', 'base'];
  palettes.sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category);
    const orderB = categoryOrder.indexOf(b.category);
    return orderA - orderB;
  });
  
  return palettes;
}

// =============================================================================
// SPACING & RADIUS UTILITIES
// =============================================================================

/** Parse spacing tokens with additional metadata */
export function parseSpacingTokens(): SpacingToken[] {
  const primitives = parsePrimitives();
  return primitives
    .filter(t => t.path.startsWith('Spacing.'))
    .map(token => {
      const pixels = token.value as number;
      return {
        ...token,
        pixels,
        rem: pixels / 16,
        scaleKey: token.path.split('.')[1],
      };
    });
}

/** Parse radius tokens with additional metadata */
export function parseRadiusTokens(): RadiusToken[] {
  const primitives = parsePrimitives();
  return primitives
    .filter(t => t.path.startsWith('Radius.'))
    .map(token => {
      const pixels = token.value as number;
      return {
        ...token,
        pixels,
        scaleKey: token.path.split('.')[1] as RadiusToken['scaleKey'],
      };
    });
}

// =============================================================================
// TOKEN LOOKUP UTILITIES
// =============================================================================

/** Create a lookup map for fast token access by path */
export function createTokenLookup(tokens: ParsedToken[]): Map<string, ParsedToken> {
  const lookup = new Map<string, ParsedToken>();
  
  for (const token of tokens) {
    // Add with full path including collection and mode
    const fullPath = `${token.collection}.modes.${token.mode}.${token.path}`;
    lookup.set(fullPath, token);
    
    // Also add shorthand lookup
    lookup.set(`${token.collection}.${token.mode}.${token.path}`, token);
  }
  
  return lookup;
}

/** Find a token by its reference string */
export function findTokenByReference(
  reference: string,
  tokens: ParsedToken[]
): ParsedToken | undefined {
  // Parse reference: {Collection.modes.Mode.Path.To.Token}
  const match = reference.match(/^\{(.+)\}$/);
  if (!match) return undefined;
  
  const refPath = match[1];
  const lookup = createTokenLookup(tokens);
  
  return lookup.get(refPath);
}

/** Get all tokens that reference a specific token */
export function getTokensReferencingToken(
  targetToken: ParsedToken,
  allTokens: ParsedToken[]
): ParsedToken[] {
  const targetRef = `{${targetToken.collection}.modes.${targetToken.mode}.${targetToken.path}}`;
  
  return allTokens.filter(token => {
    const originalValue = String(token.originalValue);
    return originalValue === targetRef;
  });
}

// =============================================================================
// STATISTICS & METADATA
// =============================================================================

/** Get token statistics */
export function getTokenStats(tokens: ParsedToken[]): {
  total: number;
  byLayer: Record<TokenLayer, number>;
  byType: Record<TokenType, number>;
  withReferences: number;
} {
  const byLayer = groupTokensByLayer(tokens);
  const byType = groupTokensByType(tokens);
  
  return {
    total: tokens.length,
    byLayer: {
      [TokenLayer.Primitives]: byLayer[TokenLayer.Primitives].length,
      [TokenLayer.Typography]: byLayer[TokenLayer.Typography].length,
      [TokenLayer.Semantic]: byLayer[TokenLayer.Semantic].length,
      [TokenLayer.Components]: byLayer[TokenLayer.Components].length,
      [TokenLayer.Greenshift]: byLayer[TokenLayer.Greenshift].length,
    },
    byType: {
      color: byType.color.length,
      number: byType.number.length,
      string: byType.string.length,
    },
    withReferences: tokens.filter(t => t.reference).length,
  };
}
