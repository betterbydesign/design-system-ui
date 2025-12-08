'use client';

export default function ButtonsPage() {
  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h3)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-1)',
          }}
        >
          Buttons
        </h1>
        <p 
          style={{ 
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-muted)',
            lineHeight: 'var(--line-height-snug)',
            maxWidth: '60ch',
          }}
        >
          Button components using semantic design tokens for consistent styling across all platforms.
        </p>
      </div>

      {/* Primary Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-3)',
          }}
        >
          Primary Buttons
        </h2>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
              boxShadow: 'var(--button-shadow)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Secondary Buttons
        </h2>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-on-secondary)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h5)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Outline Buttons
        </h2>
        <div 
          className="flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--card-border)',
          }}
        >
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--button-padding-y) var(--button-padding-x)',
              minHeight: 'var(--button-height-sm)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            Small
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-3) var(--spacing-6)',
              minHeight: 'var(--button-height-md)',
              fontSize: 'var(--font-size-body-small)',
            }}
          >
            Medium
          </button>
          <button
            className="font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-brand)',
              border: '2px solid var(--color-brand)',
              borderRadius: 'var(--button-border-radius)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              minHeight: 'var(--button-height-lg)',
              fontSize: 'var(--font-size-body)',
            }}
          >
            Large
          </button>
        </div>
      </div>

      {/* Token Reference */}
      <div 
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--card-border)',
        }}
      >
        <h3 
          className="font-bold"
          style={{ 
            fontSize: 'var(--font-size-h6)',
            color: 'var(--color-foreground)',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Button Tokens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: '--button-bg', value: 'var(--color-brand)' },
            { name: '--button-bg-hover', value: 'var(--color-brand-hover)' },
            { name: '--button-text', value: 'var(--color-text-on-brand)' },
            { name: '--button-border-radius', value: 'var(--radius-lg)' },
            { name: '--button-padding-x', value: 'var(--spacing-5)' },
            { name: '--button-padding-y', value: 'var(--spacing-2-5)' },
            { name: '--button-height-sm', value: '40px' },
            { name: '--button-height-md', value: '48px' },
            { name: '--button-height-lg', value: '56px' },
          ].map((token) => (
            <div 
              key={token.name}
              className="flex justify-between items-center"
              style={{
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <span 
                className="font-mono"
                style={{ 
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-brand)',
                }}
              >
                {token.name}
              </span>
              <span 
                className="font-mono"
                style={{ 
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-muted)',
                }}
              >
                {token.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

