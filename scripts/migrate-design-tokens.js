#!/usr/bin/env node
/**
 * AUTOMATED DESIGN TOKEN MIGRATION SCRIPT
 *
 * Replaces raw Tailwind colors and hardcoded hex values with design tokens
 * from src/design-system/tokens.ts
 *
 * Usage:
 *   node scripts/migrate-design-tokens.js <path>
 *   node scripts/migrate-design-tokens.js src/app/owner
 *   node scripts/migrate-design-tokens.js --all  (migrates entire src/)
 *   node scripts/migrate-design-tokens.js --dry-run src/app/owner (preview changes)
 */

const fs = require('fs');
const path = require('path');

// ============================================
// COLOR MAPPING: Raw Tailwind → Design Tokens
// ============================================

const COLOR_MAP = {
  // BLUE → PRIMARY/INFO
  'bg-blue-600': 'bg-lydian-primary',
  'bg-blue-700': 'bg-lydian-primary-hover',
  'bg-blue-800': 'bg-lydian-primary-active',
  'bg-blue-500': 'bg-lydian-primary',
  'bg-blue-50': 'bg-lydian-primary-lighter',
  'bg-blue-100': 'bg-lydian-info-lighter',
  'bg-blue-200': 'bg-lydian-info-light',

  'text-blue-600': 'text-lydian-primary',
  'text-blue-700': 'text-lydian-primary-hover',
  'text-blue-800': 'text-lydian-info-text',
  'text-blue-900': 'text-lydian-info-text',
  'text-blue-500': 'text-lydian-primary',
  'text-blue-100': 'text-lydian-info-lighter',

  'border-blue-500': 'border-lydian-primary',
  'border-blue-600': 'border-lydian-primary',
  'border-blue-200': 'border-lydian-info-light',
  'border-blue-300': 'border-lydian-info-light',

  'hover:bg-blue-700': 'hover:bg-lydian-primary-hover',
  'hover:bg-blue-50': 'hover:bg-lydian-primary-lighter',
  'hover:bg-blue-100': 'hover:bg-lydian-info-lighter',

  'focus:ring-blue-500': 'focus:ring-lydian-primary',

  // GRAY → TEXT/BORDER/BACKGROUND
  'text-gray-900': 'text-lydian-text',
  'text-gray-800': 'text-lydian-text',
  'text-gray-700': 'text-lydian-text-secondary',
  'text-gray-600': 'text-lydian-text-secondary',
  'text-gray-500': 'text-lydian-text-muted',
  'text-gray-400': 'text-lydian-text-muted',
  'text-gray-300': 'text-lydian-text-dim',
  'text-gray-200': 'text-lydian-text-inverse-muted',

  'bg-gray-50': 'bg-lydian-bg-surface',
  'bg-gray-100': 'bg-lydian-bg-surface-raised',
  'bg-gray-200': 'bg-lydian-border',
  'bg-gray-300': 'bg-lydian-border-medium',
  'bg-gray-700': 'bg-lydian-text-secondary',
  'bg-gray-800': 'bg-lydian-text',
  'bg-gray-900': 'bg-lydian-text',

  'border-gray-100': 'border-lydian-border-light',
  'border-gray-200': 'border-lydian-border',
  'border-gray-300': 'border-lydian-border-medium',
  'border-gray-400': 'border-lydian-border-heavy',

  'hover:bg-gray-50': 'hover:bg-lydian-bg-hover',
  'hover:bg-gray-100': 'hover:bg-lydian-bg-active',

  // GREEN → SUCCESS
  'bg-green-600': 'bg-lydian-success',
  'bg-green-700': 'bg-lydian-success-hover',
  'bg-green-800': 'bg-lydian-success-active',
  'bg-green-500': 'bg-lydian-success',
  'bg-green-50': 'bg-lydian-success-lighter',
  'bg-green-100': 'bg-lydian-success-lighter',

  'text-green-600': 'text-lydian-success',
  'text-green-700': 'text-lydian-success-hover',
  'text-green-800': 'text-lydian-success-text',
  'text-green-900': 'text-lydian-success-text',

  'border-green-200': 'border-lydian-success-light',
  'border-green-500': 'border-lydian-success',

  'hover:bg-green-700': 'hover:bg-lydian-success-hover',

  // RED → ERROR/DANGER
  'bg-red-600': 'bg-lydian-error',
  'bg-red-700': 'bg-lydian-error-hover',
  'bg-red-800': 'bg-lydian-error-active',
  'bg-red-500': 'bg-lydian-error',
  'bg-red-50': 'bg-lydian-error-lighter',
  'bg-red-100': 'bg-lydian-error-lighter',

  'text-red-600': 'text-lydian-error',
  'text-red-700': 'text-lydian-error-hover',
  'text-red-800': 'text-lydian-error-text',
  'text-red-900': 'text-lydian-error-text',
  'text-red-500': 'text-lydian-error',

  'border-red-200': 'border-lydian-error-light',
  'border-red-500': 'border-lydian-error',

  'hover:bg-red-700': 'hover:bg-lydian-error-hover',
  'hover:bg-red-50': 'hover:bg-lydian-error-lighter',

  // YELLOW → WARNING
  'bg-yellow-400': 'bg-lydian-warning',
  'bg-yellow-500': 'bg-lydian-warning-hover',
  'bg-yellow-600': 'bg-lydian-warning-active',
  'bg-yellow-50': 'bg-lydian-warning-lighter',
  'bg-yellow-100': 'bg-lydian-warning-lighter',

  'text-yellow-600': 'text-lydian-warning',
  'text-yellow-700': 'text-lydian-warning-hover',
  'text-yellow-800': 'text-lydian-warning-text',
  'text-yellow-900': 'text-lydian-warning-text',

  'border-yellow-200': 'border-lydian-warning-light',

  // PURPLE → ACCENT
  'bg-purple-600': 'bg-lydian-accent-purple',
  'bg-purple-50': 'bg-lydian-accent-purple/10',
  'text-purple-600': 'text-lydian-accent-purple',
  'border-purple-500': 'border-lydian-accent-purple',

  // PINK → ACCENT
  'bg-pink-600': 'bg-lydian-accent',
  'text-pink-600': 'text-lydian-accent',

  // INDIGO → ACCENT
  'bg-indigo-500': 'bg-lydian-accent-purple',
  'bg-indigo-600': 'bg-lydian-accent-purple',
  'text-indigo-700': 'text-lydian-accent-purple',
  'text-indigo-900': 'text-lydian-accent-purple',
  'border-indigo-200': 'border-lydian-accent-purple/20',
};

