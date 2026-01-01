#!/usr/bin/env node
/**
 * UI/UX CONSISTENCY ANALYZER
 * Scans entire codebase for design system violations
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const BASE_DIR = '/Users/sardag/Desktop/PROJELER/travel.ailydian.com/src';

// Design System Tokens (from src/design-system/tokens.ts)
const APPROVED_COLORS = [
  // Lydian tokens (approved)
  'lydian-primary', 'lydian-secondary', 'lydian-accent',
  'lydian-success', 'lydian-warning', 'lydian-error', 'lydian-info',
  'lydian-text', 'lydian-bg', 'lydian-border',

  // Allowed raw colors (backwards compatibility - should be migrated)
  'primary-', 'secondary-', 'success-', 'warning-', 'error-', 'neutral-',
];

const VIOLATIONS = {
  colors: [],
  typography: [],
  spacing: [],
  hardcoded: [],
  buttons: [],
  cards: []
};

const STATS = {
  totalFiles: 0,
  scannedFiles: 0,
  violations: 0
};

/**
 * Scan file for design violations
 */
async function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = filePath.replace(BASE_DIR, 'src');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // RAW TAILWIND COLOR VIOLATIONS
      const rawColorPatterns = [
        /\b(text|bg|border)-gray-\d+/g,
        /\b(text|bg|border)-blue-\d+/g,
        /\b(text|bg|border)-red-\d+/g,
        /\b(text|bg|border)-green-\d+/g,
        /\b(text|bg|border)-yellow-\d+/g,
        /\b(text|bg|border)-purple-\d+/g,
        /\b(text|bg|border)-pink-\d+/g,
        /\b(text|bg|border)-indigo-\d+/g,
      ];

      rawColorPatterns.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(match => {
            VIOLATIONS.colors.push({
              file: relativePath,
              line: lineNum,
              code: line.trim(),
              issue: `Raw Tailwind color: ${match}`,
              severity: 'HIGH',
              fix: `Replace with design token (e.g., lydian-primary, lydian-text, lydian-bg-surface)`
            });
            STATS.violations++;
          });
        }
      });

      // HARDCODED HEX COLORS
      const hexColorPattern = /(text|bg|border)-\[#[0-9A-Fa-f]{6}\]/g;
      const hexMatches = line.match(hexColorPattern);
      if (hexMatches) {
        hexMatches.forEach(match => {
          VIOLATIONS.hardcoded.push({
            file: relativePath,
            line: lineNum,
            code: line.trim(),
            issue: `Hardcoded hex color: ${match}`,
            severity: 'CRITICAL',
            fix: `Replace with design token from src/design-system/tokens.ts`
          });
          STATS.violations++;
        });
      }

      // INLINE STYLE COLORS
      const inlineColorPattern = /style=\{\{.*?(color|backgroundColor):\s*['"]#[0-9A-Fa-f]{6}['"]/g;
      const inlineMatches = line.match(inlineColorPattern);
      if (inlineMatches) {
        inlineMatches.forEach(match => {
          VIOLATIONS.hardcoded.push({
            file: relativePath,
            line: lineNum,
            code: line.trim(),
            issue: `Inline style with hex color: ${match}`,
            severity: 'CRITICAL',
            fix: `Use Tailwind classes with design tokens instead`
          });
          STATS.violations++;
        });
      }

      // TYPOGRAPHY INCONSISTENCIES
      // Check for font-inter, font-sans when Inter is already default
      if (line.match(/\bfont-inter\b/) && !line.includes('font-mono')) {
        VIOLATIONS.typography.push({
          file: relativePath,
          line: lineNum,
          code: line.trim(),
          issue: 'Redundant font-inter (Inter is default)',
          severity: 'MEDIUM',
          fix: 'Remove font-inter class (Inter is already default)'
        });
        STATS.violations++;
      }

      // SPACING INCONSISTENCIES - arbitrary values
      const spacingPattern = /\b(p|m|gap|space)-(x|y|t|b|l|r)?-\[\d+(\.\d+)?(px|rem|em)\]/g;
      const spacingMatches = line.match(spacingPattern);
      if (spacingMatches) {
        spacingMatches.forEach(match => {
          VIOLATIONS.spacing.push({
            file: relativePath,
            line: lineNum,
            code: line.trim(),
            issue: `Arbitrary spacing value: ${match}`,
            severity: 'MEDIUM',
            fix: 'Use design system spacing scale (e.g., p-4, p-6, p-8)'
          });
          STATS.violations++;
        });
      }

      // BUTTON INCONSISTENCIES
      // Non-standard button classes
      if (line.includes('className') && line.includes('button') && line.includes('bg-blue-')) {
        VIOLATIONS.buttons.push({
          file: relativePath,
          line: lineNum,
          code: line.trim(),
          issue: 'Button using raw blue color instead of design tokens',
          severity: 'HIGH',
          fix: 'Use Button component from src/components/ui/button.tsx or lydian-primary'
        });
        STATS.violations++;
      }
    });

    STATS.scannedFiles++;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
  }
}

