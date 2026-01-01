#!/usr/bin/env ts-node
/**
 * Alert to Toast Converter
 * Automatically converts all alert() calls to toast notifications
 *
 * Features:
 * - Detects alert type (success, error, warning, info)
 * - Adds useToast hook imports
 * - Preserves code formatting
 * - Creates backup before modification
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface AlertConversion {
  file: string;
  line: number;
  original: string;
  converted: string;
  toastType: 'success' | 'error' | 'warning' | 'info';
}

class AlertToToastConverter {
  private conversions: AlertConversion[] = [];
  private processedFiles = new Set<string>();

  /**
   * Detect toast type from message content
   */
  private detectToastType(message: string): 'success' | 'error' | 'warning' | 'info' {
    const lowerMsg = message.toLowerCase();

    // Error patterns
    if (
      lowerMsg.includes('error') ||
      lowerMsg.includes('failed') ||
      lowerMsg.includes('hata') ||
      lowerMsg.includes('başarısız') ||
      lowerMsg.includes('geçersiz') ||
      lowerMsg.includes('invalid') ||
      lowerMsg.includes('please') ||
      lowerMsg.includes('lütfen')
    ) {
      return 'error';
    }

    // Success patterns
    if (
      lowerMsg.includes('success') ||
      lowerMsg.includes('başarı') ||
      lowerMsg.includes('kaydedildi') ||
      lowerMsg.includes('saved') ||
      lowerMsg.includes('created') ||
      lowerMsg.includes('oluşturuldu') ||
      lowerMsg.includes('updated') ||
      lowerMsg.includes('güncellendi') ||
      lowerMsg.includes('tebrikler') ||
      lowerMsg.includes('congratulations')
    ) {
      return 'success';
    }

    // Warning patterns
    if (
      lowerMsg.includes('warning') ||
      lowerMsg.includes('uyarı') ||
      lowerMsg.includes('dikkat') ||
      lowerMsg.includes('caution')
    ) {
      return 'warning';
    }

    return 'info';
  }

  /**
   * Extract message from alert() call
   */
  private extractAlertMessage(alertCall: string): string {
    const match = alertCall.match(/alert\s*\(\s*['"`](.+?)['"`]\s*\)/);
    if (match) {
      return match[1];
    }

    // Template literal
    const templateMatch = alertCall.match(/alert\s*\(\s*`(.+?)`\s*\)/);
    if (templateMatch) {
      return templateMatch[1];
    }

    // Variable or expression
    const varMatch = alertCall.match(/alert\s*\(\s*(.+?)\s*\)/);
    return varMatch ? varMatch[1] : 'Notification';
  }

  /**
   * Convert alert() to toast call
   */
  private convertAlertToToast(alertCall: string, toastType: 'success' | 'error' | 'warning' | 'info'): string {
    const message = this.extractAlertMessage(alertCall);

    // If message is a variable/expression, use showToast
    if (!message.match(/^['"`]/) && !message.includes('${')) {
      return `showToast({ type: '${toastType}', title: ${message} })`;
    }

    // Split into title and optional message
    const parts = message.split(/[:.!?]\s+/);
    const title = parts[0].replace(/['"`]/g, '');
    const detail = parts.slice(1).join(' ').replace(/['"`]/g, '');

    if (detail && detail.length > 0) {
      return `show${toastType.charAt(0).toUpperCase() + toastType.slice(1)}('${title}', '${detail}')`;
    }

    return `show${toastType.charAt(0).toUpperCase() + toastType.slice(1)}('${title}')`;
  }

  /**
   * Check if file already has useToast import
   */
  private hasUseToastImport(content: string): boolean {
    return /import\s+{[^}]*useToast[^}]*}\s+from\s+['"].*ToastContext['"]/.test(content) ||
           /import\s+useToast\s+from\s+['"].*ToastContext['"]/.test(content);
  }

  /**
   * Add useToast import to file
   */
  private addUseToastImport(content: string, filePath: string): string {
    if (this.hasUseToastImport(content)) {
      return content;
    }

    // Determine relative path to ToastContext
    const depth = filePath.split('/').filter(p => p !== 'src').length - 2;
    const relativePath = '../'.repeat(depth) + 'context/ToastContext';

    // Find last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^import\s+/)) {
        lastImportIndex = i;
      }
    }

    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, `import { useToast } from '${relativePath}';`);
      return lines.join('\n');
    }

    // No imports found, add at top after 'use client' if exists
    const useClientIndex = lines.findIndex(l => l.includes("'use client'") || l.includes('"use client"'));
    if (useClientIndex >= 0) {
      lines.splice(useClientIndex + 1, 0, '', `import { useToast } from '${relativePath}';`);
      return lines.join('\n');
    }

    // Add at very top
    return `import { useToast } from '${relativePath}';\n\n${content}`;
  }

  /**
   * Add useToast hook to component
   */
  private addUseToastHook(content: string): string {
    // Check if already has useToast hook
    if (/const\s+{[^}]*show(Toast|Success|Error|Warning|Info)[^}]*}\s*=\s*useToast\(\)/.test(content)) {
      return content;
    }

    // Find component function
    const componentMatch = content.match(/(export\s+default\s+)?function\s+\w+[^{]*{/);
    if (!componentMatch) {
      // Try arrow function
      const arrowMatch = content.match(/(export\s+default\s+)?const\s+\w+[^=]*=\s*\([^)]*\)\s*=>\s*{/);
      if (!arrowMatch) {
        return content;
      }
    }

    const lines = content.split('\n');
    let insertIndex = -1;
    let braceCount = 0;
    let foundStart = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!foundStart && (line.includes('function ') || line.includes(') => {'))) {
        foundStart = true;
      }

      if (foundStart) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;

        if (braceCount === 1 && insertIndex === -1) {
          insertIndex = i + 1;
          break;
        }
      }
    }

    if (insertIndex > 0) {
      const indent = lines[insertIndex]?.match(/^\s*/)?.[0] || '  ';
      lines.splice(insertIndex, 0, `${indent}const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();`);
      lines.splice(insertIndex + 1, 0, '');
      return lines.join('\n');
    }

    return content;
  }

  /**
   * Process a single file
   */
  private async processFile(filePath: string): Promise<void> {
    if (this.processedFiles.has(filePath)) {
      return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if no alerts
    if (!content.includes('alert(')) {
      return;
    }

    console.log(`\n📝 Processing: ${filePath}`);

    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, content);

    let modified = false;
    const lines = content.split('\n');
    const newLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      if (line.includes('alert(')) {
        const alertMatches = line.matchAll(/alert\s*\([^)]+\)/g);

        for (const match of alertMatches) {
          const alertCall = match[0];
          const message = this.extractAlertMessage(alertCall);
          const toastType = this.detectToastType(message);
          const toastCall = this.convertAlertToToast(alertCall, toastType);

          line = line.replace(alertCall, toastCall);
          modified = true;

          this.conversions.push({
            file: filePath,
            line: i + 1,
            original: alertCall,
            converted: toastCall,
            toastType
          });

          console.log(`  ✓ Line ${i + 1}: ${toastType.toUpperCase()}`);
        }
      }

      newLines.push(line);
    }

    if (modified) {
      content = newLines.join('\n');

      // Add imports and hook
      content = this.addUseToastImport(content, filePath);
      content = this.addUseToastHook(content);

      // Write modified file
      fs.writeFileSync(filePath, content);
      this.processedFiles.add(filePath);

      console.log(`  ✅ Converted ${this.conversions.filter(c => c.file === filePath).length} alerts`);
    }
  }

  /**
   * Find all files with alert() calls
   */
  private findAlertFiles(): string[] {
    try {
      const result = execSync(
        'find src -type f \\( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \\) -exec grep -l "alert(" {} \\;',
        { cwd: process.cwd(), encoding: 'utf-8' }
      );

      return result.trim().split('\n').filter(Boolean);
    } catch (error) {
      console.error('Error finding files:', error);
      return [];
    }
  }

  /**
   * Generate conversion report
   */
  private generateReport(): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 ALERT TO TOAST CONVERSION REPORT');
    console.log('='.repeat(70));
    console.log(`\n✅ Total conversions: ${this.conversions.length}`);
    console.log(`📁 Files processed: ${this.processedFiles.size}`);

    console.log('\n📈 Breakdown by type:');
    const byType = this.conversions.reduce((acc, c) => {
      acc[c.toastType] = (acc[c.toastType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type.padEnd(10)}: ${count}`);
    });

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'alert-to-toast-conversion-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalConversions: this.conversions.length,
      filesProcessed: this.processedFiles.size,
      breakdownByType: byType,
      conversions: this.conversions
    }, null, 2));

    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    console.log('\n' + '='.repeat(70));
  }

  /**
   * Run conversion
   */
  public async run(): Promise<void> {
    console.log('🚀 Starting alert() to toast conversion...\n');

    const files = this.findAlertFiles();
    console.log(`Found ${files.length} files with alert() calls\n`);

    for (const file of files) {
      try {
        await this.processFile(file);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }

    this.generateReport();

    console.log('\n✅ Conversion complete!');
    console.log('💡 Backup files created with .backup extension');
    console.log('🧪 Please test the application and verify all toasts work correctly');
  }
}

// Run converter
const converter = new AlertToToastConverter();
converter.run().catch(console.error);
