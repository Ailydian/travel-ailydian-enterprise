#!/usr/bin/env ts-node

/**
 * Automated Console.log Replacement Script
 *
 * Replaces all console.log, console.error, console.warn statements
 * with proper logger calls from winston logger
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface ReplacementStats {
  filesProcessed: number;
  filesModified: number;
  consoleLogReplaced: number;
  consoleErrorReplaced: number;
  consoleWarnReplaced: number;
  consoleInfoReplaced: number;
  consoleDebugReplaced: number;
  errors: Map<string, string>;
}

const stats: ReplacementStats = {
  filesProcessed: 0,
  filesModified: 0,
  consoleLogReplaced: 0,
  consoleErrorReplaced: 0,
  consoleWarnReplaced: 0,
  consoleInfoReplaced: 0,
  consoleDebugReplaced: 0,
  errors: new Map(),
};

/**
 * Check if logger import exists in file
 */
function hasLoggerImport(content: string): boolean {
  return (
    content.includes("from '@/lib/logger/winston'") ||
    content.includes('from "../lib/logger/winston"') ||
    content.includes('from "../../lib/logger/winston"') ||
    content.includes('from "../../../lib/logger/winston"') ||
    content.includes('from "../../../../lib/logger/winston"')
  );
}

/**
 * Add logger import to file
 */
function addLoggerImport(content: string, filePath: string): string {
  // Skip if already has import
  if (hasLoggerImport(content)) {
    return content;
  }

  // Determine the correct import path
  const srcDir = path.join(process.cwd(), 'src');
  const relativePath = path.relative(path.dirname(filePath), srcDir);
  const importPath = path.join(relativePath, 'lib/logger/winston').replace(/\\/g, '/');

  // Add import at the top after other imports
  const lines = content.split('\n');
  let insertIndex = 0;

  // Find last import statement
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^import\s+/) || lines[i].match(/^\/\//)) {
      insertIndex = i + 1;
    } else if (lines[i].trim() !== '') {
      break;
    }
  }

  const loggerImport = `import { logger } from '${importPath.startsWith('.') ? importPath : './' + importPath}';`;
  lines.splice(insertIndex, 0, loggerImport);

  return lines.join('\n');
}

/**
 * Replace console statements with logger calls
 */
function replaceConsoleCalls(content: string, filePath: string): string {
  let modified = content;
  let hasChanges = false;

  // Pattern to match console.log/error/warn/info/debug calls
  const patterns = [
    {
      regex: /console\.log\(/g,
      replacement: 'logger.info(',
      stat: 'consoleLogReplaced',
    },
    {
      regex: /console\.error\(/g,
      replacement: 'logger.error(',
      stat: 'consoleErrorReplaced',
    },
    {
      regex: /console\.warn\(/g,
      replacement: 'logger.warn(',
      stat: 'consoleWarnReplaced',
    },
    {
      regex: /console\.info\(/g,
      replacement: 'logger.info(',
      stat: 'consoleInfoReplaced',
    },
    {
      regex: /console\.debug\(/g,
      replacement: 'logger.debug(',
      stat: 'consoleDebugReplaced',
    },
  ];

  for (const pattern of patterns) {
    const matches = modified.match(pattern.regex);
    if (matches) {
      modified = modified.replace(pattern.regex, pattern.replacement);
      const key = pattern.stat as keyof Omit<ReplacementStats, 'errors'>;
      (stats[key] as number) += matches.length;
      hasChanges = true;
    }
  }

  if (hasChanges) {
    modified = addLoggerImport(modified, filePath);
    stats.filesModified++;
  }

  return modified;
}

/**
 * Process a single file
 */
async function processFile(filePath: string, dryRun: boolean): Promise<void> {
  try {
    stats.filesProcessed++;

    const content = fs.readFileSync(filePath, 'utf-8');
    const modified = replaceConsoleCalls(content, filePath);

    if (content !== modified) {
      if (!dryRun) {
        fs.writeFileSync(filePath, modified, 'utf-8');
        console.log(`✅ Modified: ${filePath}`);
      } else {
        console.log(`🔍 [DRY RUN] Would modify: ${filePath}`);
      }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    stats.errors.set(filePath, errorMsg);
    console.error(`❌ Error processing ${filePath}:`, errorMsg);
  }
}

/**
 * Get files to process
 */
async function getFilesToProcess(): Promise<string[]> {
  const patterns = [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.js',
    'src/**/*.jsx',
  ];

  const excludePatterns = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**',
    '**/logger/**', // Don't modify logger files themselves
  ];

  const files: string[] = [];

  for (const pattern of patterns) {
    const matches = await glob(pattern, {
      cwd: process.cwd(),
      ignore: excludePatterns,
      absolute: true,
    });
    files.push(...matches);
  }

  return [...new Set(files)];
}

/**
 * Print statistics
 */
function printStats(dryRun: boolean): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 REPLACEMENT STATISTICS');
  console.log('='.repeat(60) + '\n');

  console.log(`Files Processed:         ${stats.filesProcessed}`);
  console.log(`Files Modified:          ${stats.filesModified}`);
  console.log(`console.log → logger.info:    ${stats.consoleLogReplaced}`);
  console.log(`console.error → logger.error: ${stats.consoleErrorReplaced}`);
  console.log(`console.warn → logger.warn:   ${stats.consoleWarnReplaced}`);
  console.log(`console.info → logger.info:   ${stats.consoleInfoReplaced}`);
  console.log(`console.debug → logger.debug: ${stats.consoleDebugReplaced}`);

  const total =
    stats.consoleLogReplaced +
    stats.consoleErrorReplaced +
    stats.consoleWarnReplaced +
    stats.consoleInfoReplaced +
    stats.consoleDebugReplaced;

  console.log(`\nTotal Replacements:      ${total}`);

  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files were actually modified');
  }

  if (stats.errors.size > 0) {
    console.log('\n❌ Errors:');
    for (const [file, error] of stats.errors.entries()) {
      console.log(`  ${file}`);
      console.log(`    ${error}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('\n' + '='.repeat(60));
  console.log('🔄 CONSOLE.LOG REPLACEMENT TOOL');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files will be modified\n');
  } else {
    console.log('\n⚠️  LIVE MODE - Files will be modified\n');
  }

  console.log('🔍 Searching for files...\n');

  const files = await getFilesToProcess();
  console.log(`📊 Found ${files.length} files to process\n`);

  for (const file of files) {
    await processFile(file, dryRun);
  }

  printStats(dryRun);

  if (dryRun) {
    console.log('\n💡 Run without --dry-run to apply changes');
  } else {
    console.log('\n✅ Replacement complete!');
  }
}

// Run
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
