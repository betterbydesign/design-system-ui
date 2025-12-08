# Altitude Design System UI - Styleguide

> **Version:** Modernization 2.0  
> **Last Updated:** December 8, 2025

This document defines the visual language and component patterns used throughout the Design System documentation app. All pages should adhere to these guidelines for consistency.

---

## 1. Color System & Theming

### 1.1 Eliminate Random Colors
❌ **DON'T:** Use arbitrary colors (orange, green, blue, purple) for decoration or to differentiate sections.

✅ **DO:** Use the semantic color system consistently across all pages.

### 1.2 Primary Theme (Action/Data) - Brand Color
**Token:** `var(--color-brand)` (Teal - `#2AAFB8`)

Use for:
- Interactive elements (links, buttons, hover states)
- **Key data values** (numbers in stats cards)
- Active states and selections
- Token variable names in copy buttons (via `TokenCopyButton variant="primary"`)
- Visual bars/indicators for spacing, progress

```css
/* Stats card value */
.stat-value {
  color: var(--color-brand);
  font-weight: 700;
}
```

### 1.3 Secondary Theme (Structure) - Deep Purple
**Token:** `var(--color-secondary)` (Deep Purple - `#444B8C`)

Use for:
- **Page header icons** (colored icon + matching border on neutral bg)
- Section header icons (colored icon only, no background)
- Architectural elements (layer indicators, structural diagrams)
- Info/architecture box titles

```css
/* Page header icon box - neutral bg, colored border + icon */
.header-icon-box {
  background-color: var(--color-card);  /* Neutral */
  border: 1px solid rgba(68, 75, 140, 0.3);  /* Colored border */
  color: var(--color-secondary);  /* Colored icon */
}

/* Section header icon - colored icon only */
.section-icon {
  color: var(--color-secondary);  /* Just the colored icon */
}
```

### 1.4 Neutral Foundation
**Token:** `var(--color-muted)` (Gray - `#6b7280`)

Use for:
- Labels and secondary text
- Descriptions and helper text
- Breadcrumb links (non-current)
- Table headers (uppercase, small)

### 1.5 Background Patterns
❌ **DON'T:** Use hardcoded hex tints like `#3b82f610`, `#10b98115`

✅ **DO:** Use semantic rgba values or CSS custom properties:

```css
/* Good - Brand-based tint */
background-color: rgba(var(--color-brand-rgb), 0.1);
border: 1px solid rgba(var(--color-brand-rgb), 0.2);

/* Good - Secondary-based tint */
background-color: rgba(68, 75, 140, 0.05);
border: 1px solid rgba(68, 75, 140, 0.15);

/* Acceptable - For token reference chain chips */
background-color: rgba(42, 175, 184, 0.08);  /* Brand layer */
background-color: rgba(68, 75, 140, 0.08);   /* Primitive layer */
```

---

## 2. Typography

### 2.1 Scale Selection
Always use the **Major Second (`--ms`)** scale for documentation pages to prevent jarring size jumps:

```css
/* Headings */
font-size: var(--font-size-h2--ms);   /* Page title */
font-size: var(--font-size-h4--ms);   /* Section title */
font-size: var(--font-size-h5--ms);   /* Subsection */
font-size: var(--font-size-h6--ms);   /* Card title */
```

### 2.2 Body Text
```css
/* Paragraph descriptions */
font-size: var(--font-size-body);
line-height: var(--line-height-relaxed);
max-width: 65ch;
color: var(--color-muted);
```

### 2.3 Labels & Captions
```css
/* Uppercase labels */
font-size: var(--font-size-caption);
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--color-muted);
```

---

## 3. Components & Patterns

### 3.1 TokenCopyButton Component

**Always** use `<TokenCopyButton />` instead of displaying static CSS variable text.

**Import:**
```tsx
import { TokenCopyButton } from '@/components/tokens/TokenCopyButton';
```

**Variants:**
- `primary` - Brand-colored background, for main token displays
- `muted` - Subtle background, for inline references
- `default` - Standard neutral style
- `ghost` - Transparent, for minimal interference

