#!/usr/bin/env node

/**
 * Button Migration Script
 * Automatically migrates old button components to the unified Button component
 *
 * Usage:
 *   node scripts/migrate-buttons.js [--dry-run] [--component=NeoButton]
 *
 * Options:
 *   --dry-run: Preview changes without modifying files
 *   --component: Migrate specific component only (NeoButton, MinimalistButton, etc.)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const TARGET_COMPONENT = process.argv.find(arg => arg.startsWith('--component='))?.split('=')[1];

// Color output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Migration patterns
const migrations = [
  {
    name: 'NeoButton',
    pattern: /import\s+{\s*NeoButton\s*(?:,\s*NeoButtonProps)?\s*}\s+from\s+['"].*?neo-glass\/NeoButton['"];?/g,
    replacement: "import { Button } from '@/components/ui/button';",
    componentPattern: /<NeoButton\s+/g,
    componentReplacement: '<Button ',
    propsMapping: {
      variant: {
        'primary': 'primary',
        'secondary': 'secondary',
        'glass': 'glass',
        'neo': 'neo',
        'gradient': 'gradient',
      },
      additionalProps: (props) => {
        if (props.includes('variant="primary"') || props.includes('variant="secondary"')) {
          return ' effect="glow"';
        }
        return '';
      },
      renameProps: [
        { from: /icon=/g, to: 'leftIcon=' },
        { from: /iconPosition="right"/g, to: '', moveIconTo: 'rightIcon' },
      ],
    },
  },
  {
    name: 'MinimalistButton',
    pattern: /import\s+{\s*MinimalistButton\s*(?:,\s*MinimalistButtonProps)?\s*}\s+from\s+['"].*?minimalist\/MinimalistButton['"];?/g,
    replacement: "import { Button } from '@/components/ui/button';",
    componentPattern: /<MinimalistButton\s+/g,
    componentReplacement: '<Button ',
    propsMapping: {
      variant: {
        'primary': 'primary',
        'secondary': 'outline',
        'ghost': 'ghost',
      },
    },
  },
  {
    name: 'FuturisticButton',
    pattern: /import\s+{\s*FuturisticButton\s*(?:,\s*FuturisticButtonProps)?\s*}\s+from\s+['"].*?neo-glass\/FuturisticButton['"];?/g,
    replacement: "import { Button } from '@/components/ui/button';",
    componentPattern: /<FuturisticButton\s+/g,
    componentReplacement: '<Button ',
    propsMapping: {
      variant: {
        'ai': 'ai',
        'primary': 'gradient',
        'secondary': 'secondary',
        'success': 'success',
        'glass': 'glass',
        'outline': 'outline',
      },
      additionalProps: (props) => {
        if (props.includes('glow={true}') || props.includes('glow')) {
          return ' effect="glow"';
        }
        return '';
      },
      removeProps: ['glow'],
      renameProps: [
        { from: /icon=/g, to: 'leftIcon=' },
        { from: /iconPosition="right"/g, to: '', moveIconTo: 'rightIcon' },
      ],
    },
  },
];

function findTSXFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory() && !item.name.includes('node_modules') && !item.name.startsWith('.')) {
      results = results.concat(findTSXFiles(fullPath));
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.jsx'))) {
      results.push(fullPath);
    }
  }

  return results;
}

function migrateFile(filePath, migration) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file uses this component
  if (!migration.pattern.test(content) && !migration.componentPattern.test(content)) {
    return { modified: false };
  }

  const originalContent = content;

  // Replace import statement
  if (migration.pattern.test(content)) {
    content = content.replace(migration.pattern, migration.replacement);
    modified = true;
  }

  // Replace component usage
  if (migration.componentPattern.test(content)) {
    content = content.replace(migration.componentPattern, migration.componentReplacement);
    modified = true;
  }

  // Handle prop migrations
  if (migration.propsMapping && modified) {
    // Variant mapping
    if (migration.propsMapping.variant) {
      Object.entries(migration.propsMapping.variant).forEach(([from, to]) => {
        const variantPattern = new RegExp(`variant="${from}"`, 'g');
        content = content.replace(variantPattern, `variant="${to}"`);
      });
    }

    // Rename props
    if (migration.propsMapping.renameProps) {
      migration.propsMapping.renameProps.forEach(({ from, to, moveIconTo }) => {
        if (moveIconTo) {
          // Handle iconPosition="right" case
          content = content.replace(/icon=(\{[^}]+\})\s+iconPosition="right"/g, `rightIcon=$1`);
          content = content.replace(/iconPosition="right"\s+icon=(\{[^}]+\})/g, `rightIcon=$1`);
          content = content.replace(/iconPosition="left"\s+/g, '');
          content = content.replace(/\s+iconPosition="left"/g, '');
        } else {
          content = content.replace(from, to);
        }
      });
    }

    // Remove props
    if (migration.propsMapping.removeProps) {
      migration.propsMapping.removeProps.forEach(prop => {
        const removePattern = new RegExp(`\\s+${prop}(?:={[^}]+}|={true}|={false})?`, 'g');
        content = content.replace(removePattern, '');
      });
    }

    // Add additional props
    if (migration.propsMapping.additionalProps) {
      const componentRegex = /<Button\s+([^>]+)>/g;
      content = content.replace(componentRegex, (match, props) => {
        const additional = migration.propsMapping.additionalProps(props);
        if (additional) {
          return match.replace('>', `${additional}>`);
        }
        return match;
      });
    }
  }

  return {
    modified,
    originalContent,
    newContent: content,
  };
}

function main() {
  log('\n🔄 Button Migration Script', 'blue');
  log('=' .repeat(60), 'blue');

  if (DRY_RUN) {
    log('\n⚠️  DRY RUN MODE - No files will be modified\n', 'yellow');
  }

  if (TARGET_COMPONENT) {
    log(`📌 Targeting component: ${TARGET_COMPONENT}\n`, 'magenta');
  }

  const srcDir = path.join(process.cwd(), 'src');
  const files = findTSXFiles(srcDir);

  log(`Found ${files.length} TSX/JSX files\n`, 'blue');

  const stats = {
    filesScanned: 0,
    filesModified: 0,
    componentsMigrated: {},
  };

  migrations.forEach(migration => {
    if (TARGET_COMPONENT && migration.name !== TARGET_COMPONENT) {
      return;
    }

    log(`\n📦 Migrating ${migration.name}...`, 'cyan');
    log('-'.repeat(60), 'cyan');

    let migrationCount = 0;

    files.forEach(filePath => {
      stats.filesScanned++;

      const result = migrateFile(filePath, migration);

      if (result.modified) {
        migrationCount++;
        stats.filesModified++;

        const relativePath = path.relative(process.cwd(), filePath);
        log(`  ✓ ${relativePath}`, 'green');

        if (!DRY_RUN) {
          fs.writeFileSync(filePath, result.newContent, 'utf8');
        }
      }
    });

    stats.componentsMigrated[migration.name] = migrationCount;

    if (migrationCount === 0) {
      log(`  No files found using ${migration.name}`, 'yellow');
    } else {
      log(`  Migrated ${migrationCount} file(s)`, 'green');
    }
  });

  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('📊 Migration Summary', 'blue');
  log('='.repeat(60), 'blue');
  log(`Files scanned: ${stats.filesScanned}`, 'blue');
  log(`Files modified: ${stats.filesModified}`, stats.filesModified > 0 ? 'green' : 'yellow');

  Object.entries(stats.componentsMigrated).forEach(([component, count]) => {
    const color = count > 0 ? 'green' : 'yellow';
    log(`  ${component}: ${count} file(s)`, color);
  });

  if (DRY_RUN) {
    log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.', 'yellow');
  } else if (stats.filesModified > 0) {
    log('\n✅ Migration complete! Please review the changes and test your application.', 'green');
    log('\n📝 Next steps:', 'blue');
    log('  1. Review changes: git diff', 'blue');
    log('  2. Test the application', 'blue');
    log('  3. Update any custom button logic', 'blue');
    log('  4. Run: npm run build', 'blue');
  } else {
    log('\n✓ No files needed migration.', 'green');
  }

  log('');
}

// Run the script
main();
