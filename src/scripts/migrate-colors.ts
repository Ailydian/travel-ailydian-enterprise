#!/usr/bin/env node
import { logger } from '../lib/logger/winston';
/**
 * 🤖 Automated Design System Migration Script
 *
 * Transforms raw Tailwind color classes to Lydian design tokens using AST manipulation.
 *
 * Phase 6 of Design System Sprint
 *
 * @usage
 * Single file:  npx ts-node src/scripts/migrate-colors.ts src/pages/tours.tsx
 * Batch mode:   npx ts-node src/scripts/migrate-colors.ts --batch
 *
 * @see /src/scripts/color-mapping.ts - Color mapping definitions
 * @see /DESIGN_SYSTEM.md - Design system documentation
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { glob } from 'glob';
import { COLOR_MAPPING, OPACITY_PATTERNS, replaceColors, getMappingStats } from './color-mapping';

// ============================================
// CONFIGURATION
// ============================================

interface MigrationConfig {
  batchMode: boolean;
  dryRun: boolean;
  verbose: boolean;
  filePatterns: string[];
  excludePatterns: string[];
}

const DEFAULT_CONFIG: MigrationConfig = {
  batchMode: false,
  dryRun: false,
  verbose: true,
  filePatterns: [
    'src/pages/**/*.tsx',
    'src/pages/**/*.ts',
    'src/components/**/*.tsx',
    'src/components/**/*.ts',
  ],
  excludePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/build/**',
    'src/design-system/**', // Don't modify design system files
    'src/scripts/**', // Don't modify scripts
  ],
};

// ============================================
// STATISTICS TRACKING
// ============================================

interface MigrationStats {
  filesProcessed: number;
  filesModified: number;
  totalReplacements: number;
  replacementsByType: Record<string, number>;
  errors: Array<{ file: string; error: string }>;
}

const stats: MigrationStats = {
  filesProcessed: 0,
  filesModified: 0,
  totalReplacements: 0,
  replacementsByType: {},
  errors: [],
};

// ============================================
// CORE TRANSFORMATION LOGIC
// ============================================

/**
 * Transform className strings by replacing raw colors with tokens
 */
function transformClassNameValue(value: string): { transformed: string; changed: boolean } {
  const original = value;
  const transformed = replaceColors(value);

  return {
    transformed,
    changed: original !== transformed,
  };
}

/**
 * Transform a single file's AST
 */
function transformFile(filePath: string, config: MigrationConfig): { code: string; modified: boolean } {
  const sourceCode = fs.readFileSync(filePath, 'utf-8');

  let fileModified = false;
  let replacementsInFile = 0;

  try {
    // Parse the file into an AST
    const ast = parse(sourceCode, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    // Traverse and transform className attributes
    traverse(ast, {
      JSXAttribute(path) {
        // Only process className attributes
        if (t.isJSXIdentifier(path.node.name) && path.node.name.name === 'className') {
          const value = path.node.value;

          // Handle string literals: className="text-gray-900"
          if (t.isStringLiteral(value)) {
            const { transformed, changed } = transformClassNameValue(value.value);

            if (changed) {
              path.node.value = t.stringLiteral(transformed);
              fileModified = true;
              replacementsInFile++;

              // Track by type
              const classNames = value.value.split(/\s+/);
              classNames.forEach(cls => {
                if (COLOR_MAPPING[cls]) {
                  const type = cls.split('-')[0]; // 'text', 'bg', 'border', etc.
                  stats.replacementsByType[type] = (stats.replacementsByType[type] || 0) + 1;
                }
              });
            }
          }

          // Handle template literals: className={`text-gray-900 ${foo}`}
          else if (t.isJSXExpressionContainer(value)) {
            const expression = value.expression;

            if (t.isTemplateLiteral(expression)) {
              let templateModified = false;

              expression.quasis.forEach((quasi) => {
                const { transformed, changed } = transformClassNameValue(quasi.value.raw);

                if (changed) {
                  quasi.value.raw = transformed;
                  quasi.value.cooked = transformed;
                  templateModified = true;
                  fileModified = true;
                  replacementsInFile++;
                }
              });
            }
          }
        }
      },
    });

    // Generate transformed code
    const output = generate(ast, {
      retainLines: true,
      comments: true,
    }, sourceCode);

    if (config.verbose && fileModified) {
      logger.info(`  ✅ ${path.basename(filePath)}: ${replacementsInFile} replacements`);
    }

    stats.totalReplacements += replacementsInFile;

    return {
      code: output.code,
      modified: fileModified,
    };

  } catch (error) {
    stats.errors.push({
      file: filePath,
      error: error instanceof Error ? error.message : String(error),
    });

    logger.error(`  ❌ Error processing ${filePath}:`, error);

    return {
      code: sourceCode,
      modified: false,
    };
  }
}

// ============================================
// FILE PROCESSING
// ============================================

/**
 * Process a single file
 */
function processFile(filePath: string, config: MigrationConfig): void {
  stats.filesProcessed++;

  if (config.verbose) {
    logger.info(`\n📄 Processing: ${filePath}`);
  }

  const { code, modified } = transformFile(filePath, config);

  if (modified) {
    stats.filesModified++;

    if (!config.dryRun) {
      fs.writeFileSync(filePath, code, 'utf-8');
      if (config.verbose) {
        logger.info(`  💾 Saved: ${filePath}`);
      }
    } else {
      logger.info(`  🔍 [DRY RUN] Would modify: ${filePath}`);
    }
  } else {
    if (config.verbose) {
      logger.info(`  ⏭️  No changes needed`);
    }
  }
}

/**
 * Process files in batch mode
 */
async function processBatch(config: MigrationConfig): Promise<void> {
  logger.info('🚀 Starting batch migration...\n');
  logger.info('📋 File patterns:', config.filePatterns);
  logger.info('🚫 Exclude patterns:', config.excludePatterns);
  logger.info('');

  const files: string[] = [];

  // Collect all matching files
  for (const pattern of config.filePatterns) {
    const matches = await glob(pattern, {
      ignore: config.excludePatterns,
      cwd: process.cwd(),
    });
    files.push(...matches);
  }

  logger.info(`📊 Found ${files.length} files to process\n`);

  // Process each file
  for (const file of files) {
    processFile(file, config);
  }
}

// ============================================
// REPORTING
// ============================================

/**
 * Print final statistics
 */
function printStats(config: MigrationConfig): void {
  logger.info('\n' + '='.repeat(60));
  logger.info('📊 MIGRATION STATISTICS');
  logger.info('='.repeat(60) + '\n');

  logger.info(`Files Processed:    ${stats.filesProcessed}`);
  logger.info(`Files Modified:     ${stats.filesModified}`);
  logger.info(`Total Replacements: ${stats.totalReplacements}`);

  if (config.dryRun) {
    logger.info('\n⚠️  DRY RUN MODE - No files were actually modified');
  }

  logger.info('\n📈 Replacements by Type:');
  Object.entries(stats.replacementsByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      logger.info(`  ${type.padEnd(15)} ${count}`);
    });

  if (stats.errors.length > 0) {
    logger.info('\n❌ Errors:');
    stats.errors.forEach(({ file, error }) => {
      logger.info(`  ${file}`);
      logger.info(`    ${error}`);
    });
  }

  logger.info('\n' + '='.repeat(60));
}

