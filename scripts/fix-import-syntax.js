#!/usr/bin/env node
/**
 * Fix lucide-react import syntax errors
 * Converts multi-line imports to properly formatted imports
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/admin/v2/settings.tsx',
  'src/pages/booking-confirmed.tsx',
  'src/pages/bookings.tsx',
];

function fixImports(filePath) {
  console.log(`\n📝 Fixing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix lucide-react imports - ensure each icon is on its own line
  content = content.replace(
    /import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/g,
    (match, imports) => {
      // Split by comma and clean up
      const icons = imports
        .split(',')
        .map(icon => icon.trim())
        .filter(Boolean);

      // Format each icon on its own line
      const formatted = icons.map(icon => `  ${icon}`).join(',\n');

      return `import {\n${formatted}\n} from 'lucide-react'`;
    }
  );

  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Fixed lucide-react imports`);
}

// Fix ToastContext path issue in destinations/[slug].tsx
function fixToastContextPath() {
  const filePath = 'src/pages/destinations/[slug].tsx';
  console.log(`\n📝 Fixing: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix path based on file location
  content = content.replace(
    /from\s+['"]\.\.\/context\/ToastContext['"]/g,
    `from '../../context/ToastContext'`
  );

  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Fixed ToastContext import path`);
}

console.log('🚀 Fixing import syntax errors...\n');

filesToFix.forEach(file => {
  try {
    fixImports(file);
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

fixToastContextPath();

console.log('\n✅ Import fixes complete!\n');
