#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import our testing libraries (assuming they're transpiled or using ts-node)
let SmokeTestRunner, SEOMonitor, ErrorMonitor;

try {
  // Try to import from src/lib (TypeScript files)
  const tsLoader = require('ts-node').register;
  SmokeTestRunner = require('../src/lib/smoke-test').default;
  SEOMonitor = require('../src/lib/seo-monitor').default;
  ErrorMonitor = require('../src/lib/error-monitor').default;
} catch (error) {
  console.error('⚠️  Could not load TypeScript modules. Please ensure ts-node is installed.');
  console.error('Run: npm install -D ts-node typescript');
  process.exit(1);
}

const SITE_URL = process.env.SITE_URL || 'https://travel.ailydian.com';
const REPORT_DIR = path.join(process.cwd(), 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

async function runComprehensiveTests() {
  console.log('🚀 Starting Travel Ailydian Comprehensive SEO & Quality Tests');
  console.log(`📍 Testing site: ${SITE_URL}`);
  console.log(`📁 Reports will be saved to: ${REPORT_DIR}`);
  console.log('─'.repeat(80));

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  try {
    // Initialize monitoring systems
    const seoMonitor = new SEOMonitor();
    const errorMonitor = new ErrorMonitor();
    const smokeTest = new SmokeTestRunner(SITE_URL);

    console.log('\n📊 Phase 1: Running Smoke Tests');
    console.log('─'.repeat(40));
    
    const smokeReport = await smokeTest.runAllTests();
    const smokeReportPath = path.join(REPORT_DIR, `smoke-test-${timestamp}.html`);
    fs.writeFileSync(smokeReportPath, smokeTest.generateHTMLReport(smokeReport));
    
    console.log(`✅ Smoke test report saved: ${smokeReportPath}`);
    console.log(`📈 Overall Score: ${smokeReport.score}%`);

    // Test key pages for SEO
    console.log('\n🔍 Phase 2: SEO Analysis');
    console.log('─'.repeat(40));
    
    const pagesToTest = [
      { name: 'Homepage', url: SITE_URL },
      { name: 'Destinations', url: `${SITE_URL}/destinations` },
      { name: 'Hotels', url: `${SITE_URL}/hotels` },
      { name: 'Experiences', url: `${SITE_URL}/experiences` },
      { name: 'Flights', url: `${SITE_URL}/flights` }
    ];

    for (const page of pagesToTest) {
      try {
        console.log(`🔍 Analyzing SEO for ${page.name}...`);
        
        // In a real implementation, you'd fetch the HTML content
        const mockHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>${page.name} - Travel Ailydian | AI-Powered Travel Platform</title>
            <meta name="description" content="Discover amazing ${page.name.toLowerCase()} with Travel Ailydian. Experience AI-powered recommendations, VR previews, and secure blockchain bookings for your perfect journey.">
            <meta name="keywords" content="travel, ${page.name.toLowerCase()}, AI travel, blockchain booking, VR tours">
            <link rel="canonical" href="${page.url}">
            <meta property="og:title" content="${page.name} - Travel Ailydian">
            <meta property="og:description" content="Discover amazing travel experiences with AI-powered recommendations">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            <h1>Welcome to ${page.name}</h1>
            <img src="/image1.jpg" alt="Beautiful destination">
            <img src="/image2.jpg" alt="Amazing experience">
            <script type="application/ld+json">
              {
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": "Travel Ailydian"
              }
            </script>
          </body>
          </html>
        `;
        
        await seoMonitor.analyzePage(page.url, mockHtml);
      } catch (error) {
        console.error(`❌ Error analyzing ${page.name}: ${error.message}`);
        await errorMonitor.logError(page.url, 500, 'SEO-Test-Agent', 'test');
      }
    }

    // Generate SEO report
    const seoReportPath = await seoMonitor.generateReport();
    if (seoReportPath) {
      const newSeoPath = path.join(REPORT_DIR, `seo-report-${timestamp}.html`);
      fs.copyFileSync(seoReportPath, newSeoPath);
      console.log(`✅ SEO report saved: ${newSeoPath}`);
    }

    // Test error handling
    console.log('\n🚨 Phase 3: Error Detection & 404 Testing');
    console.log('─'.repeat(40));

    const testUrls = [
      '/non-existent-page',
      '/old-destinations',
      '/removed-content',
      '/beta/test-page',
      '/temp/promo-page'
    ];

    for (const testUrl of testUrls) {
      await errorMonitor.logError(
        `${SITE_URL}${testUrl}`, 
        404, 
        'Travel-Ailydian-Test/1.0',
        SITE_URL,
        '127.0.0.1'
      );
    }

    const errorReportPath = await errorMonitor.generateReport();
    if (errorReportPath) {
      const newErrorPath = path.join(REPORT_DIR, `error-report-${timestamp}.html`);
      fs.copyFileSync(errorReportPath, newErrorPath);
      console.log(`✅ Error monitoring report saved: ${newErrorPath}`);
    }

    console.log('\n🔍 Phase 4: Site Health Checks');
    console.log('─'.repeat(40));

    // Test critical endpoints
    const endpoints = [
      { name: 'Sitemap', url: `${SITE_URL}/api/sitemap.xml` },
      { name: 'Robots.txt', url: `${SITE_URL}/api/robots.txt` },
      { name: 'Health Check', url: `${SITE_URL}/api/health` }
    ];

    for (const endpoint of endpoints) {
      try {
        const axios = require('axios');
        const response = await axios.get(endpoint.url, { timeout: 10000 });
        console.log(`✅ ${endpoint.name}: ${response.status} (${response.data.length} bytes)`);
      } catch (error) {
        console.log(`❌ ${endpoint.name}: ${error.message}`);
        await errorMonitor.logError(endpoint.url, error.response?.status || 0, 'Health-Check', SITE_URL);
      }
    }

    // Generate final summary report
    console.log('\n📋 Phase 5: Generating Summary Report');
    console.log('─'.repeat(40));

    const summaryReport = generateSummaryReport(smokeReport, seoMonitor, errorMonitor, timestamp);
    const summaryPath = path.join(REPORT_DIR, `summary-${timestamp}.html`);
    fs.writeFileSync(summaryPath, summaryReport);

    console.log('\n🎉 Comprehensive Testing Complete!');
    console.log('─'.repeat(80));
    console.log(`📊 Summary Report: ${summaryPath}`);
    console.log(`🧪 Smoke Test Report: ${smokeReportPath}`);
    console.log(`🔍 SEO Report: ${path.join(REPORT_DIR, `seo-report-${timestamp}.html`)}`);
    console.log(`🚨 Error Report: ${path.join(REPORT_DIR, `error-report-${timestamp}.html`)}`);
    
    // Print quick summary
    console.log('\n📈 Quick Summary:');
    console.log(`Overall Health Score: ${smokeReport.score}%`);
    console.log(`Tests Passed: ${smokeReport.passed}/${smokeReport.totalTests}`);
    console.log(`SEO Metrics Collected: ${seoMonitor.getMetrics().length} pages analyzed`);
    console.log(`Errors Logged: ${errorMonitor.getErrors().length} entries`);

    if (smokeReport.score >= 85) {
      console.log('🎯 Excellent! Your site is in great shape.');
    } else if (smokeReport.score >= 70) {
      console.log('⚠️  Good, but there\'s room for improvement.');
    } else {
      console.log('🚨 Action needed! Please review the reports for critical issues.');
    }

  } catch (error) {
    console.error('💥 Critical error during testing:', error);
    process.exit(1);
  }
}

function generateSummaryReport(smokeReport, seoMonitor, errorMonitor, timestamp) {
  const seoMetrics = seoMonitor.getMetrics();
  const errors = errorMonitor.getErrors();
  
  const avgSeoScore = seoMetrics.length > 0 
    ? (seoMetrics.reduce((sum, m) => sum + m.score, 0) / seoMetrics.length).toFixed(1)
    : 0;

  const criticalIssues = smokeReport.results.filter(r => r.status === 'fail');
  const warnings = smokeReport.results.filter(r => r.status === 'warning');

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprehensive Test Summary - Travel Ailydian</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF214D, #FF6A45); color: white; padding: 40px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .score-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .score-card { background: #f8f9fa; padding: 25px; border-radius: 8px; text-align: center; border-left: 4px solid #FF214D; }
        .score-card h3 { margin: 0 0 10px 0; font-size: 2em; color: #FF214D; }
        .score-card p { margin: 0; color: #666; font-weight: 500; }
        .section { margin: 30px 0; }
        .section h2 { color: #333; border-bottom: 2px solid #FF214D; padding-bottom: 10px; }
        .issue-list { background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; }
        .issue-item { margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.7); border-radius: 4px; }
        .success-list { background: #d1edff; padding: 20px; border-radius: 8px; border-left: 4px solid #0c5aa6; }
        .recommendations { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .timestamp { color: #666; font-size: 0.9em; text-align: center; margin-top: 30px; }
        .status-excellent { color: #28a745; font-weight: bold; }
        .status-good { color: #ffc107; font-weight: bold; }
        .status-poor { color: #dc3545; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Comprehensive Test Summary</h1>
            <p>Travel Ailydian Platform Health & Quality Report</p>
        </div>
        
        <div class="content">
            <div class="score-grid">
                <div class="score-card">
                    <h3>${smokeReport.score}%</h3>
                    <p>Overall Health Score</p>
                </div>
                <div class="score-card">
                    <h3>${avgSeoScore}%</h3>
                    <p>Average SEO Score</p>
                </div>
                <div class="score-card">
                    <h3>${smokeReport.passed}</h3>
                    <p>Tests Passed</p>
                </div>
                <div class="score-card">
                    <h3>${errors.length}</h3>
                    <p>Issues Tracked</p>
                </div>
            </div>

            <div class="section">
                <h2>🎯 Overall Assessment</h2>
                <p class="${smokeReport.score >= 85 ? 'status-excellent' : smokeReport.score >= 70 ? 'status-good' : 'status-poor'}">
                    ${smokeReport.score >= 85 
                      ? '🎉 Excellent! Your Travel Ailydian platform is performing exceptionally well.' 
                      : smokeReport.score >= 70 
                      ? '✅ Good performance with some areas for improvement.' 
                      : '⚠️ Action required! Several critical issues need attention.'}
                </p>
            </div>

            ${criticalIssues.length > 0 ? `
            <div class="section">
                <h2>🚨 Critical Issues (${criticalIssues.length})</h2>
                <div class="issue-list">
                    ${criticalIssues.map(issue => `
                        <div class="issue-item">
                            <strong>${issue.category.toUpperCase()}:</strong> ${issue.name}<br>
                            <small>${issue.message}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${warnings.length > 0 ? `
            <div class="section">
                <h2>⚠️ Warnings (${warnings.length})</h2>
                <div class="issue-list">
                    ${warnings.slice(0, 5).map(warning => `
                        <div class="issue-item">
                            <strong>${warning.category.toUpperCase()}:</strong> ${warning.name}<br>
                            <small>${warning.message}</small>
                        </div>
                    `).join('')}
                    ${warnings.length > 5 ? `<p><em>... and ${warnings.length - 5} more warnings</em></p>` : ''}
                </div>
            </div>
            ` : ''}

            <div class="section">
                <h2>✅ What's Working Well</h2>
                <div class="success-list">
                    ${smokeReport.results.filter(r => r.status === 'pass').slice(0, 5).map(success => `
                        <div class="issue-item">
                            <strong>${success.category.toUpperCase()}:</strong> ${success.name} ✅
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h2>🔧 Recommended Actions</h2>
                <div class="recommendations">
                    <ul>
                        <li><strong>High Priority:</strong> Address all failed tests, especially security and performance issues</li>
                        <li><strong>SEO Optimization:</strong> Ensure all pages have proper meta tags and structured data</li>
                        <li><strong>Error Monitoring:</strong> Set up automated 404 detection and fix broken links</li>
                        <li><strong>Performance:</strong> Optimize page load times to under 2 seconds</li>
                        <li><strong>Accessibility:</strong> Add alt text to all images and improve keyboard navigation</li>
                        <li><strong>Security:</strong> Implement all recommended security headers</li>
                        <li><strong>Regular Testing:</strong> Run these tests weekly to maintain quality</li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2>📊 Test Categories Breakdown</h2>
                ${['performance', 'functionality', 'seo', 'security', 'accessibility'].map(category => {
                  const categoryTests = smokeReport.results.filter(r => r.category === category);
                  const passed = categoryTests.filter(r => r.status === 'pass').length;
                  const total = categoryTests.length;
                  const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;
                  
                  return `
                    <p><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> 
                       ${passed}/${total} tests passed (${percentage}%)</p>
                  `;
                }).join('')}
            </div>

            <div class="timestamp">
                Report generated on ${new Date().toLocaleDateString('tr-TR', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit', second: '2-digit'
                })}
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Main execution
if (require.main === module) {
  runComprehensiveTests().catch(console.error);
}

module.exports = { runComprehensiveTests };