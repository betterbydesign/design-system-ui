'use client';

import React from 'react';

export interface AffectedToken {
  id: string;
  name: string;
}

interface AffectedTokensListProps {
  /** List of tokens that use the selected token */
  tokens: AffectedToken[];
  /** Callback when a token is clicked */
  onTokenClick?: (token: AffectedToken) => void;
}

/**
 * AffectedTokensList
 * 
 * Displays a list of component/semantic tokens that reference
 * the currently selected token.
 */
export function AffectedTokensList({
  tokens,
  onTokenClick,
}: AffectedTokensListProps) {
  if (tokens.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
          Also Uses This Token
        </div>
        <div className="text-sm text-gray-500 bg-gray-850 rounded-lg p-3">
          No other tokens reference this value
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
        Also Uses This Token
      </div>
      <div className="space-y-2">
        {tokens.map((token) => (
          <button
            key={token.id}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-850 rounded-lg text-sm text-gray-300 hover:bg-gray-700 cursor-pointer transition-colors text-left"
            onClick={() => onTokenClick?.(token)}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="truncate">{token.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
