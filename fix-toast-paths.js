/**
 * Fix ToastContext import paths across all files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx', { absolute: true });

let fixed = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Calculate correct relative path
  const fileDir = path.dirname(file);
  const targetFile = path.join(process.cwd(), 'src/context/ToastContext.tsx');
  const relativePath = path.relative(fileDir, targetFile).replace(/\\/g, '/').replace('.tsx', '');

  // Fix the import
  const newContent = content.replace(
    /from ['"].*context\/ToastContext['"]/g,
    `from '${relativePath}'`
  );

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    fixed++;
  }
});

console.log(`✅ Fixed ToastContext paths in ${fixed} files`);