/**
 * Print color mapping stats
 */
function printMappingStats(): void {
  const mappingStats = getMappingStats();

  logger.info('\n📚 Available Mappings:');
  logger.info(`  Total mappings:     ${mappingStats.totalMappings}`);
  logger.info(`  Opacity patterns:   ${mappingStats.opacityPatterns}`);
  logger.info('\n  By category:');
  Object.entries(mappingStats.categories).forEach(([category, count]) => {
    logger.info(`    ${category.padEnd(15)} ${count}`);
  });
}

// ============================================
// CLI INTERFACE
// ============================================

function printUsage(): void {
  logger.info(`
🎨 Lydian Design System - Automated Color Migration Tool

USAGE:
  Single file:   npx ts-node src/scripts/migrate-colors.ts <file-path>
  Batch mode:    npx ts-node src/scripts/migrate-colors.ts --batch
  Dry run:       npx ts-node src/scripts/migrate-colors.ts --batch --dry-run

OPTIONS:
  --batch        Process all files matching patterns
  --dry-run      Preview changes without modifying files
  --quiet        Minimal output
  --help         Show this help message

EXAMPLES:
  # Test on single file
  npx ts-node src/scripts/migrate-colors.ts src/pages/tours.tsx

  # Preview batch migration
  npx ts-node src/scripts/migrate-colors.ts --batch --dry-run

  # Execute batch migration
  npx ts-node src/scripts/migrate-colors.ts --batch

SAFETY:
  - Always commit your changes before running
  - Use --dry-run first to preview changes
  - Review git diff after migration
  - Run "npm run build" to verify no errors
`);
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Parse arguments
  const config: MigrationConfig = { ...DEFAULT_CONFIG };

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }

  if (args.includes('--batch')) {
    config.batchMode = true;
  }

  if (args.includes('--dry-run')) {
    config.dryRun = true;
  }

  if (args.includes('--quiet')) {
    config.verbose = false;
  }

  // Print header
  logger.info('\n' + '='.repeat(60));
  logger.info('🎨 LYDIAN DESIGN SYSTEM - AUTOMATED MIGRATION');
  logger.info('='.repeat(60));

  printMappingStats();

  logger.info('\n' + '='.repeat(60) + '\n');

  // Execute
  if (config.batchMode) {
    await processBatch(config);
  } else {
    // Single file mode
    const filePath = args.find(arg => !arg.startsWith('--'));

    if (!filePath) {
      logger.error('❌ Error: No file specified\n');
      printUsage();
      process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
      logger.error(`❌ Error: File not found: ${filePath}`);
      process.exit(1);
    }

    processFile(filePath, config);
  }

  // Print final stats
  printStats(config);

  // Exit with error code if there were errors
  if (stats.errors.length > 0) {
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    logger.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { transformFile, processFile, processBatch };
