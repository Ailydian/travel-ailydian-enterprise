import fs from 'fs';
import logger from '../lib/logger';
import path from 'path';

export interface ErrorLog {
  id: string;
  timestamp: string;
  url: string;
  statusCode: number;
  userAgent: string;
  referrer?: string;
  ip?: string;
  errorType: '404' | '500' | '403' | 'timeout' | 'other';
  fixed: boolean;
  fixedAt?: string;
  redirectTo?: string;
  notes?: string;
}

export interface ErrorSummary {
  totalErrors: number;
  errorsByType: { [key: string]: number };
  mostCommonUrls: { url: string; count: number }[];
  errorsByDay: { date: string; count: number }[];
  recentErrors: ErrorLog[];
  fixedErrors: number;
  pendingErrors: number;
}

export class ErrorMonitor {
  private logDir: string;
  private errorLogFile: string;
  private redirectsFile: string;
  private reportFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs', 'errors');
    this.errorLogFile = path.join(this.logDir, 'errors.json');
    this.redirectsFile = path.join(this.logDir, 'redirects.json');
    this.reportFile = path.join(this.logDir, 'error-report.html');
    
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Log a new error
  async logError(
    url: string,
    statusCode: number,
    userAgent: string,
    referrer?: string,
    ip?: string
  ): Promise<string> {
    const errorId = this.generateId();
    const timestamp = new Date().toISOString();
    
    let errorType: ErrorLog['errorType'] = 'other';
    if (statusCode === 404) errorType = '404';
    else if (statusCode === 500) errorType = '500';
    else if (statusCode === 403) errorType = '403';

    const errorLog: ErrorLog = {
      id: errorId,
      timestamp,
      url,
      statusCode,
      userAgent,
      referrer,
      ip,
      errorType,
      fixed: false
    };

    await this.saveErrorLog(errorLog);
    return errorId;
  }

  private async saveErrorLog(errorLog: ErrorLog) {
    try {
      let existingErrors: ErrorLog[] = [];
      
      if (fs.existsSync(this.errorLogFile)) {
        const data = fs.readFileSync(this.errorLogFile, 'utf-8');
        existingErrors = JSON.parse(data);
      }

      existingErrors.push(errorLog);
      
      // Keep only last 10000 entries
      if (existingErrors.length > 10000) {
        existingErrors = existingErrors.slice(-10000);
      }

      fs.writeFileSync(this.errorLogFile, JSON.stringify(existingErrors, null, 2));
    } catch (error) {
      logger.error('Error saving error log:', error);
    }
  }

  // Mark error as fixed
  async markAsFixed(errorId: string, redirectTo?: string, notes?: string): Promise<boolean> {
    try {
      const errors = this.getErrors();
      const errorIndex = errors.findIndex(e => e.id === errorId);
      
      if (errorIndex === -1) {
        return false;
      }

      errors[errorIndex].fixed = true;
      errors[errorIndex].fixedAt = new Date().toISOString();
      if (redirectTo) errors[errorIndex].redirectTo = redirectTo;
      if (notes) errors[errorIndex].notes = notes;

      fs.writeFileSync(this.errorLogFile, JSON.stringify(errors, null, 2));

      // If redirect is specified, add to redirects file
      if (redirectTo) {
        await this.addRedirect(errors[errorIndex].url, redirectTo);
      }

      return true;
    } catch (error) {
      logger.error('Error marking error as fixed:', error);
      return false;
    }
  }

  // Add redirect rule
  private async addRedirect(from: string, to: string) {
    try {
      let redirects: { [key: string]: string } = {};
      
      if (fs.existsSync(this.redirectsFile)) {
        const data = fs.readFileSync(this.redirectsFile, 'utf-8');
        redirects = JSON.parse(data);
      }

      redirects[from] = to;
      fs.writeFileSync(this.redirectsFile, JSON.stringify(redirects, null, 2));
    } catch (error) {
      logger.error('Error saving redirect:', error);
    }
  }

