/**
 * GET /api/tokens/typography
 * 
 * Returns typography tokens (type scales)
 * Query params:
 *   - scale: 'majorSecond' | 'majorThird' (default: 'majorSecond')
 *   - mode: 'Mobile' | 'Desktop' - filter by responsive mode
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseTypography,
  getTokenStats,
  TokenApiResponse,
  TokenLayer,
  TokenType,
} from '@/lib/tokens';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const scale = (searchParams.get('scale') as 'majorSecond' | 'majorThird') || 'majorSecond';
    const modeFilter = searchParams.get('mode') as 'Mobile' | 'Desktop' | null;
    
    let tokens = parseTypography(scale);
    
    // Filter by mode if specified
    if (modeFilter) {
      tokens = tokens.filter(t => t.mode === modeFilter);
    }
    
    const stats = getTokenStats(tokens);
    const types = [...new Set(tokens.map(t => t.type))] as TokenType[];
    
    const scaleName = scale === 'majorSecond' ? 'Major Second (1.125)' : 'Major Third (1.25)';
    
    const response: TokenApiResponse = {
      collection: `Typography - ${scaleName}`,
      tokens,
      metadata: {
        count: tokens.length,
        types,
        modes: ['Mobile', 'Desktop'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Typography,
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching typography tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch typography tokens' },
      { status: 500 }
    );
  }
}