**Usage:**
```tsx
// For token variable displays
<TokenCopyButton 
  value="var(--color-brand)" 
  displayValue="--color-brand" 
  variant="primary" 
/>

// For inline references
<TokenCopyButton value="--spacing-4" variant="muted" />

// With full var() syntax
<TokenCopyButton value={`var(${token.cssVariable})`} />
```

### 3.2 Page Header Pattern (H1)

Every documentation page should follow this header structure for the **H1 page title**:

**H1 Icon Style:** `var(--color-secondary)` icon with white/neutral background and a light thin border.

```tsx
<div style={{ marginBottom: 'var(--spacing-8)' }}>
  {/* 1. Breadcrumbs */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 'var(--spacing-2)', 
    marginBottom: 'var(--spacing-4)' 
  }}>
    <Link href="/tokens" style={{ 
      fontSize: 'var(--font-size-label)', 
      color: 'var(--color-muted)', 
      textDecoration: 'none' 
    }}>
      Tokens
    </Link>
    <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
    <span style={{ 
      fontSize: 'var(--font-size-label)', 
      color: 'var(--color-foreground)', 
      fontWeight: 500 
    }}>
      Current Page
    </span>
  </div>

  {/* 2. Icon + Title Block */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: 'var(--spacing-4)' 
  }}>
    {/* H1 Page Icon Box - 56x56px, WHITE bg, LIGHT THIN border, SECONDARY icon */}
    <div style={{
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--color-card)',  // White/neutral background
      border: '1px solid rgba(68, 75, 140, 0.2)',  // Light thin colored border
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: 'var(--color-secondary)',  // Secondary (deep purple) icon
    }}>
      <IconComponent size={28} />
    </div>

    <div>
      {/* Title - H2 size, Bold */}
      <h1 style={{
        fontSize: 'var(--font-size-h2)',
        fontWeight: 700,
        color: 'var(--color-foreground)',
        marginBottom: 'var(--spacing-2)',
        lineHeight: 'var(--line-height-tight)',  // For icon alignment reference
      }}>
        Page Title
      </h1>
      
      {/* Description - Body, Muted, max 65ch */}
      <p style={{
        fontSize: 'var(--font-size-body)',
        color: 'var(--color-muted)',
        lineHeight: 'var(--line-height-relaxed)',
        maxWidth: '65ch',
      }}>
        Description of the page content...
      </p>
    </div>
  </div>
</div>
```

### 3.3 Section Header Icons (H2)

**H2 section headers use icon boxes with light purple background** - NO border.

**H2 Icon Style:** `var(--color-secondary)` icon, light purple background (`rgba(68, 75, 140, 0.08)`), no border.

**Important:** Use `alignItems: 'center'` to vertically center the icon with the title. The icon box height should visually match the title's line height.

```tsx
{/* H2 Section header - icon with light purple bg, centered with title */}
<div style={{ 
  display: 'flex', 
  alignItems: 'center',  // Vertically center icon with title
  gap: 'var(--spacing-4)', 
  marginBottom: 'var(--spacing-6)' 
}}>
  {/* H2 Icon Box - 48x48px, light purple bg, NO border */}
  <div style={{
    width: 48,
    height: 48,
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(68, 75, 140, 0.08)',  // Light purple tint
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'var(--color-secondary)',  // Secondary (deep purple) icon
  }}>
    <Sparkles size={20} />
  </div>
  <div>
    <h2 style={{ 
      fontSize: 'var(--font-size-h4)', 
      fontWeight: 600, 
      color: 'var(--color-foreground)',
      lineHeight: 'var(--line-height-tight)',
    }}>
      Section Title
    </h2>
    <p style={{ 
      fontSize: 'var(--font-size-body-small)', 
      color: 'var(--color-muted)' 
    }}>
      Optional section description
    </p>
  </div>
</div>
```

### 3.4 Callout/Info Box Icons

**Small icons inside callouts use colored icon only** - NO background, NO border.

**Callout Icon Style:** `var(--color-secondary)` (dark purple) icon only.

