#!/usr/bin/env ts-node

/**
 * UI CONSISTENCY VIOLATION FIXER
 *
 * This script automatically fixes UI consistency violations:
 * 1. Replaces hardcoded hex colors with design system tokens
 * 2. Replaces raw Tailwind color classes with semantic tokens
 * 3. Generates detailed violation report
 *
 * @module FixUIConsistency
 * @since 2025-01-01
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ==========================================
// COLOR MAPPING CONFIGURATION
// ==========================================

/**
 * Hex color to design token mapping
 * Maps common hex colors to their design system equivalents
 */
const HEX_TO_TOKEN_MAP: Record<string, string> = {
  // Primary Red Shades
  '#DC2626': 'lydian-primary',
  '#dc2626': 'lydian-primary',
  '#B91C1C': 'lydian-primary-hover',
  '#b91c1c': 'lydian-primary-hover',
  '#991B1B': 'lydian-primary-active',
  '#991b1b': 'lydian-primary-active',
  '#FCA5A5': 'lydian-primary-light',
  '#fca5a5': 'lydian-primary-light',
  '#FEE2E2': 'lydian-primary-lighter',
  '#fee2e2': 'lydian-primary-lighter',
  '#7F1D1D': 'lydian-primary-darker',
  '#7f1d1d': 'lydian-primary-darker',

  // Secondary Red
  '#EF4444': 'lydian-secondary',
  '#ef4444': 'lydian-secondary',

  // Success Green Shades
  '#10B981': 'lydian-success',
  '#10b981': 'lydian-success',
  '#059669': 'lydian-success-hover',
  '#047857': 'lydian-success-active',
  '#D1FAE5': 'lydian-success-light',
  '#d1fae5': 'lydian-success-light',
  '#ECFDF5': 'lydian-success-lighter',
  '#ecfdf5': 'lydian-success-lighter',

  // Warning Amber Shades
  '#F59E0B': 'lydian-warning',
  '#f59e0b': 'lydian-warning',
  '#D97706': 'lydian-warning-hover',
  '#d97706': 'lydian-warning-hover',
  '#B45309': 'lydian-warning-active',
  '#b45309': 'lydian-warning-active',
  '#FEF3C7': 'lydian-warning-light',
  '#fef3c7': 'lydian-warning-light',
  '#FFFBEB': 'lydian-warning-lighter',
  '#fffbeb': 'lydian-warning-lighter',

  // Info Blue Shades
  '#3B82F6': 'lydian-info',
  '#3b82f6': 'lydian-info',
  '#2563EB': 'lydian-info-hover',
  '#2563eb': 'lydian-info-hover',
  '#1D4ED8': 'lydian-info-active',
  '#1d4ed8': 'lydian-info-active',
  '#DBEAFE': 'lydian-info-light',
  '#dbeafe': 'lydian-info-light',
  '#EFF6FF': 'lydian-info-lighter',
  '#eff6ff': 'lydian-info-lighter',

  // Accent Colors
  '#06B6D4': 'lydian-accent-cyan',
  '#06b6d4': 'lydian-accent-cyan',
  '#8B5CF6': 'lydian-accent-purple',
  '#8b5cf6': 'lydian-accent-purple',

  // Neutral Text Colors
  '#111827': 'lydian-text',
  '#374151': 'lydian-text-secondary',
  '#6B7280': 'lydian-text-tertiary',
  '#6b7280': 'lydian-text-tertiary',
  '#9CA3AF': 'lydian-text-muted',
  '#9ca3af': 'lydian-text-muted',
  '#D1D5DB': 'lydian-text-dim',
  '#d1d5db': 'lydian-text-dim',
  '#FFFFFF': 'lydian-text-inverse',
  '#ffffff': 'lydian-text-inverse',

  // Neutral Background Colors
  '#F9FAFB': 'lydian-bg-surface',
  '#f9fafb': 'lydian-bg-surface',
  '#F3F4F6': 'lydian-bg-surface-raised',
  '#f3f4f6': 'lydian-bg-surface-raised',
  '#E5E7EB': 'lydian-border',
  '#e5e7eb': 'lydian-border',

  // RGBA variants (common opacities)
  'rgba(0, 0, 0, 0.5)': 'lydian-bg-overlay',
  'rgba(0,0,0,0.5)': 'lydian-bg-overlay',
  'rgba(0, 0, 0, 0.8)': 'lydian-bg-overlay',
  'rgba(0,0,0,0.8)': 'lydian-bg-overlay',
  'rgba(0, 0, 0, 0.2)': 'lydian-bg-overlay-light',
  'rgba(0,0,0,0.2)': 'lydian-bg-overlay-light',
  'rgba(255, 255, 255, 0.1)': 'lydian-glass-light',
  'rgba(255,255,255,0.1)': 'lydian-glass-light',
  'rgba(255, 255, 255, 0.15)': 'lydian-glass-medium',
  'rgba(255,255,255,0.15)': 'lydian-glass-medium',
  'rgba(255, 255, 255, 0.25)': 'lydian-glass-heavy',
  'rgba(255,255,255,0.25)': 'lydian-glass-heavy',
};