/**
 * Recursively find all TSX/TS files
 */
async function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!file.startsWith('.') && file !== 'node_modules') {
        await findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
      STATS.totalFiles++;
    }
  }

  return fileList;
}

/**
 * Generate HTML report
 */
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    stats: STATS,
    violations: VIOLATIONS,
    summary: {
      totalViolations: STATS.violations,
      criticalIssues: VIOLATIONS.hardcoded.length,
      highPriorityIssues: VIOLATIONS.colors.length + VIOLATIONS.buttons.length,
      mediumPriorityIssues: VIOLATIONS.typography.length + VIOLATIONS.spacing.length,
      lowPriorityIssues: 0
    }
  };

  // Save JSON report
  fs.writeFileSync(
    path.join(__dirname, 'ui-consistency-report.json'),
    JSON.stringify(report, null, 2)
  );

  // Generate Markdown report
  let markdown = `# UI/UX Consistency Analysis Report\n\n`;
  markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
  markdown += `## Executive Summary\n\n`;
  markdown += `- **Total Files Scanned:** ${STATS.scannedFiles}\n`;
  markdown += `- **Total Violations:** ${STATS.violations}\n`;
  markdown += `- **Critical Issues:** ${VIOLATIONS.hardcoded.length}\n`;
  markdown += `- **High Priority:** ${VIOLATIONS.colors.length + VIOLATIONS.buttons.length}\n`;
  markdown += `- **Medium Priority:** ${VIOLATIONS.typography.length + VIOLATIONS.spacing.length}\n\n`;

  markdown += `## Design System Status\n\n`;
  markdown += `### ✅ Approved Design Tokens (from src/design-system/tokens.ts)\n\n`;
  markdown += `- **Colors:** lydian-primary, lydian-secondary, lydian-success, lydian-error, etc.\n`;
  markdown += `- **Typography:** Inter (default), font-mono (for code)\n`;
  markdown += `- **Spacing:** 4px base scale (p-1 to p-96)\n\n`;

  markdown += `### ❌ Violations by Category\n\n`;

  // Color violations
  if (VIOLATIONS.colors.length > 0) {
    markdown += `#### 🎨 Color Violations (${VIOLATIONS.colors.length})\n\n`;
    const groupedByFile = {};
    VIOLATIONS.colors.forEach(v => {
      if (!groupedByFile[v.file]) groupedByFile[v.file] = [];
      groupedByFile[v.file].push(v);
    });

    Object.keys(groupedByFile).slice(0, 20).forEach(file => {
      markdown += `**${file}**\n`;
      groupedByFile[file].slice(0, 5).forEach(v => {
        markdown += `- Line ${v.line}: ${v.issue}\n`;
        markdown += `  - Fix: ${v.fix}\n`;
      });
      if (groupedByFile[file].length > 5) {
        markdown += `  - ... and ${groupedByFile[file].length - 5} more\n`;
      }
      markdown += `\n`;
    });
  }

  // Hardcoded colors
  if (VIOLATIONS.hardcoded.length > 0) {
    markdown += `#### ⚠️ CRITICAL: Hardcoded Colors (${VIOLATIONS.hardcoded.length})\n\n`;
    VIOLATIONS.hardcoded.slice(0, 15).forEach(v => {
      markdown += `**${v.file}:${v.line}**\n`;
      markdown += `- Issue: ${v.issue}\n`;
      markdown += `- Fix: ${v.fix}\n\n`;
    });
  }

  // Button violations
  if (VIOLATIONS.buttons.length > 0) {
    markdown += `#### 🔘 Button Inconsistencies (${VIOLATIONS.buttons.length})\n\n`;
    VIOLATIONS.buttons.slice(0, 10).forEach(v => {
      markdown += `**${v.file}:${v.line}**\n`;
      markdown += `- ${v.issue}\n\n`;
    });
  }

  markdown += `\n## Recommended Actions\n\n`;
  markdown += `1. **Immediate (Critical):** Replace all hardcoded hex colors with design tokens\n`;
  markdown += `2. **High Priority:** Migrate all raw Tailwind colors (gray-*, blue-*, red-*) to lydian tokens\n`;
  markdown += `3. **Medium Priority:** Standardize button components to use src/components/ui/button.tsx\n`;
  markdown += `4. **Medium Priority:** Fix typography inconsistencies\n\n`;

  markdown += `## Design Token Reference\n\n`;
  markdown += `\`\`\`typescript\n`;
  markdown += `// Primary brand colors\n`;
  markdown += `bg-lydian-primary        // #DC2626 (main red)\n`;
  markdown += `bg-lydian-primary-hover  // #B91C1C (darker)\n`;
  markdown += `bg-lydian-secondary      // #EF4444\n\n`;
  markdown += `// Text colors\n`;
  markdown += `text-lydian-text         // #111827 (dark)\n`;
  markdown += `text-lydian-text-secondary // #374151\n`;
  markdown += `text-lydian-text-muted   // #6B7280\n\n`;
  markdown += `// Background colors\n`;
  markdown += `bg-lydian-bg             // #FFFFFF\n`;
  markdown += `bg-lydian-bg-surface     // #F9FAFB\n`;
  markdown += `\`\`\`\n`;

  fs.writeFileSync(
    path.join(__dirname, 'UI-CONSISTENCY-REPORT.md'),
    markdown
  );

  return report;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Starting UI/UX Consistency Analysis...\n');

  console.log('📁 Finding files...');
  const files = await findFiles(BASE_DIR);
  console.log(`✅ Found ${files.length} TypeScript/TSX files\n`);

  console.log('🔬 Scanning files for violations...');
  for (const file of files) {
    await scanFile(file);
    if (STATS.scannedFiles % 50 === 0) {
      console.log(`   Scanned ${STATS.scannedFiles}/${files.length} files...`);
    }
  }

  console.log('\n📊 Generating report...');
  const report = generateReport();

  console.log('\n✅ Analysis Complete!\n');
  console.log('═══════════════════════════════════════════════════');
  console.log(`📄 Files Scanned:        ${STATS.scannedFiles}`);
  console.log(`⚠️  Total Violations:     ${STATS.violations}`);
  console.log(`🔴 Critical Issues:      ${VIOLATIONS.hardcoded.length}`);
  console.log(`🟠 High Priority:        ${VIOLATIONS.colors.length + VIOLATIONS.buttons.length}`);
  console.log(`🟡 Medium Priority:      ${VIOLATIONS.typography.length + VIOLATIONS.spacing.length}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('\n📋 Reports generated:');
  console.log('   - UI-CONSISTENCY-REPORT.md (human-readable)');
  console.log('   - ui-consistency-report.json (machine-readable)');
  console.log('\n');
}

// Run analysis
main().catch(console.error);
