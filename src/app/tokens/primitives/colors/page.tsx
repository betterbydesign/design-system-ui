'use client';

import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { ChevronRight, Copy, Check, Filter, Grid, List, Download, Search } from 'lucide-react';
import { ColorPaletteGrid, ColorPaletteData } from '@/components/tokens/ColorPaletteGrid';
import { TokenLayer } from '@/lib/types';

// Complete color palette data from 01-Primitives.json
const COLOR_PALETTES: ColorPaletteData[] = [
  // Neutrals
  {
    name: 'Slate',
    displayName: 'Slate',
    category: 'neutral',
    shades: [
      { shade: '50', hex: '#f8fafc', cssVariable: '--primitives-color-slate-50' },
      { shade: '100', hex: '#f1f5f9', cssVariable: '--primitives-color-slate-100' },
      { shade: '200', hex: '#e2e8f0', cssVariable: '--primitives-color-slate-200' },
      { shade: '300', hex: '#cbd5e1', cssVariable: '--primitives-color-slate-300' },
      { shade: '400', hex: '#94a3b8', cssVariable: '--primitives-color-slate-400' },
      { shade: '500', hex: '#64748b', cssVariable: '--primitives-color-slate-500' },
      { shade: '600', hex: '#475569', cssVariable: '--primitives-color-slate-600' },
      { shade: '700', hex: '#334155', cssVariable: '--primitives-color-slate-700' },
      { shade: '800', hex: '#1e293b', cssVariable: '--primitives-color-slate-800' },
      { shade: '900', hex: '#0f172a', cssVariable: '--primitives-color-slate-900' },
      { shade: '950', hex: '#020617', cssVariable: '--primitives-color-slate-950' },
    ],
  },
  {
    name: 'Gray',
    displayName: 'Gray',
    category: 'neutral',
    shades: [
      { shade: '50', hex: '#f9fafb', cssVariable: '--primitives-color-gray-50' },
      { shade: '100', hex: '#f3f4f6', cssVariable: '--primitives-color-gray-100' },
      { shade: '200', hex: '#e5e7eb', cssVariable: '--primitives-color-gray-200' },
      { shade: '300', hex: '#d1d5db', cssVariable: '--primitives-color-gray-300' },
      { shade: '400', hex: '#9ca3af', cssVariable: '--primitives-color-gray-400' },
      { shade: '500', hex: '#6b7280', cssVariable: '--primitives-color-gray-500' },
      { shade: '600', hex: '#4b5563', cssVariable: '--primitives-color-gray-600' },
      { shade: '700', hex: '#374151', cssVariable: '--primitives-color-gray-700' },
      { shade: '800', hex: '#1f2937', cssVariable: '--primitives-color-gray-800' },
      { shade: '900', hex: '#111827', cssVariable: '--primitives-color-gray-900' },
      { shade: '950', hex: '#030712', cssVariable: '--primitives-color-gray-950' },
    ],
  },
  {
    name: 'Zinc',
    displayName: 'Zinc',
    category: 'neutral',
    shades: [
      { shade: '50', hex: '#fafafa', cssVariable: '--primitives-color-zinc-50' },
      { shade: '100', hex: '#f4f4f5', cssVariable: '--primitives-color-zinc-100' },
      { shade: '200', hex: '#e4e4e7', cssVariable: '--primitives-color-zinc-200' },
      { shade: '300', hex: '#d4d4d8', cssVariable: '--primitives-color-zinc-300' },
      { shade: '400', hex: '#a1a1aa', cssVariable: '--primitives-color-zinc-400' },
      { shade: '500', hex: '#71717a', cssVariable: '--primitives-color-zinc-500' },
      { shade: '600', hex: '#52525b', cssVariable: '--primitives-color-zinc-600' },
      { shade: '700', hex: '#3f3f46', cssVariable: '--primitives-color-zinc-700' },
      { shade: '800', hex: '#27272a', cssVariable: '--primitives-color-zinc-800' },
      { shade: '900', hex: '#18181b', cssVariable: '--primitives-color-zinc-900' },
      { shade: '950', hex: '#09090b', cssVariable: '--primitives-color-zinc-950' },
    ],
  },
  {
    name: 'Neutral',
    displayName: 'Neutral',
    category: 'neutral',
    shades: [
      { shade: '50', hex: '#fafafa', cssVariable: '--primitives-color-neutral-50' },
      { shade: '100', hex: '#f5f5f5', cssVariable: '--primitives-color-neutral-100' },
      { shade: '200', hex: '#e5e5e5', cssVariable: '--primitives-color-neutral-200' },
      { shade: '300', hex: '#d4d4d4', cssVariable: '--primitives-color-neutral-300' },
      { shade: '400', hex: '#a3a3a3', cssVariable: '--primitives-color-neutral-400' },
      { shade: '500', hex: '#737373', cssVariable: '--primitives-color-neutral-500' },
      { shade: '600', hex: '#525252', cssVariable: '--primitives-color-neutral-600' },
      { shade: '700', hex: '#404040', cssVariable: '--primitives-color-neutral-700' },
      { shade: '800', hex: '#262626', cssVariable: '--primitives-color-neutral-800' },
      { shade: '900', hex: '#171717', cssVariable: '--primitives-color-neutral-900' },
      { shade: '950', hex: '#0a0a0a', cssVariable: '--primitives-color-neutral-950' },
    ],
  },
  {
    name: 'Stone',
    displayName: 'Stone',
    category: 'neutral',
    shades: [
      { shade: '50', hex: '#fafaf9', cssVariable: '--primitives-color-stone-50' },
      { shade: '100', hex: '#f5f5f4', cssVariable: '--primitives-color-stone-100' },
      { shade: '200', hex: '#e7e5e4', cssVariable: '--primitives-color-stone-200' },
      { shade: '300', hex: '#d6d3d1', cssVariable: '--primitives-color-stone-300' },
      { shade: '400', hex: '#a8a29e', cssVariable: '--primitives-color-stone-400' },
      { shade: '500', hex: '#78716c', cssVariable: '--primitives-color-stone-500' },
      { shade: '600', hex: '#57534e', cssVariable: '--primitives-color-stone-600' },
      { shade: '700', hex: '#44403c', cssVariable: '--primitives-color-stone-700' },
      { shade: '800', hex: '#292524', cssVariable: '--primitives-color-stone-800' },
      { shade: '900', hex: '#1c1917', cssVariable: '--primitives-color-stone-900' },
      { shade: '950', hex: '#0c0a09', cssVariable: '--primitives-color-stone-950' },
    ],
  },
  // Warm colors
  {
    name: 'Red',
    displayName: 'Red',
    category: 'warm',
    shades: [
      { shade: '50', hex: '#fef2f2', cssVariable: '--primitives-color-red-50' },
      { shade: '100', hex: '#fee2e2', cssVariable: '--primitives-color-red-100' },
      { shade: '200', hex: '#fecaca', cssVariable: '--primitives-color-red-200' },
      { shade: '300', hex: '#fca5a5', cssVariable: '--primitives-color-red-300' },
      { shade: '400', hex: '#f87171', cssVariable: '--primitives-color-red-400' },
      { shade: '500', hex: '#ef4444', cssVariable: '--primitives-color-red-500' },
      { shade: '600', hex: '#dc2626', cssVariable: '--primitives-color-red-600' },
      { shade: '700', hex: '#b91c1c', cssVariable: '--primitives-color-red-700' },
      { shade: '800', hex: '#991b1b', cssVariable: '--primitives-color-red-800' },
      { shade: '900', hex: '#7f1d1d', cssVariable: '--primitives-color-red-900' },
      { shade: '950', hex: '#450a0a', cssVariable: '--primitives-color-red-950' },
    ],
  },
  {
    name: 'Orange',
    displayName: 'Orange',
    category: 'warm',
    shades: [
      { shade: '50', hex: '#fff7ed', cssVariable: '--primitives-color-orange-50' },
      { shade: '100', hex: '#ffedd5', cssVariable: '--primitives-color-orange-100' },
      { shade: '200', hex: '#fed7aa', cssVariable: '--primitives-color-orange-200' },
      { shade: '300', hex: '#fdba74', cssVariable: '--primitives-color-orange-300' },
      { shade: '400', hex: '#fb923c', cssVariable: '--primitives-color-orange-400' },
      { shade: '500', hex: '#f97316', cssVariable: '--primitives-color-orange-500' },
      { shade: '600', hex: '#ea580c', cssVariable: '--primitives-color-orange-600' },
      { shade: '700', hex: '#c2410c', cssVariable: '--primitives-color-orange-700' },
      { shade: '800', hex: '#9a3412', cssVariable: '--primitives-color-orange-800' },
      { shade: '900', hex: '#7c2d12', cssVariable: '--primitives-color-orange-900' },
      { shade: '950', hex: '#431407', cssVariable: '--primitives-color-orange-950' },
    ],
  },
  {
    name: 'Amber',
    displayName: 'Amber',
    category: 'warm',
    shades: [
      { shade: '50', hex: '#fffbeb', cssVariable: '--primitives-color-amber-50' },
      { shade: '100', hex: '#fef3c7', cssVariable: '--primitives-color-amber-100' },
      { shade: '200', hex: '#fde68a', cssVariable: '--primitives-color-amber-200' },
      { shade: '300', hex: '#fcd34d', cssVariable: '--primitives-color-amber-300' },
      { shade: '400', hex: '#fbbf24', cssVariable: '--primitives-color-amber-400' },
      { shade: '500', hex: '#f59e0b', cssVariable: '--primitives-color-amber-500' },
      { shade: '600', hex: '#d97706', cssVariable: '--primitives-color-amber-600' },
      { shade: '700', hex: '#b45309', cssVariable: '--primitives-color-amber-700' },
      { shade: '800', hex: '#92400e', cssVariable: '--primitives-color-amber-800' },
      { shade: '900', hex: '#78350f', cssVariable: '--primitives-color-amber-900' },
      { shade: '950', hex: '#451a03', cssVariable: '--primitives-color-amber-950' },
    ],
  },
  {
    name: 'Yellow',
    displayName: 'Yellow',
    category: 'warm',
    shades: [
      { shade: '50', hex: '#fefce8', cssVariable: '--primitives-color-yellow-50' },
      { shade: '100', hex: '#fef9c3', cssVariable: '--primitives-color-yellow-100' },
      { shade: '200', hex: '#fef08a', cssVariable: '--primitives-color-yellow-200' },
      { shade: '300', hex: '#fde047', cssVariable: '--primitives-color-yellow-300' },
      { shade: '400', hex: '#facc15', cssVariable: '--primitives-color-yellow-400' },
      { shade: '500', hex: '#eab308', cssVariable: '--primitives-color-yellow-500' },
      { shade: '600', hex: '#ca8a04', cssVariable: '--primitives-color-yellow-600' },
      { shade: '700', hex: '#a16207', cssVariable: '--primitives-color-yellow-700' },
      { shade: '800', hex: '#854d0e', cssVariable: '--primitives-color-yellow-800' },
      { shade: '900', hex: '#713f12', cssVariable: '--primitives-color-yellow-900' },
      { shade: '950', hex: '#422006', cssVariable: '--primitives-color-yellow-950' },
    ],
  },
  {
    name: 'Lime',
    displayName: 'Lime',
    category: 'warm',
    shades: [
      { shade: '50', hex: '#f7fee7', cssVariable: '--primitives-color-lime-50' },
      { shade: '100', hex: '#ecfccb', cssVariable: '--primitives-color-lime-100' },
      { shade: '200', hex: '#d9f99d', cssVariable: '--primitives-color-lime-200' },
      { shade: '300', hex: '#bef264', cssVariable: '--primitives-color-lime-300' },
      { shade: '400', hex: '#a3e635', cssVariable: '--primitives-color-lime-400' },
      { shade: '500', hex: '#84cc16', cssVariable: '--primitives-color-lime-500' },
      { shade: '600', hex: '#65a30d', cssVariable: '--primitives-color-lime-600' },
      { shade: '700', hex: '#4d7c0f', cssVariable: '--primitives-color-lime-700' },
      { shade: '800', hex: '#3f6212', cssVariable: '--primitives-color-lime-800' },
      { shade: '900', hex: '#365314', cssVariable: '--primitives-color-lime-900' },
      { shade: '950', hex: '#1a2e05', cssVariable: '--primitives-color-lime-950' },
    ],
  },
  // Cool colors
  {
    name: 'Green',
    displayName: 'Green',
    category: 'cool',
    shades: [
      { shade: '50', hex: '#f0fdf4', cssVariable: '--primitives-color-green-50' },
      { shade: '100', hex: '#dcfce7', cssVariable: '--primitives-color-green-100' },
      { shade: '200', hex: '#bbf7d0', cssVariable: '--primitives-color-green-200' },
      { shade: '300', hex: '#86efac', cssVariable: '--primitives-color-green-300' },
      { shade: '400', hex: '#4ade80', cssVariable: '--primitives-color-green-400' },
      { shade: '500', hex: '#22c55e', cssVariable: '--primitives-color-green-500' },
      { shade: '600', hex: '#16a34a', cssVariable: '--primitives-color-green-600' },
      { shade: '700', hex: '#15803d', cssVariable: '--primitives-color-green-700' },
      { shade: '800', hex: '#166534', cssVariable: '--primitives-color-green-800' },
      { shade: '900', hex: '#14532d', cssVariable: '--primitives-color-green-900' },
      { shade: '950', hex: '#052e16', cssVariable: '--primitives-color-green-950' },
    ],
  },
  {
    name: 'Emerald',
    displayName: 'Emerald',
    category: 'cool',
    shades: [
      { shade: '50', hex: '#ecfdf5', cssVariable: '--primitives-color-emerald-50' },
      { shade: '100', hex: '#d1fae5', cssVariable: '--primitives-color-emerald-100' },
      { shade: '200', hex: '#a7f3d0', cssVariable: '--primitives-color-emerald-200' },
      { shade: '300', hex: '#6ee7b7', cssVariable: '--primitives-color-emerald-300' },
      { shade: '400', hex: '#34d399', cssVariable: '--primitives-color-emerald-400' },
      { shade: '500', hex: '#10b981', cssVariable: '--primitives-color-emerald-500' },
      { shade: '600', hex: '#059669', cssVariable: '--primitives-color-emerald-600' },
      { shade: '700', hex: '#047857', cssVariable: '--primitives-color-emerald-700' },
      { shade: '800', hex: '#065f46', cssVariable: '--primitives-color-emerald-800' },
      { shade: '900', hex: '#064e3b', cssVariable: '--primitives-color-emerald-900' },
      { shade: '950', hex: '#022c22', cssVariable: '--primitives-color-emerald-950' },
    ],
  },
  {
    name: 'Teal',
    displayName: 'Teal',
    category: 'cool',
    shades: [
      { shade: '50', hex: '#f0fdfa', cssVariable: '--primitives-color-teal-50' },
      { shade: '100', hex: '#ccfbf1', cssVariable: '--primitives-color-teal-100' },
      { shade: '200', hex: '#99f6e4', cssVariable: '--primitives-color-teal-200' },
      { shade: '300', hex: '#5eead4', cssVariable: '--primitives-color-teal-300' },
      { shade: '400', hex: '#2dd4bf', cssVariable: '--primitives-color-teal-400' },
      { shade: '500', hex: '#14b8a6', cssVariable: '--primitives-color-teal-500' },
      { shade: '600', hex: '#0d9488', cssVariable: '--primitives-color-teal-600' },
      { shade: '700', hex: '#0f766e', cssVariable: '--primitives-color-teal-700' },
      { shade: '800', hex: '#115e59', cssVariable: '--primitives-color-teal-800' },
      { shade: '900', hex: '#134e4a', cssVariable: '--primitives-color-teal-900' },
      { shade: '950', hex: '#042f2e', cssVariable: '--primitives-color-teal-950' },
    ],
  },
  {
    name: 'Cyan',
    displayName: 'Cyan',
    category: 'cool',
    shades: [
      { shade: '50', hex: '#ecfeff', cssVariable: '--primitives-color-cyan-50' },
      { shade: '100', hex: '#cffafe', cssVariable: '--primitives-color-cyan-100' },
      { shade: '200', hex: '#a5f3fc', cssVariable: '--primitives-color-cyan-200' },
      { shade: '300', hex: '#67e8f9', cssVariable: '--primitives-color-cyan-300' },
      { shade: '400', hex: '#22d3ee', cssVariable: '--primitives-color-cyan-400' },
      { shade: '500', hex: '#06b6d4', cssVariable: '--primitives-color-cyan-500' },
      { shade: '600', hex: '#0891b2', cssVariable: '--primitives-color-cyan-600' },
      { shade: '700', hex: '#0e7490', cssVariable: '--primitives-color-cyan-700' },
      { shade: '800', hex: '#155e75', cssVariable: '--primitives-color-cyan-800' },
      { shade: '900', hex: '#164e63', cssVariable: '--primitives-color-cyan-900' },
      { shade: '950', hex: '#083344', cssVariable: '--primitives-color-cyan-950' },
    ],
  },
  {
    name: 'Sky',
    displayName: 'Sky',
    category: 'cool',
    shades: [
      { shade: '50', hex: '#f0f9ff', cssVariable: '--primitives-color-sky-50' },
      { shade: '100', hex: '#e0f2fe', cssVariable: '--primitives-color-sky-100' },
      { shade: '200', hex: '#bae6fd', cssVariable: '--primitives-color-sky-200' },
      { shade: '300', hex: '#7dd3fc', cssVariable: '--primitives-color-sky-300' },
      { shade: '400', hex: '#38bdf8', cssVariable: '--primitives-color-sky-400' },
      { shade: '500', hex: '#0ea5e9', cssVariable: '--primitives-color-sky-500' },
      { shade: '600', hex: '#0284c7', cssVariable: '--primitives-color-sky-600' },
      { shade: '700', hex: '#0369a1', cssVariable: '--primitives-color-sky-700' },
      { shade: '800', hex: '#075985', cssVariable: '--primitives-color-sky-800' },
      { shade: '900', hex: '#0c4a6e', cssVariable: '--primitives-color-sky-900' },
      { shade: '950', hex: '#082f49', cssVariable: '--primitives-color-sky-950' },
    ],
  },
  // Blue family
  {
    name: 'Blue',
    displayName: 'Blue',
    category: 'blue',
    shades: [
      { shade: '50', hex: '#eff6ff', cssVariable: '--primitives-color-blue-50' },
      { shade: '100', hex: '#dbeafe', cssVariable: '--primitives-color-blue-100' },
      { shade: '200', hex: '#bfdbfe', cssVariable: '--primitives-color-blue-200' },
      { shade: '300', hex: '#93c5fd', cssVariable: '--primitives-color-blue-300' },
      { shade: '400', hex: '#60a5fa', cssVariable: '--primitives-color-blue-400' },
      { shade: '500', hex: '#3b82f6', cssVariable: '--primitives-color-blue-500' },
      { shade: '600', hex: '#2563eb', cssVariable: '--primitives-color-blue-600' },
      { shade: '700', hex: '#1d4ed8', cssVariable: '--primitives-color-blue-700' },
      { shade: '800', hex: '#1e40af', cssVariable: '--primitives-color-blue-800' },
      { shade: '900', hex: '#1e3a8a', cssVariable: '--primitives-color-blue-900' },
      { shade: '950', hex: '#172554', cssVariable: '--primitives-color-blue-950' },
    ],
  },
  {
    name: 'Indigo',
    displayName: 'Indigo',
    category: 'blue',
    shades: [
      { shade: '50', hex: '#eef2ff', cssVariable: '--primitives-color-indigo-50' },
      { shade: '100', hex: '#e0e7ff', cssVariable: '--primitives-color-indigo-100' },
      { shade: '200', hex: '#c7d2fe', cssVariable: '--primitives-color-indigo-200' },
      { shade: '300', hex: '#a5b4fc', cssVariable: '--primitives-color-indigo-300' },
      { shade: '400', hex: '#818cf8', cssVariable: '--primitives-color-indigo-400' },
      { shade: '500', hex: '#6366f1', cssVariable: '--primitives-color-indigo-500' },
      { shade: '600', hex: '#4f46e5', cssVariable: '--primitives-color-indigo-600' },
      { shade: '700', hex: '#4338ca', cssVariable: '--primitives-color-indigo-700' },
      { shade: '800', hex: '#3730a3', cssVariable: '--primitives-color-indigo-800' },
      { shade: '900', hex: '#312e81', cssVariable: '--primitives-color-indigo-900' },
      { shade: '950', hex: '#1e1b4b', cssVariable: '--primitives-color-indigo-950' },
    ],
  },
  {
    name: 'Violet',
    displayName: 'Violet',
    category: 'blue',
    shades: [
      { shade: '50', hex: '#f5f3ff', cssVariable: '--primitives-color-violet-50' },
      { shade: '100', hex: '#ede9fe', cssVariable: '--primitives-color-violet-100' },
      { shade: '200', hex: '#ddd6fe', cssVariable: '--primitives-color-violet-200' },
      { shade: '300', hex: '#c4b5fd', cssVariable: '--primitives-color-violet-300' },
      { shade: '400', hex: '#a78bfa', cssVariable: '--primitives-color-violet-400' },
      { shade: '500', hex: '#8b5cf6', cssVariable: '--primitives-color-violet-500' },
      { shade: '600', hex: '#7c3aed', cssVariable: '--primitives-color-violet-600' },
      { shade: '700', hex: '#6d28d9', cssVariable: '--primitives-color-violet-700' },
      { shade: '800', hex: '#5b21b6', cssVariable: '--primitives-color-violet-800' },
      { shade: '900', hex: '#4c1d95', cssVariable: '--primitives-color-violet-900' },
      { shade: '950', hex: '#2e1065', cssVariable: '--primitives-color-violet-950' },
    ],
  },
  {
    name: 'Purple',
    displayName: 'Purple',
    category: 'blue',
    shades: [
      { shade: '50', hex: '#faf5ff', cssVariable: '--primitives-color-purple-50' },
      { shade: '100', hex: '#f3e8ff', cssVariable: '--primitives-color-purple-100' },
      { shade: '200', hex: '#e9d5ff', cssVariable: '--primitives-color-purple-200' },
      { shade: '300', hex: '#d8b4fe', cssVariable: '--primitives-color-purple-300' },
      { shade: '400', hex: '#c084fc', cssVariable: '--primitives-color-purple-400' },
      { shade: '500', hex: '#a855f7', cssVariable: '--primitives-color-purple-500' },
      { shade: '600', hex: '#9333ea', cssVariable: '--primitives-color-purple-600' },
      { shade: '700', hex: '#7e22ce', cssVariable: '--primitives-color-purple-700' },
      { shade: '800', hex: '#6b21a8', cssVariable: '--primitives-color-purple-800' },
      { shade: '900', hex: '#581c87', cssVariable: '--primitives-color-purple-900' },
      { shade: '950', hex: '#3b0764', cssVariable: '--primitives-color-purple-950' },
    ],
  },
  // Pink family
  {
    name: 'Fuchsia',
    displayName: 'Fuchsia',
    category: 'pink',
    shades: [
      { shade: '50', hex: '#fdf4ff', cssVariable: '--primitives-color-fuchsia-50' },
      { shade: '100', hex: '#fae8ff', cssVariable: '--primitives-color-fuchsia-100' },
      { shade: '200', hex: '#f5d0fe', cssVariable: '--primitives-color-fuchsia-200' },
      { shade: '300', hex: '#f0abfc', cssVariable: '--primitives-color-fuchsia-300' },
      { shade: '400', hex: '#e879f9', cssVariable: '--primitives-color-fuchsia-400' },
      { shade: '500', hex: '#d946ef', cssVariable: '--primitives-color-fuchsia-500' },
      { shade: '600', hex: '#c026d3', cssVariable: '--primitives-color-fuchsia-600' },
      { shade: '700', hex: '#a21caf', cssVariable: '--primitives-color-fuchsia-700' },
      { shade: '800', hex: '#86198f', cssVariable: '--primitives-color-fuchsia-800' },
      { shade: '900', hex: '#701a75', cssVariable: '--primitives-color-fuchsia-900' },
      { shade: '950', hex: '#4a044e', cssVariable: '--primitives-color-fuchsia-950' },
    ],
  },
  {
    name: 'Pink',
    displayName: 'Pink',
    category: 'pink',
    shades: [
      { shade: '50', hex: '#fdf2f8', cssVariable: '--primitives-color-pink-50' },
      { shade: '100', hex: '#fce7f3', cssVariable: '--primitives-color-pink-100' },
      { shade: '200', hex: '#fbcfe8', cssVariable: '--primitives-color-pink-200' },
      { shade: '300', hex: '#f9a8d4', cssVariable: '--primitives-color-pink-300' },
      { shade: '400', hex: '#f472b6', cssVariable: '--primitives-color-pink-400' },
      { shade: '500', hex: '#ec4899', cssVariable: '--primitives-color-pink-500' },
      { shade: '600', hex: '#db2777', cssVariable: '--primitives-color-pink-600' },
      { shade: '700', hex: '#be185d', cssVariable: '--primitives-color-pink-700' },
      { shade: '800', hex: '#9d174d', cssVariable: '--primitives-color-pink-800' },
      { shade: '900', hex: '#831843', cssVariable: '--primitives-color-pink-900' },
      { shade: '950', hex: '#500724', cssVariable: '--primitives-color-pink-950' },
    ],
  },
  {
    name: 'Rose',
    displayName: 'Rose',
    category: 'pink',
    shades: [
      { shade: '50', hex: '#fff1f2', cssVariable: '--primitives-color-rose-50' },
      { shade: '100', hex: '#ffe4e6', cssVariable: '--primitives-color-rose-100' },
      { shade: '200', hex: '#fecdd3', cssVariable: '--primitives-color-rose-200' },
      { shade: '300', hex: '#fda4af', cssVariable: '--primitives-color-rose-300' },
      { shade: '400', hex: '#fb7185', cssVariable: '--primitives-color-rose-400' },
      { shade: '500', hex: '#f43f5e', cssVariable: '--primitives-color-rose-500' },
      { shade: '600', hex: '#e11d48', cssVariable: '--primitives-color-rose-600' },
      { shade: '700', hex: '#be123c', cssVariable: '--primitives-color-rose-700' },
      { shade: '800', hex: '#9f1239', cssVariable: '--primitives-color-rose-800' },
      { shade: '900', hex: '#881337', cssVariable: '--primitives-color-rose-900' },
      { shade: '950', hex: '#4c0519', cssVariable: '--primitives-color-rose-950' },
    ],
  },
  // Base colors
  {
    name: 'Base',
    displayName: 'Base',
    category: 'base',
    shades: [
      { shade: 'White', hex: '#ffffff', cssVariable: '--primitives-color-base-white' },
      { shade: 'Black', hex: '#000000', cssVariable: '--primitives-color-base-black' },
      { shade: 'Transparent', hex: '#00000000', cssVariable: '--primitives-color-base-transparent' },
    ],
  },
];