/**
 * Tailwind color class to design token mapping
 * Maps raw Tailwind classes to semantic tokens
 */
const TAILWIND_CLASS_MAP: Record<string, string> = {
  // Primary Red variants
  'bg-red-600': 'bg-lydian-primary',
  'bg-red-700': 'bg-lydian-primary-hover',
  'bg-red-800': 'bg-lydian-primary-active',
  'bg-red-400': 'bg-lydian-primary-light',
  'bg-red-100': 'bg-lydian-primary-lighter',
  'bg-red-900': 'bg-lydian-primary-darker',

  'text-red-600': 'text-lydian-primary',
  'text-red-700': 'text-lydian-primary-hover',
  'text-red-800': 'text-lydian-primary-active',
  'text-red-500': 'text-lydian-secondary',

  'border-red-600': 'border-lydian-primary',
  'border-red-700': 'border-lydian-primary-hover',
  'border-red-500': 'border-lydian-secondary',

  'hover:bg-red-700': 'hover:bg-lydian-primary-hover',
  'hover:bg-red-800': 'hover:bg-lydian-primary-active',
  'hover:text-red-700': 'hover:text-lydian-primary-hover',
  'hover:border-red-700': 'hover:border-lydian-primary-hover',

  // Success Green variants
  'bg-green-500': 'bg-lydian-success',
  'bg-green-600': 'bg-lydian-success-hover',
  'bg-green-700': 'bg-lydian-success-active',
  'bg-green-100': 'bg-lydian-success-light',
  'bg-green-50': 'bg-lydian-success-lighter',

  'text-green-500': 'text-lydian-success',
  'text-green-600': 'text-lydian-success-hover',
  'text-green-700': 'text-lydian-success-text',

  'border-green-500': 'border-lydian-success',
  'border-green-600': 'border-lydian-success-hover',

  'hover:bg-green-600': 'hover:bg-lydian-success-hover',
  'hover:bg-green-700': 'hover:bg-lydian-success-active',

  // Warning Amber variants
  'bg-amber-500': 'bg-lydian-warning',
  'bg-yellow-500': 'bg-lydian-warning',
  'bg-amber-600': 'bg-lydian-warning-hover',
  'bg-amber-700': 'bg-lydian-warning-active',
  'bg-amber-100': 'bg-lydian-warning-light',
  'bg-amber-50': 'bg-lydian-warning-lighter',

  'text-amber-500': 'text-lydian-warning',
  'text-yellow-500': 'text-lydian-warning',
  'text-amber-700': 'text-lydian-warning-text',

  'border-amber-500': 'border-lydian-warning',
  'border-yellow-500': 'border-lydian-warning',

  // Info Blue variants
  'bg-blue-500': 'bg-lydian-info',
  'bg-blue-600': 'bg-lydian-info-hover',
  'bg-blue-700': 'bg-lydian-info-active',
  'bg-blue-100': 'bg-lydian-info-light',
  'bg-blue-50': 'bg-lydian-info-lighter',

  'text-blue-500': 'text-lydian-info',
  'text-blue-600': 'text-lydian-info-hover',
  'text-blue-700': 'text-lydian-info-text',

  'border-blue-500': 'border-lydian-info',
  'border-blue-600': 'border-lydian-info-hover',

  // Neutral Gray variants (Text)
  'text-gray-900': 'text-lydian-text',
  'text-gray-800': 'text-lydian-text',
  'text-gray-700': 'text-lydian-text-secondary',
  'text-gray-600': 'text-lydian-text-secondary',
  'text-gray-500': 'text-lydian-text-tertiary',
  'text-gray-400': 'text-lydian-text-muted',
  'text-gray-300': 'text-lydian-text-dim',
  'text-white': 'text-lydian-text-inverse',

  // Neutral Gray variants (Background)
  'bg-gray-50': 'bg-lydian-bg-surface',
  'bg-gray-100': 'bg-lydian-bg-surface-raised',
  'bg-white': 'bg-lydian-bg',

  // Neutral Gray variants (Border)
  'border-gray-200': 'border-lydian-border',
  'border-gray-100': 'border-lydian-border-light',
  'border-gray-300': 'border-lydian-border-medium',
  'border-gray-400': 'border-lydian-border-heavy',

  // Accent variants
  'bg-cyan-500': 'bg-lydian-accent-cyan',
  'bg-purple-500': 'bg-lydian-accent-purple',
  'text-cyan-500': 'text-lydian-accent-cyan',
  'text-purple-500': 'text-lydian-accent-purple',
};

