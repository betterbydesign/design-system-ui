/**
 * GET /api/tokens
 * 
 * Returns all tokens from all collections with metadata.
 */

import { NextResponse } from 'next/server';
import {
  parseAllTokens,
  resolveAllTokens,
  getTokenStats,
  TokenApiResponse,
  TokenLayer,
} from '@/lib/tokens';

export async function GET() {
  try {
    const allTokens = parseAllTokens();
    const resolvedTokens = resolveAllTokens(allTokens);
    const stats = getTokenStats(allTokens);
    
    const response: TokenApiResponse = {
      collection: 'all',
      tokens: resolvedTokens,
      metadata: {
        count: stats.total,
        types: ['color', 'number', 'string'],
        modes: ['Default', 'Light', 'Dark', 'Mobile', 'Desktop'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Primitives, // Placeholder
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