export default function PrimitiveColorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShade, setSelectedShade] = useState<{ palette: string; shade: string; hex: string; cssVariable: string } | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Filter palettes based on search
  const filteredPalettes = useMemo(() => {
    if (!searchQuery) return COLOR_PALETTES;
    const query = searchQuery.toLowerCase();
    return COLOR_PALETTES.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.displayName.toLowerCase().includes(query) ||
        p.shades.some((s) => s.hex.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Export all as CSS
  const handleExportCSS = async () => {
    const cssContent = COLOR_PALETTES.flatMap((palette) =>
      palette.shades.map((shade) => `  ${shade.cssVariable}: ${shade.hex};`)
    ).join('\n');

    const fullCSS = `:root {\n  /* Primitive Color Tokens */\n${cssContent}\n}`;

    try {
      await navigator.clipboard.writeText(fullCSS);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle swatch click
  const handleSwatchClick = (palette: string, shade: string, hex: string, cssVariable: string) => {
    setSelectedShade({ palette, shade, hex, cssVariable });
  };

  return (
    <div style={{ maxWidth: 'var(--layout-7xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link
            href="/tokens"
            style={{
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
          >
            Tokens
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <Link
            href="/tokens/primitives"
            style={{
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
          >
            Primitives
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Colors
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 700,
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Color Palettes
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              22 color families with 11 shades each (50-950), plus base colors. These are the raw
              color values used by semantic tokens throughout the design system.
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSS}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: copiedAll ? 'var(--color-success)' : 'var(--color-brand)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--duration-150) var(--ease-out)',
            }}
          >
            {copiedAll ? <Check size={16} /> : <Download size={16} />}
            {copiedAll ? 'Copied!' : 'Export CSS'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-6)',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Color Families', value: '22' },
          { label: 'Shades per Family', value: '11' },
          { label: 'Total Colors', value: '245' },
          { label: 'Base Colors', value: '3' },
        ].map((stat) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: 'var(--font-size-h5)', fontWeight: 700, color: 'var(--color-brand)' }}>
              {stat.value}
            </span>
            <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          position: 'relative',
          marginBottom: 'var(--spacing-6)',
          maxWidth: 400,
        }}
      >
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: 'var(--spacing-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-muted)',
          }}
        />
        <input
          type="text"
          placeholder="Search colors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: 'var(--spacing-2-5) var(--spacing-3)',
            paddingLeft: 'var(--spacing-10)',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-body-small)',
            color: 'var(--color-foreground)',
            outline: 'none',
          }}
        />
      </div>

      {/* Color Grid */}
      <ColorPaletteGrid
        palettes={filteredPalettes}
        layer={TokenLayer.Primitives}
        showFilters={true}
        showViewToggle={true}
        swatchSize="md"
        onSwatchClick={handleSwatchClick}
      />

      {/* Selected Color Panel */}
      {selectedShade && (
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--spacing-6)',
            right: 'var(--spacing-6)',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-4)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 50,
            minWidth: 280,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-lg)',
                backgroundColor: selectedShade.hex,
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            />
            <div>
              <div style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
                {selectedShade.palette} {selectedShade.shade}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>
                {selectedShade.hex.toUpperCase()}
              </div>
            </div>
            <button
              onClick={() => setSelectedShade(null)}
              style={{
                marginLeft: 'auto',
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
            >
              ×
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <CopyButton value={`var(${selectedShade.cssVariable})`} label="CSS Variable" />
            <CopyButton value={selectedShade.hex} label="Hex Value" />
            <CopyButton value={selectedShade.cssVariable} label="Variable Name" />
          </div>
        </div>
      )}
    </div>
  );
}

/** Simple copy button component */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltipPos({ x: rect.right + 8, y: rect.top + rect.height / 2 });
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTooltipPos(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleCopy}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-2) var(--spacing-3)',
          backgroundColor: 'var(--color-background)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'all var(--duration-100) var(--ease-out)',
          width: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-card-border)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-background)';
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
            {label}
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-label)',
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--color-foreground)',
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </div>
        </div>
        <Copy size={14} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
      </button>
      {copied && tooltipPos && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translateY(-50%)',
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            animation: 'tooltipSlideIn 0.15s ease-out',
          }}
        >
          Copied!
        </div>,
        document.body
      )}
    </>
  );
}