// ==========================================
// VIOLATION TRACKING
// ==========================================

interface Violation {
  file: string;
  line: number;
  type: 'hex' | 'tailwind';
  original: string;
  replacement: string;
}

const violations: Violation[] = [];

// ==========================================
// FILE PROCESSING
// ==========================================

/**
 * Fix hardcoded hex colors in a file
 */
function fixHexColors(content: string, filePath: string): string {
  let updatedContent = content;
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip if line is a comment
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
      return;
    }

    // Find all hex colors in the line
    const hexMatches = line.matchAll(/(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgba?\([^)]+\))/g);

    for (const match of hexMatches) {
      const hexColor = match[0];
      const tokenName = HEX_TO_TOKEN_MAP[hexColor];

      if (tokenName) {
        // Determine context: className, style prop, or CSS-in-JS
        const isInClassName = line.includes('className') || line.includes('class=');
        const isInStyle = line.includes('style=') || line.includes('sx=');
        const isInTailwindConfig = filePath.includes('tailwind.config');
        const isInTokensFile = filePath.includes('design-system/tokens');

        // Skip replacements in token definition files or config
        if (isInTokensFile || isInTailwindConfig) {
          continue;
        }

        let replacement = '';

        if (isInClassName) {
          // In className, no need to replace - use Tailwind class instead
          continue;
        } else if (isInStyle) {
          // In style prop, reference CSS variable or use token directly
          replacement = `var(--${tokenName})`;
        } else {
          // In CSS-in-JS or other contexts
          replacement = `var(--${tokenName})`;
        }

        // Only replace if we have a valid replacement
        if (replacement && hexColor !== replacement) {
          updatedContent = updatedContent.replace(hexColor, replacement);
          violations.push({
            file: filePath,
            line: index + 1,
            type: 'hex',
            original: hexColor,
            replacement: replacement,
          });
        }
      }
    }
  });

  return updatedContent;
}

/**
 * Fix raw Tailwind color classes in a file
 */