```tsx
{/* Info/callout box with icon */}
<div style={{
  backgroundColor: 'rgba(68, 75, 140, 0.05)',
  border: '1px solid rgba(68, 75, 140, 0.15)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--spacing-5)',
}}>
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
    {/* Callout icon - just the icon, no background or border */}
    <Zap size={20} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: 2 }} />
    <div>
      <h3 style={{
        fontSize: 'var(--font-size-body)',
        fontWeight: 600,
        color: 'var(--color-secondary)',
        marginBottom: 'var(--spacing-2)',
      }}>
        Callout Title
      </h3>
      <p style={{ 
        fontSize: 'var(--font-size-body-small)', 
        color: 'var(--color-foreground)', 
        lineHeight: 'var(--line-height-relaxed)' 
      }}>
        Callout content...
      </p>
    </div>
  </div>
</div>
```

### Icon Style Summary

| Location | Box Size | Background | Border | Icon Size | Icon Color |
|----------|----------|------------|--------|-----------|------------|
| **H1 Page header** | 56×56px | `var(--color-card)` (white) | 1px solid rgba(68, 75, 140, 0.2) | 28px | `var(--color-secondary)` |
| **H2 Section header** | 48×48px | `rgba(68, 75, 140, 0.08)` (light purple) | None | 20px | `var(--color-secondary)` |
| **Callout/Info box** | None | None | None | 20px | `var(--color-secondary)` |
| **Token chip** | Chip | Chip has tinted bg | Chip has border | 10-12px | Matches chip theme |

### 3.5 Stats Cards

