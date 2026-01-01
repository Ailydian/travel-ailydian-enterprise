#!/usr/bin/env node

/**
 * Fix common syntax errors introduced by automated refactoring
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

let fixCount = 0;

// Find all TS/TSX files
const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
});

console.log(`\nFixing syntax errors in ${files.length} files...\n`);

files.forEach((file) => {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;

  // Fix 1: import {\nimport { useToast } → import { useToast }\nimport {
  content = content.replace(/import \{\nimport \{ useToast \} from/g, 'import { useToast } from');

  // Fix 2: Remove duplicate "import {" lines
  content = content.replace(/import \{[\s\n]+import \{/g, 'import {');

  // Fix 3: Fix malformed import statements with "import {\nimport"
  content = content.replace(/import \{[\s\n]+import/g, 'import');

  // Fix 4: Fix string literals with incorrect quotes like '(Demo mode')'
  content = content.replace(/'([^']*?)'(\)|,)/g, "'$1'$2");
  content = content.replace(/'([^']*?)'\)''/g, "'$1')'");

  // Fix 5: Fix unquoted Turkish strings in showToast
  content = content.replace(/showToast\(\{ type: '[^']+', title: ([A-ZĞÜŞİÖÇğüşıöç][^}]+) \}\)/g, (match, p1) => {
    // If the string is not already quoted
    if (!p1.startsWith("'") && !p1.startsWith('"')) {
      return match.replace(p1, `'${p1.trim()}'`);
    }
    return match;
  });

  // Fix 6: Fix specific patterns like "title: Mülk başarıyla" → "title: 'Mülk başarıyla'"
  content = content.replace(/title: ([A-ZĞÜŞİÖÇğüşıöç][^,}'"]+)([,}])/g, "title: '$1'$2");

  // Fix 7: Fix broken lucide-react imports with newlines in weird places
  content = content.replace(/} from\n'lucide-react'/g, "} from 'lucide-react'");

  // Fix 8: Fix ToastContext import paths (pages/admin/* should use ../../context)
  if (file.includes('pages/admin/') && !file.includes('pages/admin/v2/')) {
    content = content.replace(
      /import \{ useToast \} from ['"]\.\.\/context\/ToastContext['"]/g,
      "import { useToast } from '../../context/ToastContext'"
    );
  }

  // Fix 9: Fix ToastContext import paths (pages/admin/v2/* should use ../../../context)
  if (file.includes('pages/admin/v2/')) {
    content = content.replace(
      /import \{ useToast \} from ['"]\.\.\/\.\.\/context\/ToastContext['"]/g,
      "import { useToast } from '../../../context/ToastContext'"
    );
  }

  // Fix 10: Fix ToastContext import without path (should have ../context)
  content = content.replace(
    /import \{ useToast \} from ['"]context\/ToastContext['"]/g,
    "import { useToast } from '../context/ToastContext'"
  );

  // Fix 11: Fix quote mismatch in strings
  content = content.replace(/'([^']*?)'(\s*\))\s*'\s*\)/g, "'$1')");

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Fixed: ${file}`);
    fixCount++;
  }
});

console.log(`\n✓ Fixed ${fixCount} files\n`);