function fixTailwindClasses(content: string, filePath: string): string {
  let updatedContent = content;
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Find className attributes
    const classNameMatches = line.matchAll(/className\s*=\s*["`{]([^"`}]+)["`}]/g);

    for (const match of classNameMatches) {
      const classString = match[1];
      if (!classString) continue;
      const classes = classString.split(/\s+/);

      classes.forEach((cls) => {
        const cleanClass = cls.trim();
        const tokenClass = TAILWIND_CLASS_MAP[cleanClass];

        if (tokenClass && cleanClass !== tokenClass) {
          // Create regex to match the exact class (with word boundaries)
          const regex = new RegExp(`\\b${cleanClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          updatedContent = updatedContent.replace(regex, tokenClass);

          violations.push({
            file: filePath,
            line: index + 1,
            type: 'tailwind',
            original: cleanClass,
            replacement: tokenClass,
          });
        }
      });
    }
  });

  return updatedContent;
}

/**
 * Process a single file
 */
async function processFile(filePath: string): Promise<void> {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Fix hex colors
    content = fixHexColors(content, filePath);

    // Fix Tailwind classes
    content = fixTailwindClasses(content, filePath);

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error);
  }
}

/**
 * Get all component files
 */
async function getComponentFiles(srcDir: string): Promise<string[]> {
  const patterns = [
    `${srcDir}/**/*.tsx`,
    `${srcDir}/**/*.ts`,
    `${srcDir}/**/*.jsx`,
    `${srcDir}/**/*.js`,
  ];

  const files: string[] = [];

  for (const pattern of patterns) {
    const matches = await glob(pattern, {
      ignore: [
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/build/**',
        '**/design-system/tokens.ts', // Don't modify token definitions
        '**/tailwind.config.js', // Don't modify Tailwind config
      ],
    });
    files.push(...matches);
  }

  return [...new Set(files)]; // Remove duplicates
}

/**
 * Generate violation report
 */
function generateReport(): void {
  console.log('\n\n═══════════════════════════════════════════════');
  console.log('   UI CONSISTENCY VIOLATION FIX REPORT');
  console.log('═══════════════════════════════════════════════\n');

  // Group violations by type
  const hexViolations = violations.filter((v) => v.type === 'hex');
  const tailwindViolations = violations.filter((v) => v.type === 'tailwind');

  console.log(`Total Violations Fixed: ${violations.length}`);
  console.log(`  - Hardcoded Hex Colors: ${hexViolations.length}`);
  console.log(`  - Raw Tailwind Classes: ${tailwindViolations.length}\n`);

  // Group by file
  const byFile = violations.reduce((acc, v) => {
    if (!acc[v.file]) {
      acc[v.file] = [];
    }
    acc[v.file]!.push(v);
    return acc;
  }, {} as Record<string, Violation[]>);

  console.log(`Files Modified: ${Object.keys(byFile).length}\n`);

  // Show top violators
  console.log('Top 10 Files with Most Violations:');
  console.log('─────────────────────────────────────────────\n');

  const sortedFiles = Object.entries(byFile)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 10);

  sortedFiles.forEach(([file, viols], index) => {
    const relPath = file.replace(process.cwd() || '', '');
    console.log(`${index + 1}. ${relPath}`);
    console.log(`   Violations: ${viols.length}`);
    console.log(`   - Hex: ${viols.filter((v) => v.type === 'hex').length}`);
    console.log(`   - Tailwind: ${viols.filter((v) => v.type === 'tailwind').length}\n`);
  });

  // Show common replacements
  console.log('\nMost Common Replacements:');
  console.log('─────────────────────────────────────────────\n');

  const replacementCounts = violations.reduce((acc, v) => {
    const key = `${v.original} → ${v.replacement}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topReplacements = Object.entries(replacementCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);

  topReplacements.forEach(([replacement, count], index) => {
    console.log(`${index + 1}. ${replacement} (${count}x)`);
  });

  // Save detailed report to file
  const reportPath = path.join(process.cwd(), 'ui-consistency-fix-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        summary: {
          totalViolations: violations.length,
          hexViolations: hexViolations.length,
          tailwindViolations: tailwindViolations.length,
          filesModified: Object.keys(byFile).length,
        },
        violationsByFile: byFile,
        topReplacements: Object.fromEntries(topReplacements),
      },
      null,
      2
    )
  );

  console.log(`\n\n✓ Detailed report saved to: ${reportPath}`);
  console.log('\n═══════════════════════════════════════════════\n');
}

// ==========================================
// MAIN EXECUTION
// ==========================================

async function main() {
  console.log('\n🔧 Starting UI Consistency Violation Fixer...\n');

  const srcDir = path.join(process.cwd(), 'src');

  if (!fs.existsSync(srcDir)) {
    console.error('Error: src directory not found');
    process.exit(1);
  }

  console.log('📁 Scanning for component files...\n');
  const files = await getComponentFiles(srcDir);
  console.log(`Found ${files.length} files to process\n`);

  console.log('🔨 Processing files...\n');

  // Process files in batches for better performance
  const BATCH_SIZE = 50;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(processFile));
    console.log(`Progress: ${Math.min(i + BATCH_SIZE, files.length)}/${files.length} files`);
  }

  console.log('\n✓ All files processed\n');

  // Generate report
  generateReport();

  console.log('✓ UI Consistency fix complete!\n');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