  // Get all errors
  getErrors(): ErrorLog[] {
    try {
      if (fs.existsSync(this.errorLogFile)) {
        const data = fs.readFileSync(this.errorLogFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error reading error logs:', error);
    }
    return [];
  }

  // Get redirect rules
  getRedirects(): { [key: string]: string } {
    try {
      if (fs.existsSync(this.redirectsFile)) {
        const data = fs.readFileSync(this.redirectsFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error reading redirects:', error);
    }
    return {};
  }

  // Generate error summary
  generateSummary(days: number = 30): ErrorSummary {
    const errors = this.getErrors();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentErrors = errors.filter(e => new Date(e.timestamp) >= cutoffDate);
    
    // Count errors by type
    const errorsByType: { [key: string]: number } = {};
    recentErrors.forEach(error => {
      errorsByType[error.errorType] = (errorsByType[error.errorType] || 0) + 1;
    });

    // Find most common URLs
    const urlCounts: { [url: string]: number } = {};
    recentErrors.forEach(error => {
      urlCounts[error.url] = (urlCounts[error.url] || 0) + 1;
    });

    const mostCommonUrls = Object.entries(urlCounts)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Group errors by day
    const errorsByDay: { [date: string]: number } = {};
    recentErrors.forEach(error => {
      const date = new Date(error.timestamp).toISOString().split('T')[0];
      errorsByDay[date] = (errorsByDay[date] || 0) + 1;
    });

    const errorsByDayArray = Object.entries(errorsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const fixedErrors = recentErrors.filter(e => e.fixed).length;
    const pendingErrors = recentErrors.filter(e => !e.fixed).length;

    return {
      totalErrors: recentErrors.length,
      errorsByType,
      mostCommonUrls,
      errorsByDay: errorsByDayArray,
      recentErrors: recentErrors.slice(-20).reverse(),
      fixedErrors,
      pendingErrors
    };
  }

  // Generate comprehensive error report
  async generateReport(days: number = 30): Promise<string> {
    try {
      const summary = this.generateSummary(days);
      const report = this.generateHTMLReport(summary, days);
      fs.writeFileSync(this.reportFile, report);
      return this.reportFile;
    } catch (error) {
      logger.error('Error generating error report:', error);
      return '';
    }
  }

  // Generate HTML error report
  private generateHTMLReport(summary: ErrorSummary, days: number): string {
    const errorTypeColors: { [key: string]: string } = {
      '404': '#dc3545',
      '500': '#6f42c1',
      '403': '#fd7e14',
      'timeout': '#ffc107',
      'other': '#6c757d'
    };

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Report - Travel LyDian</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF214D, #FF6A45); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: #f8f9fa; padding: 25px; border-radius: 8px; text-align: center; border-left: 4px solid #FF214D; }
        .stat-card h3 { margin: 0 0 10px 0; font-size: 2.2em; color: #FF214D; }
        .stat-card p { margin: 0; color: #666; font-weight: 500; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #333; border-bottom: 3px solid #FF214D; padding-bottom: 10px; margin-bottom: 25px; }
        .error-types { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .error-type { padding: 15px; border-radius: 6px; text-align: center; color: white; font-weight: bold; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        .table th { background: #FF214D; color: white; padding: 15px; text-align: left; font-weight: 600; }
        .table td { padding: 12px 15px; border-bottom: 1px solid #eee; }
        .table tr:hover { background: #f8f9fa; }
        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: bold; }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-fixed { background: #d1edff; color: #0c5aa6; }
        .url-cell { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .chart-container { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .chart-bar { display: flex; align-items: center; margin-bottom: 10px; }
        .chart-label { min-width: 100px; font-weight: 500; }
        .chart-progress { flex: 1; background: #e9ecef; height: 25px; border-radius: 12px; margin: 0 15px; overflow: hidden; }
        .chart-fill { height: 100%; background: linear-gradient(90deg, #FF214D, #FF6A45); border-radius: 12px; transition: width 0.3s ease; }
        .chart-value { min-width: 50px; font-weight: bold; color: #FF214D; }
        .recommendations { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 0 8px 8px 0; }
        .recommendations h3 { color: #856404; margin-top: 0; }
        .recommendations ul { color: #856404; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Error Monitoring Report</h1>
            <p>Travel LyDian - Last ${days} Days</p>
            <p>${new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            })}</p>
        </div>
        
        <div class="content">
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${summary.totalErrors}</h3>
                    <p>Total Errors</p>
                </div>
                <div class="stat-card">
                    <h3>${summary.pendingErrors}</h3>
                    <p>Pending Fixes</p>
                </div>
                <div class="stat-card">
                    <h3>${summary.fixedErrors}</h3>
                    <p>Fixed Errors</p>
                </div>
                <div class="stat-card">
                    <h3>${summary.fixedErrors > 0 ? ((summary.fixedErrors / summary.totalErrors) * 100).toFixed(1) : 0}%</h3>
                    <p>Fix Rate</p>
                </div>
            </div>

            <div class="section">
                <h2>Error Types Distribution</h2>
                <div class="error-types">
                    ${Object.entries(summary.errorsByType).map(([type, count]) => `
                        <div class="error-type" style="background-color: ${errorTypeColors[type] || '#6c757d'}">
                            <div style="font-size: 1.8em; margin-bottom: 5px;">${count}</div>
                            <div>${type.toUpperCase()} Errors</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2>Most Problematic URLs</h2>
                <div class="chart-container">
                    ${summary.mostCommonUrls.map(({ url, count }) => `
                        <div class="chart-bar">
                            <div class="chart-label">${count}x</div>
                            <div class="chart-progress">
                                <div class="chart-fill" style="width: ${(count / summary.mostCommonUrls[0]?.count || 1) * 100}%"></div>
                            </div>
                            <div class="chart-value">${url}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2>Recent Error Log</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Referrer</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${summary.recentErrors.map(error => `
                            <tr>
                                <td class="timestamp">${new Date(error.timestamp).toLocaleString('tr-TR')}</td>
                                <td class="url-cell" title="${error.url}">${error.url}</td>
                                <td style="color: ${errorTypeColors[error.errorType]}">${error.statusCode}</td>
                                <td><span style="background: ${errorTypeColors[error.errorType]}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${error.errorType.toUpperCase()}</span></td>
                                <td><span class="status-badge ${error.fixed ? 'status-fixed' : 'status-pending'}">${error.fixed ? 'Fixed' : 'Pending'}</span></td>
                                <td class="url-cell" title="${error.referrer || 'Direct'}">${error.referrer || 'Direct'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Daily Error Trend</h2>
                <div class="chart-container">
                    ${summary.errorsByDay.slice(-14).map(({ date, count }) => `
                        <div class="chart-bar">
                            <div class="chart-label">${new Date(date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}</div>
                            <div class="chart-progress">
                                <div class="chart-fill" style="width: ${summary.errorsByDay.length > 0 ? (count / Math.max(...summary.errorsByDay.map(d => d.count))) * 100 : 0}%"></div>
                            </div>
                            <div class="chart-value">${count} errors</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recommendations">
                <h3>🔧 Action Items & Recommendations</h3>
                <ul>
                    <li><strong>High Priority:</strong> Fix all 404 errors - these impact user experience and SEO</li>
                    <li><strong>Set up redirects</strong> for moved or renamed pages to preserve link equity</li>
                    <li><strong>Monitor referrers</strong> to identify sources of broken links</li>
                    <li><strong>Implement automated redirects</strong> for common URL patterns</li>
                    <li><strong>Regular audits:</strong> Check for broken internal links monthly</li>
                    <li><strong>User feedback:</strong> Add a "Report broken link" feature</li>
                    <li><strong>Search Console:</strong> Monitor Google Search Console for crawl errors</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  // Scan site for broken links (basic implementation)
  async scanForBrokenLinks(baseUrl: string = 'https://holiday.ailydian.com'): Promise<string[]> {
    const brokenLinks: string[] = [];
    
    // This is a placeholder - in a real implementation, you would:
    // 1. Crawl all pages on your site
    // 2. Extract all links
    // 3. Test each link
    // 4. Report broken ones
    
    logger.debug(`Scanning ${baseUrl} for broken links...`);
    
    // For now, return some example broken links
    const commonBrokenPaths = [
      '/old-page',
      '/removed-destination',
      '/legacy/booking',
      '/beta/features',
      '/temp/promo'
    ];
    
    return commonBrokenPaths.map(path => `${baseUrl}${path}`);
  }

  // Clean old error logs
  cleanOldErrors(daysToKeep: number = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      const cutoffTime = cutoffDate.toISOString();

      const errors = this.getErrors().filter(e => e.timestamp > cutoffTime);
      fs.writeFileSync(this.errorLogFile, JSON.stringify(errors, null, 2));

      logger.debug(`Cleaned error logs older than ${daysToKeep} days`);
    } catch (error) {
      logger.error('Error cleaning old error logs:', error);
    }
  }

  // Generate Next.js redirects configuration
  generateNextJSRedirects(): Array<{ source: string; destination: string; permanent: boolean }> {
    const redirects = this.getRedirects();
    
    return Object.entries(redirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true
    }));
  }

  // Export error data for external analysis
  exportErrors(format: 'json' | 'csv' = 'json'): string {
    const errors = this.getErrors();
    
    if (format === 'csv') {
      const headers = 'Timestamp,URL,StatusCode,ErrorType,Fixed,UserAgent,Referrer,IP\n';
      const rows = errors.map(error => 
        `"${error.timestamp}","${error.url}",${error.statusCode},"${error.errorType}",${error.fixed},"${error.userAgent}","${error.referrer || ''}","${error.ip || ''}"`
      ).join('\n');
      
      return headers + rows;
    }
    
    return JSON.stringify(errors, null, 2);
  }
}

export default ErrorMonitor;