/**
 * ESLint Rules for Design System Enforcement
 *
 * This configuration enforces the design token system and prevents developers
 * from bypassing the design system with raw Tailwind classes.
 *
 * Violations will cause ESLint errors during development and build failures in CI/CD.
 *
 * @see /src/design-system/tokens.ts for approved tokens
 */

module.exports = {
  rules: {
    // ==========================================
    // CRITICAL: Block Raw Tailwind Colors
    // ==========================================
    'no-restricted-syntax': [
      'error',

      // Block text-{color}-{shade} patterns
      {
        selector: "JSXAttribute[name.name='className'][value.value=/text-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/]",
        message: '❌ DESIGN SYSTEM VIOLATION: Use lydian.* tokens instead of raw Tailwind colors.\n\nExamples:\n  ❌ text-gray-300 → ✅ text-lydian-text-dim\n  ❌ text-blue-600 → ✅ text-lydian-primary\n  ❌ text-red-500 → ✅ text-lydian-error\n\nSee: /src/design-system/tokens.ts'
      },

      // Block bg-{color}-{shade} patterns
      {
        selector: "JSXAttribute[name.name='className'][value.value=/bg-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/]",
        message: '❌ DESIGN SYSTEM VIOLATION: Use lydian.* background tokens instead.\n\nExamples:\n  ❌ bg-gray-50 → ✅ bg-lydian-bg-surface\n  ❌ bg-blue-600 → ✅ bg-lydian-primary\n  ❌ bg-red-100 → ✅ bg-lydian-error-lighter\n\nSee: /src/design-system/tokens.ts'
      },

      // Block border-{color}-{shade} patterns
      {
        selector: "JSXAttribute[name.name='className'][value.value=/border-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/]",
        message: '❌ DESIGN SYSTEM VIOLATION: Use lydian.* border tokens instead.\n\nExamples:\n  ❌ border-gray-200 → ✅ border-lydian-border\n  ❌ border-blue-600 → ✅ border-lydian-primary\n\nSee: /src/design-system/tokens.ts'
      },

      // Block ring-{color}-{shade} patterns (focus rings)
      {
        selector: "JSXAttribute[name.name='className'][value.value=/ring-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/]",
        message: '❌ DESIGN SYSTEM VIOLATION: Use lydian.* ring colors.\n\nExamples:\n  ❌ ring-blue-500 → ✅ ring-lydian-primary\n  ❌ ring-red-500 → ✅ ring-lydian-error\n\nSee: /src/design-system/tokens.ts'
      },

      // ==========================================
      // CRITICAL: Block Inline Styles
      // ==========================================
      {
        selector: "JSXAttribute[name.name='style']",
        message: '❌ DESIGN SYSTEM VIOLATION: Inline styles are forbidden.\n\nReason: Inline styles bypass the design system and create inconsistency.\n\nSolutions:\n  1. Use Tailwind classes with lydian.* tokens\n  2. Create a component with proper props\n  3. For dynamic values, use CSS-in-JS utility functions\n\nIf absolutely necessary, request design system extension.'
      },

      // ==========================================
      // WARNING: Discourage Ad-hoc Card Patterns
      // ==========================================
      {
        selector: "JSXElement[openingElement.name.name='div'][openingElement.attributes.*.name.name='className'][openingElement.attributes.*.value.value=/rounded-(lg|xl|2xl).*shadow/]",
        message: '⚠️  COMPONENT PATTERN VIOLATION: Use <Card> component instead of raw div.\n\nExample:\n  ❌ <div className="bg-white rounded-lg shadow-md p-4">...</div>\n  ✅ <Card padding="md" shadow="md">...</Card>\n\nSee: /src/components/ui/Card.tsx'
      },

      // ==========================================
      // WARNING: Discourage Ad-hoc Button Patterns
      // ==========================================
      {
        selector: "JSXElement[openingElement.name.name='button'][openingElement.attributes.*.name.name='className'][openingElement.attributes.*.value.value=/bg-(blue|red|green|purple|gray)-(500|600|700)/]",
        message: '⚠️  COMPONENT PATTERN VIOLATION: Use <Button> component instead of raw button.\n\nExample:\n  ❌ <button className="bg-blue-600 text-white px-4 py-2 rounded">Click</button>\n  ✅ <Button variant="primary">Click</Button>\n\nSee: /src/components/ui/Button.tsx'
      },
    ],

    // ==========================================
    // Additional Rules
    // ==========================================

    // Prevent usage of deprecated Tailwind utilities
    'tailwindcss/no-custom-classname': 'warn',

    // Enforce consistent class ordering
    'tailwindcss/classnames-order': 'warn',

    // Prevent contradicting classes
    'tailwindcss/no-contradicting-classname': 'error',
  },

  overrides: [
    {
      // Relax rules for legacy files during migration
      files: [
        'src/pages/**/*.tsx',
        'src/app/**/*.tsx',
      ],
      rules: {
        'no-restricted-syntax': 'warn', // Downgrade to warning during migration
      }
    },
    {
      // Strict enforcement for new components
      files: [
        'src/components/ui/**/*.tsx',
        'src/design-system/**/*.tsx',
      ],
      rules: {
        'no-restricted-syntax': 'error', // Full enforcement
      }
    }
  ]
};
