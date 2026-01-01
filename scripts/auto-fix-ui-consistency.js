/**
 * Automated UI Consistency Fixer
 * Fixes hardcoded colors and applies design tokens across entire codebase
 * AILYDIAN Orchestrator - Elite Frontend Agent
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Design Token Mapping (516 hex colors + 4,607 raw Tailwind)
const COLOR_REPLACEMENTS = [
  // CRITICAL: Hardcoded Hex Colors → Design Tokens (516 instances)
  { from: /text-\[#FF214D\]/g, to: 'text-lydian-primary' },
  { from: /bg-\[#FF214D\]/g, to: 'bg-lydian-primary' },
  { from: /border-\[#FF214D\]/g, to: 'border-lydian-primary' },
  { from: /text-\[#DC2626\]/g, to: 'text-lydian-primary' },
  { from: /bg-\[#DC2626\]/g, to: 'bg-lydian-primary' },
  
  // PRIMARY BRAND COLORS (Red, not blue!)
  { from: /\bbg-blue-600\b/g, to: 'bg-lydian-primary' },
  { from: /\bbg-blue-700\b/g, to: 'bg-lydian-primary-hover' },
  { from: /\bbg-blue-800\b/g, to: 'bg-lydian-primary-active' },
  { from: /\btext-blue-600\b/g, to: 'text-lydian-primary' },
  { from: /\btext-blue-700\b/g, to: 'text-lydian-primary-hover' },
  { from: /\bborder-blue-500\b/g, to: 'border-lydian-primary' },
  { from: /\bring-blue-500\b/g, to: 'ring-lydian-primary' },
  
  // TEXT COLORS (Most violations - 4,607 total)
  { from: /\btext-gray-900\b/g, to: 'text-lydian-text' },
  { from: /\btext-gray-800\b/g, to: 'text-lydian-text' },
  { from: /\btext-gray-700\b/g, to: 'text-lydian-text-secondary' },
  { from: /\btext-gray-600\b/g, to: 'text-lydian-text-secondary' },
  { from: /\btext-gray-500\b/g, to: 'text-lydian-text-muted' },
  { from: /\btext-gray-400\b/g, to: 'text-lydian-text-muted' },
  { from: /\btext-gray-300\b/g, to: 'text-lydian-text-dim' },
  
  // BACKGROUND COLORS
  { from: /\bbg-white\b/g, to: 'bg-lydian-bg' },
  { from: /\bbg-gray-50\b/g, to: 'bg-lydian-bg-surface' },
  { from: /\bbg-gray-100\b/g, to: 'bg-lydian-bg-surface-raised' },
  { from: /\bbg-gray-200\b/g, to: 'bg-lydian-bg-surface-raised' },
  
  // BORDER COLORS
  { from: /\bborder-gray-200\b/g, to: 'border-lydian-border' },
  { from: /\bborder-gray-300\b/g, to: 'border-lydian-border-medium' },
  
  // SEMANTIC COLORS
  { from: /\bbg-green-600\b/g, to: 'bg-lydian-success' },
  { from: /\bbg-green-700\b/g, to: 'bg-lydian-success-hover' },
  { from: /\btext-green-600\b/g, to: 'text-lydian-success' },
  
  { from: /\bbg-red-600\b/g, to: 'bg-lydian-error' },
  { from: /\bbg-red-700\b/g, to: 'bg-lydian-error-hover' },
  { from: /\btext-red-600\b/g, to: 'text-lydian-error' },
  
  { from: /\bbg-yellow-400\b/g, to: 'bg-lydian-warning' },
  { from: /\bbg-yellow-500\b/g, to: 'bg-lydian-warning-hover' },
  { from: /\btext-yellow-600\b/g, to: 'text-lydian-warning' },
];

// Priority files (fix these first)
const PRIORITY_PATTERNS = [
  'src/pages/bookings.tsx',
  'src/app/owner/**/*.tsx',
  'src/pages/booking-confirmed.tsx',
  'src/components/owner/**/*.tsx',
];

let filesProcessed = 0;
let totalReplacements = 0;

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let replacements = 0;
    const originalContent = content;
    
    // Apply all color replacements
    COLOR_REPLACEMENTS.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        replacements += matches.length;
        content = content.replace(from, to);
      }
    });
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesProcessed++;
      totalReplacements += replacements;
      console.log(`✅ Fixed ${replacements} violations in ${path.relative(process.cwd(), filePath)}`);
      return replacements;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Main execution
console.log('🚀 AILYDIAN UI Consistency Auto-Fixer');
console.log('=====================================\n');

// Phase 1: Priority files
console.log('📊 Phase 1: Priority Files (Owner Dashboard, Bookings)');
PRIORITY_PATTERNS.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: process.cwd() });
  files.forEach(fixFile);
});

// Phase 2: All other TSX/JSX files
console.log('\n📊 Phase 2: Remaining Frontend Files');
const allFiles = glob.sync('src/**/*.{tsx,jsx}', { 
  cwd: process.cwd(),
  ignore: ['**/node_modules/**', '**/.next/**']
});

allFiles.forEach(fixFile);

// Summary
console.log('\n=====================================');
console.log('✅ AUTO-FIX COMPLETE!');
console.log(`📁 Files Processed: ${filesProcessed}`);
console.log(`🎨 Color Violations Fixed: ${totalReplacements}`);
console.log('=====================================\n');

if (totalReplacements > 0) {
  console.log('🎉 SUCCESS! Design token migration completed.');
  console.log('💡 Next: Run build to verify no errors.');
} else {
  console.log('ℹ️  No violations found. Codebase already compliant!');
}
