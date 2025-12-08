/**
 * GET /api/tokens/primitives
 * 
 * Returns all primitive tokens (raw values: colors, spacing, radius, etc.)
 */

import { NextResponse } from 'next/server';
import {
  parsePrimitives,
  getTokenStats,
  TokenApiResponse,
  TokenLayer,
  TokenType,
} from '@/lib/tokens';

export async function GET() {
  try {
    const tokens = parsePrimitives();
    const stats = getTokenStats(tokens);
    
    // Get unique types
    const types = [...new Set(tokens.map(t => t.type))] as TokenType[];
    
    const response: TokenApiResponse = {
      collection: 'Primitives',
      mode: 'Default',
      tokens,
      metadata: {
        count: tokens.length,
        types,
        modes: ['Default'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Primitives,
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching primitive tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch primitive tokens' },
      { status: 500 }
    );
  }
}
