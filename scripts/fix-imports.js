#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/.next/**']
});

let fixCount = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;

  // Fix pattern: import { useToast } from '...'; \n  ArrowLeft, Plus, ...
  content = content.replace(
    /(import \{ useToast \} from ['"][^'"]+['"];)\n\s+([A-Z][a-zA-Z0-9, ]+,?\s*)+\} from 'lucide-react';/g,
    (match, p1) => {
      // Extract the icons list
      const iconsMatch = match.match(/;)\n\s+(.+)\} from 'lucide-react';/s);
      if (iconsMatch) {
        const icons = iconsMatch[1].trim();
        return `${p1}\nimport {\n  ${icons}} from 'lucide-react';`;
      }
      return match;
    }
  );

  // Fix pattern where import { is missing before icons
  content = content.replace(
    /(import \{ useToast \} from ['"][^'"]+['"];)\n(\s+)([A-Z][a-zA-Z0-9,\s\n]+\} from 'lucide-react';)/,
    '$1\nimport {\n$2$3'
  );

  // Fix destinations import path
  content = content.replace(
    /import \{ useToast \} from ['"]\.\.\/context\/ToastContext['"]/g,
    "import { useToast } from '../context/ToastContext'"
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✓ Fixed: ${file}`);
    fixCount++;
  }
});

console.log(`\n✓ Fixed ${fixCount} files`);