Uniform design for quick statistics:

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: 'var(--spacing-4)',
  marginBottom: 'var(--spacing-8)',
}}>
  {stats.map((stat) => (
    <div key={stat.label} style={{
      backgroundColor: 'var(--color-card)',
      border: '1px solid var(--color-card-border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--spacing-4)',
      textAlign: 'center',
    }}>
      {/* Value - Brand color, Bold, H4 size */}
      <div style={{
        fontSize: 'var(--font-size-h4)',
        fontWeight: 700,
        color: 'var(--color-brand)',  // Always brand color for values
        marginBottom: 'var(--spacing-1)',
      }}>
        {stat.value}
      </div>
      
      {/* Label - Caption, Muted, Uppercase */}
      <div style={{
        fontSize: 'var(--font-size-caption)',
        color: 'var(--color-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

### 3.6 Content Cards

Standard card container:

```tsx
<div style={{
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-card-border)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--spacing-5)',
}}>
  {/* Card content */}
</div>
```

### 3.7 Info/Architecture Boxes

For explanatory sections about token architecture:

```tsx
{/* Using Secondary color theme */}
<div style={{
  backgroundColor: 'rgba(68, 75, 140, 0.05)',
  border: '1px solid rgba(68, 75, 140, 0.15)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--spacing-5)',
}}>
  <h3 style={{
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-secondary)',
    marginBottom: 'var(--spacing-2)',
  }}>
    About [Topic]
  </h3>
  <p style={{
    fontSize: 'var(--font-size-body-small)',
    color: 'var(--color-foreground)',
    lineHeight: 'var(--line-height-relaxed)',
  }}>
    Explanation text...
  </p>
</div>
```

### 3.8 Token Reference Chain

Visual representation of token flow (Value → Primitive → Semantic → Component):

```tsx
<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: 'var(--spacing-2)', 
  flexWrap: 'wrap' 
}}>
  {/* Raw Value */}
  <div style={{
    padding: 'var(--spacing-1) var(--spacing-2)',
    backgroundColor: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
  }}>
    <span style={{ 
      fontSize: 'var(--font-size-caption)', 
      fontFamily: 'ui-monospace, monospace', 
      color: 'var(--color-foreground)' 
    }}>
      #34d399
    </span>
  </div>
  
  <ArrowRight size={12} style={{ color: 'var(--color-muted)' }} />
  
  {/* Primitive Layer */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    padding: 'var(--spacing-1) var(--spacing-2)',
    backgroundColor: 'rgba(68, 75, 140, 0.08)',
    border: '1px solid rgba(68, 75, 140, 0.15)',
    borderRadius: 'var(--radius-md)',
  }}>
    <Hash size={12} style={{ color: 'var(--color-secondary)' }} />
    <span style={{ 
      fontSize: 'var(--font-size-caption)', 
      fontFamily: 'ui-monospace, monospace', 
      color: 'var(--color-secondary)', 
      fontWeight: 500 
    }}>
      Emerald.400
    </span>
  </div>
  
  <ArrowRight size={12} style={{ color: 'var(--color-muted)' }} />
  
  {/* Semantic Layer */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    padding: 'var(--spacing-1) var(--spacing-2)',
    backgroundColor: 'rgba(42, 175, 184, 0.08)',
    border: '1px solid rgba(42, 175, 184, 0.2)',
    borderRadius: 'var(--radius-md)',
  }}>
    <Sparkles size={12} style={{ color: 'var(--color-brand)' }} />
    <span style={{ 
      fontSize: 'var(--font-size-caption)', 
      fontWeight: 500, 
      color: 'var(--color-brand)' 
    }}>
      Color.Brand
    </span>
  </div>
</div>
```

---

## 4. Layout

### 4.1 Grid System
Strict 4px/8px grid usage:

```css
/* Spacing values */
var(--spacing-1)   /* 4px */
var(--spacing-2)   /* 8px */
var(--spacing-3)   /* 12px */
var(--spacing-4)   /* 16px */
var(--spacing-5)   /* 20px */
var(--spacing-6)   /* 24px */
var(--spacing-8)   /* 32px */
var(--spacing-10)  /* 40px */
var(--spacing-12)  /* 48px */
```

### 4.2 Content Width
```css
max-width: var(--layout-6xl);  /* 1152px - Standard pages */
max-width: var(--layout-7xl);  /* 1280px - Wide pages like color palettes */
```

### 4.3 Section Spacing
```css
/* Between major sections */
margin-bottom: var(--spacing-10);  /* 40px */

/* Between subsections */
margin-bottom: var(--spacing-8);   /* 32px */

/* Between related elements */
margin-bottom: var(--spacing-4);   /* 16px */
```

---

## 5. Common Patterns Checklist

When updating a page, ensure:

- [ ] **Breadcrumbs** use muted color for links, foreground for current
- [ ] **H1 page icon box** is 56x56px with white bg, light thin border (rgba 0.2), secondary colored icon
- [ ] **H2 section icons** have 48x48px icon box with light purple bg (rgba 0.08), no border, secondary colored icon
- [ ] **Callout icons** are secondary colored icon only (no bg, no border)
- [ ] **Icon alignment** - icons are vertically centered with their titles
- [ ] **Title** uses H2 size, weight 700
- [ ] **Description** has max-width 65ch, line-height relaxed
- [ ] **Stats cards** use brand color for values, muted for labels
- [ ] **Token variables** use `<TokenCopyButton />` component
- [ ] **No hardcoded hex colors** for decorative elements
- [ ] **Grid alignment** uses 4px/8px multiples
- [ ] **Card containers** use `var(--radius-xl)` and standard border
- [ ] **Architecture notes** use secondary color theme

---

## 6. Layer Color Reference

For token architecture visualization, use these consistent colors:

| Layer | Color | Usage |
|-------|-------|-------|
| Greenshift | `#06b6d4` (Cyan) | Framework adapter layer |
| Components | Brand theme | Component tokens |
| Semantic | Brand theme | Role-based tokens |
| Typography | Secondary theme | Type scale tokens |
| Primitives | Secondary theme | Raw value tokens |

---

## 7. Icon Selection

Use Lucide React icons. Common icons by page type:

- **Primitives:** `Hash`
- **Semantic:** `Sparkles`
- **Components:** `Box`
- **Typography:** `Type`
- **Colors:** `Palette`
- **Spacing:** `Ruler`
- **Greenshift:** `Globe`

---

*This styleguide should be referenced for all new pages and when updating existing pages in the Design System documentation app.*