// ============================================
// HEX COLOR MAPPING: Hardcoded → Design Tokens
// ============================================

const HEX_MAP = {
  // Primary brand red
  'text-\\[#FF214D\\]': 'text-lydian-primary',
  'bg-\\[#FF214D\\]': 'bg-lydian-primary',
  'border-\\[#FF214D\\]': 'border-lydian-primary',

  // Hover red
  'text-\\[#FF6A45\\]': 'text-lydian-primary-hover',
  'bg-\\[#FF6A45\\]': 'bg-lydian-primary-hover',

  // Cyan accent
  'text-\\[#00BAFF\\]': 'text-lydian-accent-cyan',
  'bg-\\[#00BAFF\\]': 'bg-lydian-accent-cyan',
  'border-\\[#00BAFF\\]': 'border-lydian-accent-cyan',

  // Purple accent
  'text-\\[#667EEA\\]': 'text-lydian-accent-purple',
  'bg-\\[#667EEA\\]': 'bg-lydian-accent-purple',
  'border-\\[#667EEA\\]': 'border-lydian-accent-purple',

  // Pink accent
  'text-\\[#EC4899\\]': 'text-lydian-accent',
  'bg-\\[#EC4899\\]': 'bg-lydian-accent',

  // Orange accent
  'text-\\[#FF9500\\]': 'text-lydian-accent-amber',
  'bg-\\[#FF9500\\]': 'bg-lydian-accent-amber',

  // Neutral colors
  'bg-\\[#F1F5F9\\]': 'bg-lydian-bg-surface',
  'bg-\\[#1a0b2e\\]': 'bg-lydian-text',
};

