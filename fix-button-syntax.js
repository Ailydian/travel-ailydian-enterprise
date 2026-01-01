/**
 * 🔧 AILYDIAN Button → FuturisticButton Auto-Fix Script
 * Production-grade syntax fixer for JSX components
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  rootDir: process.cwd(),
  extensions: ['.tsx', '.jsx'],
  excludeDirs: ['node_modules', '.next', 'dist', 'build'],
  dryRun: process.argv.includes('--dry-run'),
};

/**
 * Fix Button → FuturisticButton mismatches in JSX
 */
function fixButtonSyntax(content) {
  let fixed = content;
  let changes = 0;

  // Pattern 1: <Button ... > ... </FuturisticButton>
  // Replace opening <Button with <FuturisticButton
  const pattern1 = /<Button\s+([\s\S]*?)>/g;
  const matches = [...content.matchAll(pattern1)];

  matches.forEach(match => {
    const fullMatch = match[0];
    const props = match[1];

    // Find corresponding closing tag
    const startPos = match.index;
    const openingTag = fullMatch;

    // Check if there's a </FuturisticButton> after this
    const afterContent = content.substring(startPos);
    const closingPattern = /<\/FuturisticButton>/;

    if (closingPattern.test(afterContent)) {
      // Found mismatch - need to fix opening tag
      const replacement = `<FuturisticButton ${props}>`;
      fixed = fixed.replace(fullMatch, replacement);
      changes++;
    }
  });

  return { content: fixed, changes };
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const result = fixButtonSyntax(content);

    if (result.changes > 0) {
      console.log(`✅ ${filePath}: ${result.changes} fix(es)`);

      if (!config.dryRun) {
        fs.writeFileSync(filePath, result.content, 'utf8');
      }

      return result.changes;
    }

    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 AILYDIAN Button Syntax Fixer\n');

  if (config.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Find all TSX/JSX files
  const patterns = config.extensions.map(ext => `**/*${ext}`);
  const excludePatterns = config.excludeDirs.map(dir => `**/${dir}/**`);

  let allFiles = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, {
      cwd: config.rootDir,
      ignore: excludePatterns,
      absolute: true,
    });
    allFiles = allFiles.concat(files);
  });

  console.log(`📁 Found ${allFiles.length} files to check\n`);

  let totalChanges = 0;
  let filesChanged = 0;

  allFiles.forEach(file => {
    const changes = processFile(file);
    if (changes > 0) {
      totalChanges += changes;
      filesChanged++;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Complete!`);
  console.log(`📊 Files changed: ${filesChanged}`);
  console.log(`🔧 Total fixes: ${totalChanges}`);

  if (config.dryRun) {
    console.log('\n⚠️  This was a dry run. Use without --dry-run to apply changes.');
  }
}

// Execute
main();
