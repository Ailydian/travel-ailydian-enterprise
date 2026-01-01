#!/usr/bin/env ts-node
/**
 * TypeScript Any Type Fixer
 * Automatically fixes 'any' type usage in TypeScript files
 *
 * Strategy:
 * 1. Analyze context around 'any' usage
 * 2. Infer proper type from usage patterns
 * 3. Replace with typed alternatives (unknown, generics, proper types)
 * 4. Create backup before modification
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface AnyTypeIssue {
  file: string;
  line: number;
  column: number;
  context: string;
  suggestedFix: string;
  fixType: 'unknown' | 'generic' | 'specific' | 'record';
}

class AnyTypeFixer {
  private issues: AnyTypeIssue[] = [];
  private fixedCount = 0;
  private processedFiles = new Set<string>();

  /**
   * Detect proper type from variable usage context
   */
  private inferTypeFromContext(variableName: string, fileContent: string): string {
    // Check if it's used as an object with specific properties
    const propertyAccessPattern = new RegExp(`${variableName}\\.(\\w+)`, 'g');
    const properties = new Set<string>();
    let match;

    while ((match = propertyAccessPattern.exec(fileContent)) !== null) {
      if (match[1]) {
        properties.add(match[1]);
      }
    }

    if (properties.size > 0) {
      const propsInterface = Array.from(properties)
        .map(prop => `${prop}: unknown`)
        .join('; ');
      return `{ ${propsInterface} }`;
    }

    // Check if it's used as an array
    if (fileContent.includes(`${variableName}.map(`) ||
        fileContent.includes(`${variableName}.filter(`) ||
        fileContent.includes(`${variableName}.forEach(`)) {
      return 'unknown[]';
    }

    // Check if it's used as a function
    if (fileContent.includes(`${variableName}(`)) {
      return '(...args: unknown[]) => unknown';
    }

    // Default to unknown
    return 'unknown';
  }

  /**
   * Analyze any type usage and suggest fix
   */
  private analyzeAnyUsage(content: string, line: number, lineText: string): AnyTypeIssue | null {
    // Skip comments
    if (lineText.trim().startsWith('//') || lineText.trim().startsWith('*')) {
      return null;
    }

    // Find any type usage patterns
    const patterns = [
      // Function parameters: foo: any
      /(\w+)\s*:\s*any\b/g,
      // Generic types: Array<any>
      /Array<any>/g,
      // Type assertions: as any
      /as\s+any\b/g,
      // Generic function: <any>
      /<any>/g,
      // Type annotations: Record<string, any>
      /Record<\w+,\s*any>/g,
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(lineText);
      if (match) {
        let suggestedFix = lineText;
        let fixType: 'unknown' | 'generic' | 'specific' | 'record' = 'unknown';

        // Different fix strategies
        if (match[0].includes('Array<any>')) {
          suggestedFix = lineText.replace(/Array<any>/g, 'Array<unknown>');
          fixType = 'generic';
        } else if (match[0].includes('as any')) {
          suggestedFix = lineText.replace(/as\s+any\b/g, 'as unknown');
          fixType = 'unknown';
        } else if (match[0].includes('Record<')) {
          suggestedFix = lineText.replace(/Record<(\w+),\s*any>/g, 'Record<$1, unknown>');
          fixType = 'record';
        } else if (match[1]) {
          // Parameter or variable
          const varName = match[1];
          const inferredType = this.inferTypeFromContext(varName, content);
          suggestedFix = lineText.replace(
            new RegExp(`\\b${varName}\\s*:\\s*any\\b`),
            `${varName}: ${inferredType}`
          );
          fixType = inferredType.includes('unknown') ? 'unknown' : 'specific';
        } else {
          suggestedFix = lineText.replace(/\bany\b/g, 'unknown');
          fixType = 'unknown';
        }

        return {
          file: '',
          line,
          column: match.index || 0,
          context: lineText.trim(),
          suggestedFix: suggestedFix.trim(),
          fixType
        };
      }
    }

    return null;
  }

  /**
   * Process a single file
   */
  private async processFile(filePath: string): Promise<void> {
    if (this.processedFiles.has(filePath)) {
      return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if no 'any' type usage
    if (!content.includes(': any') &&
        !content.includes('<any>') &&
        !content.includes('as any')) {
      return;
    }

    console.log(`\n📝 Processing: ${filePath}`);

    // Create backup
    const backupPath = filePath + '.any-backup';
    fs.writeFileSync(backupPath, content);

    const lines = content.split('\n');
    const newLines: string[] = [];
    let fileFixCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const issue = this.analyzeAnyUsage(content, i + 1, line);

      if (issue) {
        issue.file = filePath;
        this.issues.push(issue);
        newLines.push(issue.suggestedFix ?? line);
        fileFixCount++;
        this.fixedCount++;
        console.log(`  ✓ Line ${i + 1}: ${issue.fixType.toUpperCase()}`);
      } else {
        newLines.push(line ?? '');
      }
    }

    if (fileFixCount > 0) {
      // Write fixed content
      fs.writeFileSync(filePath, newLines.join('\n'));
      this.processedFiles.add(filePath);
      console.log(`  ✅ Fixed ${fileFixCount} any types`);
    } else {
      // Remove backup if no changes
      fs.unlinkSync(backupPath);
    }
  }

  /**
   * Find all TypeScript files with 'any' usage
   */
  private findAnyTypeFiles(): string[] {
    try {
      const result = execSync(
        'grep -rl "\\bany\\b" src --include="*.ts" --include="*.tsx" | grep -v ".backup" | grep -v "node_modules" | head -100',
        { cwd: process.cwd(), encoding: 'utf-8' }
      );

      return result.trim().split('\n').filter(Boolean);
    } catch (error) {
      console.error('Error finding files:', error);
      return [];
    }
  }

  /**
   * Generate fix report
   */
  private generateReport(): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 ANY TYPE FIX REPORT');
    console.log('='.repeat(70));
    console.log(`\n✅ Total fixes: ${this.fixedCount}`);
    console.log(`📁 Files processed: ${this.processedFiles.size}`);

    console.log('\n📈 Breakdown by fix type:');
    const byType = this.issues.reduce((acc, issue) => {
      acc[issue.fixType] = (acc[issue.fixType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type.padEnd(12)}: ${count}`);
    });

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'any-type-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalFixes: this.fixedCount,
      filesProcessed: this.processedFiles.size,
      breakdownByType: byType,
      issues: this.issues.slice(0, 100) // Limit to 100 for readability
    }, null, 2));

    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    console.log('\n' + '='.repeat(70));
  }

  /**
   * Run type checker to verify changes
   */
  private async verifyTypes(): Promise<void> {
    console.log('\n🔍 Running TypeScript type checker...\n');

    try {
      execSync('npx tsc --noEmit', {
        cwd: process.cwd(),
        stdio: 'inherit'
      });
      console.log('\n✅ Type checking passed!');
    } catch (error) {
      console.log('\n⚠️  Type checking found issues. Review and fix manually.');
      console.log('💡 Run "npx tsc --noEmit" to see detailed errors');
    }
  }

  /**
   * Run fixer
   */
  public async run(): Promise<void> {
    console.log('🚀 Starting any type fixer...\n');

    const files = this.findAnyTypeFiles();
    console.log(`Found ${files.length} files with potential any usage\n`);

    for (const file of files.slice(0, 100)) { // Process first 100 files
      try {
        await this.processFile(file);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }

    this.generateReport();

    console.log('\n✅ Fix complete!');
    console.log('💡 Backup files created with .any-backup extension');
    console.log('🧪 Running type checker to verify changes...\n');

    await this.verifyTypes();
  }
}

// Run fixer
const fixer = new AnyTypeFixer();
fixer.run().catch(console.error);