// ============================================
// FILE PROCESSING
// ============================================

let totalChanges = 0;
let filesChanged = 0;
let dryRun = false;

function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileChanges = 0;

    // Replace raw Tailwind colors
    Object.entries(COLOR_MAP).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
      const matches = content.match(regex);
      if (matches) {
        fileChanges += matches.length;
        content = content.replace(regex, newColor);
      }
    });

    // Replace hex colors
    Object.entries(HEX_MAP).forEach(([oldHex, newColor]) => {
      const regex = new RegExp(oldHex, 'g');
      const matches = content.match(regex);
      if (matches) {
        fileChanges += matches.length;
        content = content.replace(regex, newColor);
      }
    });

    if (fileChanges > 0) {
      if (!dryRun) {
        fs.writeFileSync(filePath, content);
      }

      const relPath = filePath.replace(process.cwd(), '');
      console.log(`${dryRun ? '📋' : '✅'} ${relPath}: ${fileChanges} changes`);

      totalChanges += fileChanges;
      filesChanged++;
    }

    return fileChanges;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!item.startsWith('.') && item !== 'node_modules') {
        processDirectory(fullPath);
      }
    } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx')) {
      migrateFile(fullPath);
    }
  }
}

// ============================================
// MAIN EXECUTION
// ============================================

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--dry-run')) {
    dryRun = true;
    args.splice(args.indexOf('--dry-run'), 1);
  }

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║         DESIGN TOKEN MIGRATION SCRIPT                         ║
╚═══════════════════════════════════════════════════════════════╝

Usage:
  node scripts/migrate-design-tokens.js <path> [--dry-run]

Examples:
  node scripts/migrate-design-tokens.js src/app/owner
  node scripts/migrate-design-tokens.js --all
  node scripts/migrate-design-tokens.js src/components --dry-run

Options:
  --all       Migrate entire src/ directory
  --dry-run   Preview changes without modifying files
  --help      Show this help message

What it does:
  • Replaces bg-blue-600 → bg-lydian-primary
  • Replaces text-gray-400 → text-lydian-text-muted
  • Replaces text-[#FF214D] → text-lydian-primary
  • And 100+ more design token migrations
    `);
    process.exit(0);
  }

  let targetPath;
  if (args.includes('--all')) {
    targetPath = path.join(process.cwd(), 'src');
  } else {
    targetPath = path.join(process.cwd(), args[0]);
  }

  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Error: Path does not exist: ${targetPath}`);
    process.exit(1);
  }

  console.log(`\n🔍 ${dryRun ? 'DRY RUN:' : 'MIGRATING:'} ${targetPath}\n`);
  console.log('─'.repeat(70));

  const startTime = Date.now();

  if (fs.statSync(targetPath).isDirectory()) {
    processDirectory(targetPath);
  } else {
    migrateFile(targetPath);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('─'.repeat(70));
  console.log(`\n${dryRun ? '📊' : '✨'} Migration ${dryRun ? 'Preview' : 'Complete'}!`);
  console.log(`   Files ${dryRun ? 'to change' : 'changed'}: ${filesChanged}`);
  console.log(`   Total replacements: ${totalChanges}`);
  console.log(`   Time: ${duration}s`);

  if (dryRun) {
    console.log(`\n💡 Run without --dry-run to apply changes\n`);
  } else {
    console.log(`\n✅ Design tokens migrated successfully!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review changes: git diff`);
    console.log(`   2. Test in browser`);
    console.log(`   3. Commit: git commit -m "Migrate to design tokens"\n`);
  }
}

main();
