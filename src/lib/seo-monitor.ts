import fs from 'fs';
import logger from '@/lib/logger';
import path from 'path';

export interface SEOMetrics {
  timestamp: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imageCount: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  pageSize: number;
  loadTime: number;
  mobileOptimized: boolean;
  hasCanonical: boolean;
  hasOgTags: boolean;
  hasTwitterCards: boolean;
  hasStructuredData: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export interface SEOError {
  type: 'error' | 'warning' | 'info';
  code: string;
  message: string;
  element?: string;
  url: string;
  timestamp: string;
}

export class SEOMonitor {
  private logDir: string;
  private metricsFile: string;
  private errorsFile: string;
  private reportFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs', 'seo');
    this.metricsFile = path.join(this.logDir, 'metrics.json');
    this.errorsFile = path.join(this.logDir, 'errors.json');
    this.reportFile = path.join(this.logDir, 'report.html');
    
    // Ensure log directory exists
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  // Analyze page SEO metrics
  async analyzePage(url: string, html: string): Promise<SEOMetrics> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Parse HTML (you might want to use a proper HTML parser like cheerio)
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']*)["\'][^>]*>/i);
    const description = descMatch ? descMatch[1] : '';
    
    const keywordsMatch = html.match(/<meta[^>]*name=["\']keywords["\'][^>]*content=["\']([^"']*)["\'][^>]*>/i);
    const keywords = keywordsMatch ? keywordsMatch[1] : '';

    // Count elements
    const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
    const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
    
    const imageCount = (html.match(/<img[^>]*>/gi) || []).length;
    const imagesWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
    
    const internalLinks = (html.match(/<a[^>]*href=["\'][^"']*[^"']*["\'][^>]*>/gi) || [])
      .filter(link => !link.includes('http') || link.includes('travel.lydian.com')).length;
    
    const externalLinks = (html.match(/<a[^>]*href=["\']https?:\/\/[^"']*["\'][^>]*>/gi) || [])
      .filter(link => !link.includes('travel.lydian.com')).length;

    // Check for important elements
    const hasCanonical = html.includes('rel="canonical"');
    const hasOgTags = html.includes('property="og:');
    const hasTwitterCards = html.includes('name="twitter:');
    const hasStructuredData = html.includes('application/ld+json');
    const mobileOptimized = html.includes('viewport') && html.includes('width=device-width');

    // SEO Validation
    if (!title) {
      errors.push('Missing title tag');
      score -= 10;
    } else if (title.length < 30 || title.length > 60) {
      warnings.push(`Title length is ${title.length} characters (recommended: 30-60)`);
      score -= 5;
    }

    if (!description) {
      errors.push('Missing meta description');
      score -= 8;
    } else if (description.length < 120 || description.length > 160) {
      warnings.push(`Description length is ${description.length} characters (recommended: 120-160)`);
      score -= 3;
    }

    if (h1Count === 0) {
      errors.push('Missing H1 tag');
      score -= 8;
    } else if (h1Count > 1) {
      warnings.push(`Multiple H1 tags found (${h1Count})`);
      score -= 3;
    }

    if (imagesWithoutAlt > 0) {
      warnings.push(`${imagesWithoutAlt} images without alt text`);
      score -= imagesWithoutAlt * 2;
    }

    if (!hasCanonical) {
      warnings.push('Missing canonical tag');
      score -= 5;
    }

    if (!hasOgTags) {
      warnings.push('Missing Open Graph tags');
      score -= 5;
    }

    if (!hasTwitterCards) {
      warnings.push('Missing Twitter Card tags');
      score -= 3;
    }

    if (!hasStructuredData) {
      warnings.push('Missing structured data');
      score -= 5;
    }

    if (!mobileOptimized) {
      errors.push('Not mobile optimized');
      score -= 10;
    }

    const metrics: SEOMetrics = {
      timestamp: new Date().toISOString(),
      url,
      title,
      description,
      keywords,
      h1Count,
      h2Count,
      h3Count,
      imageCount,
      imagesWithoutAlt,
      internalLinks,
      externalLinks,
      pageSize: html.length,
      loadTime: 0, // This would need to be measured separately
      mobileOptimized,
      hasCanonical,
      hasOgTags,
      hasTwitterCards,
      hasStructuredData,
      errors,
      warnings,
      score: Math.max(0, score)
    };

    await this.saveMetrics(metrics);
    await this.logErrors(url, errors, warnings);

    return metrics;
  }

  // Save metrics to file
  private async saveMetrics(metrics: SEOMetrics) {
    try {
      let existingMetrics: SEOMetrics[] = [];
      
      if (fs.existsSync(this.metricsFile)) {
        const data = fs.readFileSync(this.metricsFile, 'utf-8');
        existingMetrics = JSON.parse(data);
      }

      existingMetrics.push(metrics);
      
      // Keep only last 1000 entries
      if (existingMetrics.length > 1000) {
        existingMetrics = existingMetrics.slice(-1000);
      }

      fs.writeFileSync(this.metricsFile, JSON.stringify(existingMetrics, null, 2));
    } catch (error) {
      logger.error('Error saving SEO metrics:', error);
    }
  }

  // Log SEO errors
  private async logErrors(url: string, errors: string[], warnings: string[]) {
    try {
      const timestamp = new Date().toISOString();
      const seoErrors: SEOError[] = [];

      errors.forEach(error => {
        seoErrors.push({
          type: 'error',
          code: 'SEO_ERROR',
          message: error,
          url,
          timestamp
        });
      });

      warnings.forEach(warning => {
        seoErrors.push({
          type: 'warning',
          code: 'SEO_WARNING',
          message: warning,
          url,
          timestamp
        });
      });

      if (seoErrors.length > 0) {
        let existingErrors: SEOError[] = [];
        
        if (fs.existsSync(this.errorsFile)) {
          const data = fs.readFileSync(this.errorsFile, 'utf-8');
          existingErrors = JSON.parse(data);
        }

        existingErrors.push(...seoErrors);
        
        // Keep only last 5000 entries
        if (existingErrors.length > 5000) {
          existingErrors = existingErrors.slice(-5000);
        }

        fs.writeFileSync(this.errorsFile, JSON.stringify(existingErrors, null, 2));
      }
    } catch (error) {
      logger.error('Error logging SEO errors:', error);
    }
  }

  // Generate SEO report
  async generateReport(): Promise<string> {
    try {
      let metrics: SEOMetrics[] = [];
      let errors: SEOError[] = [];

      if (fs.existsSync(this.metricsFile)) {
        const data = fs.readFileSync(this.metricsFile, 'utf-8');
        metrics = JSON.parse(data);
      }

      if (fs.existsSync(this.errorsFile)) {
        const data = fs.readFileSync(this.errorsFile, 'utf-8');
        errors = JSON.parse(data);
      }

      const report = this.generateHTMLReport(metrics, errors);
      fs.writeFileSync(this.reportFile, report);
      
      return this.reportFile;
    } catch (error) {
      logger.error('Error generating SEO report:', error);
      return '';
    }
  }

  // Generate HTML report
  private generateHTMLReport(metrics: SEOMetrics[], errors: SEOError[]): string {
    const latestMetrics = metrics.slice(-10).reverse();
    const recentErrors = errors.slice(-50).reverse();
    
    const avgScore = metrics.length > 0 
      ? (metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length).toFixed(1)
      : '0';

    const errorCount = errors.filter(e => e.type === 'error').length;
    const warningCount = errors.filter(e => e.type === 'warning').length;

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Report - Travel LyDian</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #FF214D; margin: 0; font-size: 2.5em; }
        .header p { color: #666; margin: 10px 0 0 0; font-size: 1.1em; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: linear-gradient(135deg, #FF214D, #FF6A45); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-card h3 { margin: 0 0 10px 0; font-size: 2em; }
        .stat-card p { margin: 0; opacity: 0.9; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #333; border-bottom: 2px solid #FF214D; padding-bottom: 10px; }
        .metrics-table, .errors-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .metrics-table th, .metrics-table td, .errors-table th, .errors-table td { 
            padding: 12px; text-align: left; border-bottom: 1px solid #eee; 
        }
        .metrics-table th, .errors-table th { background: #f8f9fa; font-weight: 600; }
        .score { font-weight: bold; }
        .score.good { color: #28a745; }
        .score.warning { color: #ffc107; }
        .score.error { color: #dc3545; }
        .error { color: #dc3545; }
        .warning { color: #ffc107; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SEO Performance Report</h1>
            <p>Travel LyDian - ${new Date().toLocaleDateString('tr-TR', { 
              day: 'numeric', month: 'long', year: 'numeric' 
            })}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3>${avgScore}</h3>
                <p>Average SEO Score</p>
            </div>
            <div class="stat-card">
                <h3>${metrics.length}</h3>
                <p>Pages Analyzed</p>
            </div>
            <div class="stat-card">
                <h3>${errorCount}</h3>
                <p>Critical Errors</p>
            </div>
            <div class="stat-card">
                <h3>${warningCount}</h3>
                <p>Warnings</p>
            </div>
        </div>

        <div class="section">
            <h2>Latest Page Analysis</h2>
            <table class="metrics-table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Score</th>
                        <th>Title Length</th>
                        <th>Description Length</th>
                        <th>Images</th>
                        <th>H1 Count</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    ${latestMetrics.map(m => `
                        <tr>
                            <td>${m.url}</td>
                            <td class="score ${m.score >= 90 ? 'good' : m.score >= 70 ? 'warning' : 'error'}">${m.score}</td>
                            <td>${m.title.length}</td>
                            <td>${m.description.length}</td>
                            <td>${m.imageCount} (${m.imagesWithoutAlt} no alt)</td>
                            <td>${m.h1Count}</td>
                            <td class="timestamp">${new Date(m.timestamp).toLocaleString('tr-TR')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Recent Issues</h2>
            <table class="errors-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Message</th>
                        <th>URL</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentErrors.map(e => `
                        <tr>
                            <td class="${e.type}">${e.type.toUpperCase()}</td>
                            <td>${e.message}</td>
                            <td>${e.url}</td>
                            <td class="timestamp">${new Date(e.timestamp).toLocaleString('tr-TR')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>SEO Recommendations</h2>
            <ul>
                <li>Ensure all pages have unique, descriptive titles (30-60 characters)</li>
                <li>Write compelling meta descriptions (120-160 characters)</li>
                <li>Use only one H1 tag per page</li>
                <li>Add alt text to all images</li>
                <li>Implement structured data for better search visibility</li>
                <li>Ensure mobile optimization across all pages</li>
                <li>Monitor page load times and optimize for performance</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
  }

  // Get metrics data
  getMetrics(): SEOMetrics[] {
    try {
      if (fs.existsSync(this.metricsFile)) {
        const data = fs.readFileSync(this.metricsFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error reading metrics:', error);
    }
    return [];
  }

  // Get errors data
  getErrors(): SEOError[] {
    try {
      if (fs.existsSync(this.errorsFile)) {
        const data = fs.readFileSync(this.errorsFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error reading errors:', error);
    }
    return [];
  }

  // Clear old data
  clearOldData(daysToKeep: number = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      const cutoffTime = cutoffDate.toISOString();

      // Clean metrics
      const metrics = this.getMetrics().filter(m => m.timestamp > cutoffTime);
      fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2));

      // Clean errors
      const errors = this.getErrors().filter(e => e.timestamp > cutoffTime);
      fs.writeFileSync(this.errorsFile, JSON.stringify(errors, null, 2));

      logger.debug(`Cleaned SEO data older than ${daysToKeep} days`);
    } catch (error) {
      logger.error('Error cleaning old SEO data:', error);
    }
  }
}

export default SEOMonitor;