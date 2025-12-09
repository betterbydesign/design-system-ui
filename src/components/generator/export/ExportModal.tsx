'use client';

import React, { useState } from 'react';
import { X, FileJson, Code, FileCode, Copy, Check, Download } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { generateCSSExport, ThemeColors } from '@/lib/generator/cssInjector';
import { getColor } from '@/lib/generator/colorPalettes';

type ExportFormat = 'figma' | 'css' | 'json';

interface ExportModalProps {
  onClose: () => void;
}

/**
 * ExportModal
 * 
 * Modal dialog for exporting the current theme in various formats:
 * - Figma Variables JSON
 * - CSS Variables
 * - Design Tokens JSON
 */
export function ExportModal({ onClose }: ExportModalProps) {
  const { state, brandHex, secondaryHex } = useThemeGenerator();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);
  
  // Generate export content based on format
  const getExportContent = (): string => {
    const colors: ThemeColors = {
      brandFamily: state.brandColor.family,
      brandShade: state.brandColor.shade,
      secondaryFamily: state.secondaryColor.family,
      secondaryShade: state.secondaryColor.shade,
      neutralFamily: state.neutralScale,
    };
    
    switch (selectedFormat) {
      case 'css':
        return generateCSSExport({
          colors,
          radiusValues: state.radiusValues,
          typeScale: state.typeScale,
          baseFontSize: state.baseFontSize,
        });
      
      case 'figma':
        return generateFigmaJSON(state, brandHex, secondaryHex);
      
      case 'json':
        return generateDesignTokensJSON(state, brandHex, secondaryHex);
      
      default:
        return '';
    }
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleDownload = () => {
    const content = getExportContent();
    const extensions: Record<ExportFormat, string> = {
      css: 'css',
      figma: 'json',
      json: 'json',
    };
    const filename = `altitude-theme.${extensions[selectedFormat]}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Export Theme</h2>
          <button 
            className="p-1 text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Format Selection */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-2">
            <FormatButton
              format="css"
              icon={<Code className="w-4 h-4" />}
              label="CSS Variables"
              isActive={selectedFormat === 'css'}
              onClick={() => setSelectedFormat('css')}
            />
            <FormatButton
              format="figma"
              icon={<FileJson className="w-4 h-4" />}
              label="Figma JSON"
              isActive={selectedFormat === 'figma'}
              onClick={() => setSelectedFormat('figma')}
            />
            <FormatButton
              format="json"
              icon={<FileCode className="w-4 h-4" />}
              label="Design Tokens"
              isActive={selectedFormat === 'json'}
              onClick={() => setSelectedFormat('json')}
            />
          </div>
        </div>
        
        {/* Code Preview */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="h-full bg-gray-950 rounded-lg overflow-auto">
            <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap">
              {getExportContent()}
            </pre>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-800">
          <button 
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </>
            )}
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

interface FormatButtonProps {
  format: ExportFormat;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FormatButton({ icon, label, isActive, onClick }: FormatButtonProps) {
  return (
    <button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
        ${isActive 
          ? 'bg-gray-700 text-white' 
          : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
        }
      `}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

// =============================================================================
// EXPORT GENERATORS
// =============================================================================

function generateFigmaJSON(state: any, brandHex: string, secondaryHex: string): string {
  const figmaVariables = {
    version: "1.0",
    collections: [
      {
        name: "Altitude Theme",
        modes: [
          {
            name: "Light",
            variables: {
              "color/brand/default": { value: brandHex, type: "color" },
              "color/brand/hover": { value: adjustBrightness(brandHex, -10), type: "color" },
              "color/secondary/default": { value: secondaryHex, type: "color" },
              "color/background/default": { value: getColor(state.neutralScale, 50), type: "color" },
              "color/background/alt": { value: getColor(state.neutralScale, 100), type: "color" },
              "color/foreground": { value: getColor(state.neutralScale, 900), type: "color" },
              "color/muted": { value: getColor(state.neutralScale, 500), type: "color" },
              "color/border": { value: getColor(state.neutralScale, 200), type: "color" },
              "radius/button": { value: state.radiusValues.button, type: "number" },
              "radius/card": { value: state.radiusValues.card, type: "number" },
              "radius/input": { value: state.radiusValues.input, type: "number" },
              "typography/base-size": { value: state.baseFontSize, type: "number" },
              "typography/scale": { value: state.typeScale === 'ms' ? 1.125 : 1.25, type: "number" },
            }
          }
        ]
      }
    ]
  };
  
  return JSON.stringify(figmaVariables, null, 2);
}

function generateDesignTokensJSON(state: any, brandHex: string, secondaryHex: string): string {
  const tokens = {
    "$schema": "https://design-tokens.github.io/community-group/format/",
    "color": {
      "brand": {
        "default": { "$value": brandHex, "$type": "color" },
        "hover": { "$value": adjustBrightness(brandHex, -10), "$type": "color" },
      },
      "secondary": {
        "default": { "$value": secondaryHex, "$type": "color" },
      },
      "background": {
        "default": { "$value": getColor(state.neutralScale, 50), "$type": "color" },
        "alt": { "$value": getColor(state.neutralScale, 100), "$type": "color" },
      },
      "foreground": { "$value": getColor(state.neutralScale, 900), "$type": "color" },
      "muted": { "$value": getColor(state.neutralScale, 500), "$type": "color" },
      "border": { "$value": getColor(state.neutralScale, 200), "$type": "color" },
    },
    "radius": {
      "button": { "$value": `${state.radiusValues.button}px`, "$type": "dimension" },
      "card": { "$value": `${state.radiusValues.card}px`, "$type": "dimension" },
      "input": { "$value": `${state.radiusValues.input}px`, "$type": "dimension" },
    },
    "typography": {
      "base-size": { "$value": `${state.baseFontSize}px`, "$type": "dimension" },
      "scale": { "$value": state.typeScale === 'ms' ? 1.125 : 1.25, "$type": "number" },
    }
  };
  
  return JSON.stringify(tokens, null, 2);
}

/** Simple brightness adjustment for hover states */
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
