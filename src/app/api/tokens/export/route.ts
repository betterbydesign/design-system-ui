/**
 * GET /api/tokens/export
 * 
 * Exports tokens in various formats
 * Query params:
 *   - format: 'css' | 'json' | 'figma' | 'wordpress' (default: 'css')
 *   - mode: 'Light' | 'Dark' (default: 'Light')
 *   - layers: comma-separated list of layers to include
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseAllTokens,
  parseSemantic,
  parseComponents,
  parseGreenshift,
  parsePrimitives,
  resolveAllTokens,
  TokenLayer,
  ParsedToken,
  ExportFormat,
} from '@/lib/tokens';

/** Generate CSS variables from tokens */
function generateCSS(tokens: ParsedToken[]): string {
  const lines = [
    '/* Altitude Design System - Generated CSS Variables */',
    '/* Generated: ' + new Date().toISOString() + ' */',
    '',
    ':root {',
  ];
  
  const resolvedTokens = resolveAllTokens(tokens);
  
  for (const token of resolvedTokens) {
    const value = token.type === 'color' 
      ? token.value 
      : typeof token.value === 'number' 
        ? `${token.value}px` 
        : token.value;
    
    lines.push(`  ${token.cssVariable}: ${value};`);
  }
  
  lines.push('}');
  
  return lines.join('\n');
}

/** Generate JSON export */
function generateJSON(tokens: ParsedToken[]): string {
  const resolvedTokens = resolveAllTokens(tokens);
  const output: Record<string, unknown> = {};
  
  for (const token of resolvedTokens) {
    // Build nested structure from path
    const parts = token.path.split('.');
    let current: Record<string, unknown> = output;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    
    current[parts[parts.length - 1]] = {
      $value: token.value,
      $type: token.type,
      cssVariable: token.cssVariable,
    };
  }
  
  return JSON.stringify(output, null, 2);
}

/** Generate Figma-compatible JSON */
function generateFigmaJSON(tokens: ParsedToken[]): string {
  const resolvedTokens = resolveAllTokens(tokens);
  const output: Record<string, unknown> = {};
  
  for (const token of resolvedTokens) {
    const parts = token.path.split('.');
    let current: Record<string, unknown> = output;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    
    current[parts[parts.length - 1]] = {
      $value: token.value,
      $type: token.type === 'color' ? 'color' : 'dimension',
    };
  }
  
  return JSON.stringify(output, null, 2);
}

/** Generate WordPress theme.json compatible format */
function generateWordPressJSON(tokens: ParsedToken[]): string {
  const resolvedTokens = resolveAllTokens(tokens);
  
  const themeJson = {
    $schema: 'https://schemas.wp.org/trunk/theme.json',
    version: 2,
    settings: {
      color: {
        palette: [] as Array<{ slug: string; color: string; name: string }>,
      },
      custom: {} as Record<string, unknown>,
    },
  };
  
  for (const token of resolvedTokens) {
    if (token.wpVariable) {
      if (token.wpVariable.includes('--wp--preset--color--')) {
        const slug = token.wpVariable.replace('--wp--preset--color--', '');
        themeJson.settings.color.palette.push({
          slug,
          color: token.value as string,
          name: token.name,
        });
      } else if (token.wpVariable.includes('--wp--custom--')) {
        const path = token.wpVariable.replace('--wp--custom--', '').split('--');
        let current: Record<string, unknown> = themeJson.settings.custom;
        
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) {
            current[path[i]] = {};
          }
          current = current[path[i]] as Record<string, unknown>;
        }
        
        const value = typeof token.value === 'number' ? `${token.value}px` : token.value;
        current[path[path.length - 1]] = value;
      }
    }
  }
  
  return JSON.stringify(themeJson, null, 2);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = (searchParams.get('format') as ExportFormat) || 'css';
    const mode = (searchParams.get('mode') as 'Light' | 'Dark') || 'Light';
    const layersParam = searchParams.get('layers');
    
    // Determine which layers to include
    const layers = layersParam 
      ? layersParam.split(',') as TokenLayer[]
      : [TokenLayer.Primitives, TokenLayer.Semantic, TokenLayer.Components, TokenLayer.Greenshift];
    
    // Collect tokens from requested layers
    let tokens: ParsedToken[] = [];
    
    if (layers.includes(TokenLayer.Primitives)) {
      tokens.push(...parsePrimitives());
    }
    if (layers.includes(TokenLayer.Semantic)) {
      tokens.push(...parseSemantic(mode));
    }
    if (layers.includes(TokenLayer.Components)) {
      tokens.push(...parseComponents());
    }
    if (layers.includes(TokenLayer.Greenshift)) {
      tokens.push(...parseGreenshift(mode));
    }
    
    // Generate output based on format
    let content: string;
    let extension: string;
    let mimeType: string;
    
    switch (format) {
      case 'css':
        content = generateCSS(tokens);
        extension = 'css';
        mimeType = 'text/css';
        break;
      case 'json':
        content = generateJSON(tokens);
        extension = 'json';
        mimeType = 'application/json';
        break;
      case 'figma':
        content = generateFigmaJSON(tokens);
        extension = 'json';
        mimeType = 'application/json';
        break;
      case 'wordpress':
        content = generateWordPressJSON(tokens);
        extension = 'json';
        mimeType = 'application/json';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid format. Use: css, json, figma, or wordpress' },
          { status: 400 }
        );
    }
    
    const filename = `altitude-tokens-${mode.toLowerCase()}.${extension}`;
    
    // Return as downloadable file
    return new NextResponse(content, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting tokens:', error);
    return NextResponse.json(
      { error: 'Failed to export tokens' },
      { status: 500 }
    );
  }
}
