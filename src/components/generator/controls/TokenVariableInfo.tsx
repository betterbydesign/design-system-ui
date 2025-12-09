'use client';

import React from 'react';

interface TokenVariableInfoProps {
  /** Label to display before variables (e.g., "CSS Variable:", "Affects:", "CSS:") */
  label?: string;
  /** Array of CSS variable names to display */
  variables: string[];
  /** Display format */
  variant?: 'single' | 'list';
}

/**
 * TokenVariableInfo
 * 
 * Displays CSS variable information for token controls.
 * Critical component for ensuring all controls show their associated CSS variables.
 */
export function TokenVariableInfo({
  label = 'CSS Variable:',
  variables,
  variant = 'single',
}: TokenVariableInfoProps) {
  if (variables.length === 0) return null;
  
  if (variant === 'single') {
    return (
      <div className="text-xs bg-gray-800 rounded-lg p-2">
        <span className="text-gray-400">{label}</span>
        <code className="text-emerald-400 ml-1 font-mono">{variables[0]}</code>
      </div>
    );
  }
  
  // List variant
  return (
    <div className="text-xs bg-gray-800 rounded-lg p-2 space-y-1">
      <span className="text-gray-400">{label}</span>
      <div className="flex flex-col gap-0.5 mt-1">
        {variables.map((variable) => (
          <code key={variable} className="text-emerald-400 font-mono pl-2">
            {variable}
          </code>
        ))}
      </div>
    </div>
  );
}

/**
 * Inline variant for use in sliders and compact displays
 */
export function TokenVariableInfoInline({
  variable,
}: {
  variable: string;
}) {
  return (
    <div className="text-xs text-gray-500">
      <span>CSS: </span>
      <code className="text-emerald-400 font-mono">{variable}</code>
    </div>
  );
}
