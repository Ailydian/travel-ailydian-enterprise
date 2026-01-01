import axios from 'axios';
import logger from '../lib/logger';
import puppeteer, { Browser, Page } from 'puppeteer';

export interface TestResult {
  id: string;
  name: string;
  category: 'performance' | 'functionality' | 'seo' | 'security' | 'accessibility';
  status: 'pass' | 'fail' | 'warning' | 'skip';
  message: string;
  details?: any;
  duration: number;
  timestamp: string;
  url?: string;
}

export interface SmokeTestReport {
  testId: string;
  timestamp: string;
  duration: number;
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  skipped: number;
  score: number;
  results: TestResult[];
  environment: {
    baseUrl: string;
    userAgent: string;
    viewport: { width: number; height: number };
  };
}

export class SmokeTestRunner {
  private baseUrl: string;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private results: TestResult[] = [];
  private testStartTime: number = 0;

  constructor(baseUrl: string = 'https://holiday.ailydian.com') {
    this.baseUrl = baseUrl;
  }

  private generateTestId(): string {
    return `smoke-test-${Date.now()}`;
  }

  private async startTest(name: string, category: TestResult['category']): Promise<{ startTime: number; testId: string }> {
    const testId = this.generateTestId();
    const startTime = Date.now();
    logger.debug(`🧪 Starting ${category} test: ${name}`, { component: 'smoke-test' });
    return { startTime, testId };
  }

  private async endTest(
    testId: string,
    startTime: number,
    name: string,
    category: TestResult['category'],
    status: TestResult['status'],
    message: string,
    details?: any,
    url?: string
  ) {
    const duration = Date.now() - startTime;
    const result: TestResult = {
      id: testId,
      name,
      category,
      status,
      message,
      details,
      duration,
      timestamp: new Date().toISOString(),
      url
    };

    this.results.push(result);
    
    const statusIcon = {
      'pass': '✅',
      'fail': '❌',
      'warning': '⚠️',
      'skip': '⏭️'
    }[status];

    logger.debug(`${statusIcon} ${name}: ${message} (${duration}ms)`, { component: 'smoke-test' });
  }

  async initializeBrowser(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });

      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1920, height: 1080 });
      await this.page.setUserAgent('Mozilla/5.0 (compatible; Travel-LyDian-SmokeTest/1.0)');
      
      logger.debug('Log', { component: 'smoke-test', metadata: { data: '🚀 Browser initialized for testing' } });
    } catch (error) {
      logger.error('Failed to initialize browser:', error as Error, { component: 'smoke-test' });
      throw error;
    }
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      logger.debug('Log', { component: 'smoke-test', metadata: { data: '🔒 Browser closed' } });
    }
  }

  // Performance Tests
  async runPerformanceTests(): Promise<void> {
    const pages = [
      { name: 'Homepage', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Hotels', path: '/hotels' },
      { name: 'Experiences', path: '/experiences' },
      { name: 'Flights', path: '/flights' }
    ];

    for (const page of pages) {
      const { testId, startTime } = await this.startTest(`Page Load Speed - ${page.name}`, 'performance');
      const url = `${this.baseUrl}${page.path}`;

      try {
        const loadStartTime = Date.now();
        const response = await this.page!.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
        const loadTime = Date.now() - loadStartTime;

        if (response && response.ok()) {
          if (loadTime < 2000) {
            await this.endTest(testId, startTime, `Page Load Speed - ${page.name}`, 'performance', 'pass', 
              `Page loaded in ${loadTime}ms`, { loadTime }, url);
          } else if (loadTime < 3000) {
            await this.endTest(testId, startTime, `Page Load Speed - ${page.name}`, 'performance', 'warning', 
              `Page loaded in ${loadTime}ms (slow)`, { loadTime }, url);
          } else {
            await this.endTest(testId, startTime, `Page Load Speed - ${page.name}`, 'performance', 'fail', 
              `Page loaded in ${loadTime}ms (too slow)`, { loadTime }, url);
          }
        } else {
          await this.endTest(testId, startTime, `Page Load Speed - ${page.name}`, 'performance', 'fail', 
            `Failed to load page: ${response?.status()}`, { statusCode: response?.status() }, url);
        }
      } catch (error) {
        await this.endTest(testId, startTime, `Page Load Speed - ${page.name}`, 'performance', 'fail', 
          `Error loading page: ${(error as Error).message}`, { error: (error as Error).message }, url);
      }
    }
  }

  // Functionality Tests
  async runFunctionalityTests(): Promise<void> {
    await this.testNavigation();
    await this.testSearch();
    await this.testLanguageSwitching();
    await this.testCartFunctionality();
    await this.testFormSubmissions();
  }

  private async testNavigation(): Promise<void> {
    const { testId, startTime } = await this.startTest('Navigation Menu', 'functionality');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const navLinks = await this.page!.$$eval('nav a[href]', links => 
        links.map(link => ({ href: link.getAttribute('href'), text: link.textContent?.trim() }))
      );

      if (navLinks.length > 0) {
        await this.endTest(testId, startTime, 'Navigation Menu', 'functionality', 'pass', 
          `Found ${navLinks.length} navigation links`, { navLinks }, url);
      } else {
        await this.endTest(testId, startTime, 'Navigation Menu', 'functionality', 'fail', 
          'No navigation links found', { navLinks }, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Navigation Menu', 'functionality', 'fail', 
        `Navigation test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testSearch(): Promise<void> {
    const { testId, startTime } = await this.startTest('Search Functionality', 'functionality');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const searchInput = await this.page!.$('input[type="search"], input[placeholder*="search"], input[placeholder*="ara"]');
      
      if (searchInput) {
        await searchInput.type('Istanbul');
        await this.page!.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const currentUrl = this.page!.url();
        if (currentUrl.includes('search') || currentUrl.includes('Istanbul')) {
          await this.endTest(testId, startTime, 'Search Functionality', 'functionality', 'pass', 
            'Search functionality works correctly', { searchTerm: 'Istanbul', resultUrl: currentUrl }, url);
        } else {
          await this.endTest(testId, startTime, 'Search Functionality', 'functionality', 'warning', 
            'Search may not be working as expected', { searchTerm: 'Istanbul', resultUrl: currentUrl }, url);
        }
      } else {
        await this.endTest(testId, startTime, 'Search Functionality', 'functionality', 'warning', 
          'Search input not found', null, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Search Functionality', 'functionality', 'fail', 
        `Search test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testLanguageSwitching(): Promise<void> {
    const { testId, startTime } = await this.startTest('Language Switching', 'functionality');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const langSwitcher = await this.page!.$('[data-testid="language-switcher"], .language-selector, select[name="language"]');
      
      if (langSwitcher) {
        await this.endTest(testId, startTime, 'Language Switching', 'functionality', 'pass', 
          'Language switcher found', null, url);
      } else {
        await this.endTest(testId, startTime, 'Language Switching', 'functionality', 'warning', 
          'Language switcher not found', null, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Language Switching', 'functionality', 'fail', 
        `Language switching test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testCartFunctionality(): Promise<void> {
    const { testId, startTime } = await this.startTest('Cart Functionality', 'functionality');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const cartIcon = await this.page!.$('[data-testid="cart"], .cart-icon, a[href="/cart"], a[href*="cart"]');
      
      if (cartIcon) {
        await cartIcon.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const currentUrl = this.page!.url();
        if (currentUrl.includes('cart')) {
          await this.endTest(testId, startTime, 'Cart Functionality', 'functionality', 'pass', 
            'Cart navigation works correctly', { cartUrl: currentUrl }, url);
        } else {
          await this.endTest(testId, startTime, 'Cart Functionality', 'functionality', 'warning', 
            'Cart icon found but navigation may not work', { cartUrl: currentUrl }, url);
        }
      } else {
        await this.endTest(testId, startTime, 'Cart Functionality', 'functionality', 'warning', 
          'Cart icon not found', null, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Cart Functionality', 'functionality', 'fail', 
        `Cart functionality test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testFormSubmissions(): Promise<void> {
    const { testId, startTime } = await this.startTest('Form Validation', 'functionality');
    const url = `${this.baseUrl}/contact`;

    try {
      await this.page!.goto(url);
      
      const forms = await this.page!.$$('form');
      
      if (forms.length > 0) {
        const form = forms[0];
        const inputs = await form.$$('input[required], textarea[required]');
        
        if (inputs.length > 0) {
          // Try to submit empty form to test validation
          await form.$eval('button[type="submit"], input[type="submit"]', button => (button as HTMLElement).click())
            .catch(() => {});
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const validationMessages = await this.page!.$$('.error, .invalid, [data-error], .field-error');
          
          if (validationMessages.length > 0) {
            await this.endTest(testId, startTime, 'Form Validation', 'functionality', 'pass', 
              'Form validation works correctly', { validationCount: validationMessages.length }, url);
          } else {
            await this.endTest(testId, startTime, 'Form Validation', 'functionality', 'warning', 
              'Form validation may not be working', null, url);
          }
        } else {
          await this.endTest(testId, startTime, 'Form Validation', 'functionality', 'skip', 
            'No required form fields found', null, url);
        }
      } else {
        await this.endTest(testId, startTime, 'Form Validation', 'functionality', 'skip', 
          'No forms found on contact page', null, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Form Validation', 'functionality', 'fail', 
        `Form validation test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  // SEO Tests
  async runSEOTests(): Promise<void> {
    const pages = [
      { name: 'Homepage', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: 'Hotels', path: '/hotels' }
    ];

    for (const page of pages) {
      await this.testPageSEO(page.name, page.path);
    }

    await this.testSitemap();
    await this.testRobotsTxt();
  }

  private async testPageSEO(pageName: string, path: string): Promise<void> {
    const { testId, startTime } = await this.startTest(`SEO - ${pageName}`, 'seo');
    const url = `${this.baseUrl}${path}`;

    try {
      await this.page!.goto(url);
      
      const title = await this.page!.title();
      const description = await this.page!.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => '');
      const h1Count = await this.page!.$$eval('h1', elements => elements.length);
      const canonicalUrl = await this.page!.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => '');
      const ogTitle = await this.page!.$eval('meta[property="og:title"]', el => el.getAttribute('content')).catch(() => '');
      const structuredData = await this.page!.$eval('script[type="application/ld+json"]', el => el.textContent).catch(() => '');

      let score = 0;
      const issues = [];

      if (title && title.length >= 30 && title.length <= 60) score += 20;
      else issues.push(`Title length issue: ${title?.length || 0} chars`);

      if (description && description.length >= 120 && description.length <= 160) score += 20;
      else issues.push(`Description length issue: ${description?.length || 0} chars`);

      if (h1Count === 1) score += 20;
      else issues.push(`H1 count issue: ${h1Count} H1 tags`);

      if (canonicalUrl) score += 15;
      else issues.push('Missing canonical URL');

      if (ogTitle) score += 15;
      else issues.push('Missing Open Graph title');

      if (structuredData) score += 10;
      else issues.push('Missing structured data');

      const status = score >= 80 ? 'pass' : score >= 60 ? 'warning' : 'fail';
      const message = issues.length === 0 ? 'All SEO checks passed' : `Issues found: ${issues.join(', ')}`;

      await this.endTest(testId, startTime, `SEO - ${pageName}`, 'seo', status, message, {
        score,
        title: { content: title, length: title?.length },
        description: { content: description, length: description?.length },
        h1Count,
        canonicalUrl,
        ogTitle,
        hasStructuredData: !!structuredData,
        issues
      }, url);
    } catch (error) {
      await this.endTest(testId, startTime, `SEO - ${pageName}`, 'seo', 'fail', 
        `SEO test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testSitemap(): Promise<void> {
    const { testId, startTime } = await this.startTest('Sitemap Accessibility', 'seo');
    const url = `${this.baseUrl}/api/sitemap.xml`;

    try {
      const response = await axios.get(url, { timeout: 5000 });
      
      if (response.status === 200 && response.data.includes('<urlset')) {
        const urlCount = (response.data.match(/<loc>/g) || []).length;
        await this.endTest(testId, startTime, 'Sitemap Accessibility', 'seo', 'pass', 
          `Sitemap accessible with ${urlCount} URLs`, { urlCount, status: response.status }, url);
      } else {
        await this.endTest(testId, startTime, 'Sitemap Accessibility', 'seo', 'fail', 
          `Invalid sitemap response: ${response.status}`, { status: response.status }, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Sitemap Accessibility', 'seo', 'fail', 
        `Sitemap not accessible: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testRobotsTxt(): Promise<void> {
    const { testId, startTime } = await this.startTest('Robots.txt Accessibility', 'seo');
    const url = `${this.baseUrl}/api/robots.txt`;

    try {
      const response = await axios.get(url, { timeout: 5000 });
      
      if (response.status === 200 && response.data.includes('User-agent:')) {
        await this.endTest(testId, startTime, 'Robots.txt Accessibility', 'seo', 'pass', 
          'Robots.txt accessible and valid', { status: response.status }, url);
      } else {
        await this.endTest(testId, startTime, 'Robots.txt Accessibility', 'seo', 'fail', 
          `Invalid robots.txt response: ${response.status}`, { status: response.status }, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Robots.txt Accessibility', 'seo', 'fail', 
        `Robots.txt not accessible: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  // Security Tests
  async runSecurityTests(): Promise<void> {
    await this.testHTTPS();
    await this.testSecurityHeaders();
    await this.testCSP();
  }

  private async testHTTPS(): Promise<void> {
    const { testId, startTime } = await this.startTest('HTTPS Enforcement', 'security');
    const httpUrl = this.baseUrl.replace('https://', 'http://');

    try {
      const response = await axios.get(httpUrl, { 
        maxRedirects: 0,
        timeout: 5000,
        validateStatus: () => true 
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.location;
        if (location && location.startsWith('https://')) {
          await this.endTest(testId, startTime, 'HTTPS Enforcement', 'security', 'pass', 
            'HTTP redirects to HTTPS correctly', { redirectLocation: location }, httpUrl);
        } else {
          await this.endTest(testId, startTime, 'HTTPS Enforcement', 'security', 'fail', 
            'HTTP does not redirect to HTTPS', { redirectLocation: location }, httpUrl);
        }
      } else {
        await this.endTest(testId, startTime, 'HTTPS Enforcement', 'security', 'fail', 
          'HTTP should redirect to HTTPS', { status: response.status }, httpUrl);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'HTTPS Enforcement', 'security', 'warning', 
        'Could not test HTTP redirect', { error: (error as Error).message }, httpUrl);
    }
  }

  private async testSecurityHeaders(): Promise<void> {
    const { testId, startTime } = await this.startTest('Security Headers', 'security');
    const url = this.baseUrl;

    try {
      const response = await axios.get(url, { timeout: 5000 });
      const headers = response.headers;
      
      const securityHeaders = {
        'x-frame-options': 'X-Frame-Options',
        'x-content-type-options': 'X-Content-Type-Options',
        'x-xss-protection': 'X-XSS-Protection',
        'strict-transport-security': 'Strict-Transport-Security',
        'content-security-policy': 'Content-Security-Policy'
      };

      const presentHeaders: string[] = [];
      const missingHeaders: string[] = [];

      Object.entries(securityHeaders).forEach(([key, name]) => {
        if (headers[key]) {
          presentHeaders.push(name);
        } else {
          missingHeaders.push(name);
        }
      });

      const status = missingHeaders.length <= 1 ? 'pass' : missingHeaders.length <= 3 ? 'warning' : 'fail';
      const message = missingHeaders.length === 0 
        ? 'All security headers present' 
        : `Missing headers: ${missingHeaders.join(', ')}`;

      await this.endTest(testId, startTime, 'Security Headers', 'security', status, message, {
        presentHeaders,
        missingHeaders
      }, url);
    } catch (error) {
      await this.endTest(testId, startTime, 'Security Headers', 'security', 'fail', 
        `Security headers test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  private async testCSP(): Promise<void> {
    const { testId, startTime } = await this.startTest('Content Security Policy', 'security');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const cspViolations = await this.page!.evaluate(() => {
        return new Promise((resolve) => {
          const violations: any[] = [];
          document.addEventListener('securitypolicyviolation', (e) => {
            violations.push({
              directive: e.violatedDirective,
              blocked: e.blockedURI,
              source: e.sourceFile
            });
          });
          
          setTimeout(() => resolve(violations), 3000);
        });
      });

      if (Array.isArray(cspViolations) && cspViolations.length === 0) {
        await this.endTest(testId, startTime, 'Content Security Policy', 'security', 'pass', 
          'No CSP violations detected', null, url);
      } else if (Array.isArray(cspViolations) && cspViolations.length <= 2) {
        await this.endTest(testId, startTime, 'Content Security Policy', 'security', 'warning', 
          `${cspViolations.length} CSP violations detected`, { violations: cspViolations }, url);
      } else {
        await this.endTest(testId, startTime, 'Content Security Policy', 'security', 'fail', 
          `${Array.isArray(cspViolations) ? cspViolations.length : 'Multiple'} CSP violations detected`, { violations: cspViolations }, url);
      }
    } catch (error) {
      await this.endTest(testId, startTime, 'Content Security Policy', 'security', 'skip', 
        'CSP test could not be completed', { error: (error as Error).message }, url);
    }
  }

  // Accessibility Tests
  async runAccessibilityTests(): Promise<void> {
    const { testId, startTime } = await this.startTest('Basic Accessibility', 'accessibility');
    const url = this.baseUrl;

    try {
      await this.page!.goto(url);
      
      const imagesWithoutAlt = await this.page!.$$eval('img:not([alt]), img[alt=""]', imgs => imgs.length);
      const linksWithoutText = await this.page!.$$eval('a:empty, a:not([aria-label]):not([title])', links => 
        links.filter(link => !link.textContent?.trim()).length
      );
      const hasSkipLink = await this.page!.$('a[href="#main"], a[href="#content"], .skip-link') !== null;
      const headingStructure = await this.page!.$$eval('h1, h2, h3, h4, h5, h6', headings => 
        headings.map(h => h.tagName.toLowerCase())
      );

      const issues = [];
      if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} images without alt text`);
      if (linksWithoutText > 0) issues.push(`${linksWithoutText} links without accessible text`);
      if (!hasSkipLink) issues.push('Missing skip link');
      if (!headingStructure.includes('h1')) issues.push('Missing H1 heading');

      const status = issues.length === 0 ? 'pass' : issues.length <= 2 ? 'warning' : 'fail';
      const message = issues.length === 0 ? 'Basic accessibility checks passed' : `Issues: ${issues.join(', ')}`;

      await this.endTest(testId, startTime, 'Basic Accessibility', 'accessibility', status, message, {
        imagesWithoutAlt,
        linksWithoutText,
        hasSkipLink,
        headingStructure,
        issues
      }, url);
    } catch (error) {
      await this.endTest(testId, startTime, 'Basic Accessibility', 'accessibility', 'fail', 
        `Accessibility test failed: ${(error as Error).message}`, { error: (error as Error).message }, url);
    }
  }

  // Run all tests
  async runAllTests(): Promise<SmokeTestReport> {
    this.testStartTime = Date.now();
    this.results = [];

    logger.debug('Log', { component: 'smoke-test', metadata: { data: '🚀 Starting comprehensive smoke tests...' } });
    
    try {
      await this.initializeBrowser();
      
      await this.runPerformanceTests();
      await this.runFunctionalityTests();
      await this.runSEOTests();
      await this.runSecurityTests();
      await this.runAccessibilityTests();
      
    } catch (error) {
      logger.error('Error during tests:', error as Error, { component: 'smoke-test' });
    } finally {
      await this.closeBrowser();
    }

    const duration = Date.now() - this.testStartTime;
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const skipped = this.results.filter(r => r.status === 'skip').length;
    
    const score = Math.round(((passed + (warnings * 0.5)) / this.results.length) * 100);

    const report: SmokeTestReport = {
      testId: this.generateTestId(),
      timestamp: new Date().toISOString(),
      duration,
      totalTests: this.results.length,
      passed,
      failed,
      warnings,
      skipped,
      score,
      results: this.results,
      environment: {
        baseUrl: this.baseUrl,
        userAgent: 'Mozilla/5.0 (compatible; Travel-LyDian-SmokeTest/1.0)',
        viewport: { width: 1920, height: 1080 }
      }
    };

    logger.debug(`\n📊 Smoke Test Results:`, { component: 'smoke-test' });
    logger.debug(`✅ Passed: ${passed}`, { component: 'smoke-test' });
    logger.debug(`❌ Failed: ${failed}`, { component: 'smoke-test' });
    logger.debug(`⚠️  Warnings: ${warnings}`, { component: 'smoke-test' });
    logger.debug(`⏭️  Skipped: ${skipped}`, { component: 'smoke-test' });
    logger.debug(`📈 Overall Score: ${score}%`, { component: 'smoke-test' });
    logger.debug(`⏱️  Total Duration: ${duration}ms`, { component: 'smoke-test' });

    return report;
  }

  // Generate HTML report
  generateHTMLReport(report: SmokeTestReport): string {
    const categoryColors: { [key: string]: string } = {
      performance: '#17a2b8',
      functionality: '#28a745',
      seo: '#ffc107',
      security: '#dc3545',
      accessibility: '#6f42c1'
    };

    const statusColors: { [key: string]: string } = {
      pass: '#28a745',
      fail: '#dc3545',
      warning: '#ffc107',
      skip: '#6c757d'
    };

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smoke Test Report - Travel LyDian</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF214D, #FF6A45); color: white; padding: 40px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 3em; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1.2em; }
        .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .score-circle { width: 120px; height: 120px; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 2em; font-weight: bold; color: white; }
        .score-excellent { background: linear-gradient(45deg, #28a745, #20c997); }
        .score-good { background: linear-gradient(45deg, #ffc107, #fd7e14); }
        .score-poor { background: linear-gradient(45deg, #dc3545, #e83e8c); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; margin: 40px 0; }
        .stat-card { padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .stat-card h3 { margin: 0 0 10px 0; font-size: 2.2em; }
        .stat-card p { margin: 0; color: #666; font-weight: 500; }
        .results-section { margin-top: 40px; }
        .results-section h2 { color: #333; border-bottom: 3px solid #FF214D; padding-bottom: 10px; margin-bottom: 30px; }
        .test-result { background: white; border-left: 4px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .test-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .test-name { font-weight: bold; font-size: 1.1em; }
        .test-category { padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; color: white; }
        .test-status { padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; color: white; }
        .test-message { color: #666; margin: 10px 0; }
        .test-details { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px; font-family: monospace; font-size: 0.9em; }
        .test-duration { color: #999; font-size: 0.9em; }
        .category-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .category-card { padding: 20px; border-radius: 8px; color: white; }
        .category-card h3 { margin: 0 0 15px 0; }
        .category-stats { display: flex; justify-content: space-between; }
        .category-stat { text-align: center; }
        .category-stat div:first-child { font-size: 1.5em; font-weight: bold; }
        .category-stat div:last-child { opacity: 0.9; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Smoke Test Report</h1>
            <p>Travel LyDian Platform Health Check</p>
            <p>${new Date(report.timestamp).toLocaleDateString('tr-TR', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
              hour: '2-digit', minute: '2-digit' 
            })}</p>
        </div>
        
        <div class="content">
            <div style="text-align: center;">
                <div class="score-circle ${
                  report.score >= 85 ? 'score-excellent' : 
                  report.score >= 70 ? 'score-good' : 'score-poor'
                }">${report.score}%</div>
                <p style="font-size: 1.2em; color: #666; margin-top: 10px;">Overall Health Score</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card" style="background: #28a745; color: white;">
                    <h3>${report.passed}</h3>
                    <p>Tests Passed</p>
                </div>
                <div class="stat-card" style="background: #dc3545; color: white;">
                    <h3>${report.failed}</h3>
                    <p>Tests Failed</p>
                </div>
                <div class="stat-card" style="background: #ffc107; color: white;">
                    <h3>${report.warnings}</h3>
                    <p>Warnings</p>
                </div>
                <div class="stat-card" style="background: #6c757d; color: white;">
                    <h3>${Math.round(report.duration / 1000)}s</h3>
                    <p>Test Duration</p>
                </div>
            </div>

            ${Object.entries(['performance', 'functionality', 'seo', 'security', 'accessibility']
              .reduce((acc, category) => {
                const categoryTests = report.results.filter(r => r.category === category);
                if (categoryTests.length > 0) {
                  const passed = categoryTests.filter(r => r.status === 'pass').length;
                  const failed = categoryTests.filter(r => r.status === 'fail').length;
                  const warnings = categoryTests.filter(r => r.status === 'warning').length;
                  const skipped = categoryTests.filter(r => r.status === 'skip').length;
                  
                  acc[category] = { total: categoryTests.length, passed, failed, warnings, skipped };
                }
                return acc;
              }, {} as any))
              .map(([category, stats]: [string, any]) => `
                <div class="category-card" style="background: ${categoryColors[category]}">
                    <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Tests</h3>
                    <div class="category-stats">
                        <div class="category-stat">
                            <div>${stats.passed}</div>
                            <div>Passed</div>
                        </div>
                        <div class="category-stat">
                            <div>${stats.failed}</div>
                            <div>Failed</div>
                        </div>
                        <div class="category-stat">
                            <div>${stats.warnings}</div>
                            <div>Warnings</div>
                        </div>
                        <div class="category-stat">
                            <div>${stats.total}</div>
                            <div>Total</div>
                        </div>
                    </div>
                </div>
              `).join('')}
            </div>

            <div class="results-section">
                <h2>Detailed Test Results</h2>
                ${report.results.map(result => `
                    <div class="test-result" style="border-left-color: ${statusColors[result.status]}">
                        <div class="test-header">
                            <span class="test-name">${result.name}</span>
                            <div>
                                <span class="test-category" style="background: ${categoryColors[result.category]}">${result.category.toUpperCase()}</span>
                                <span class="test-status" style="background: ${statusColors[result.status]}">${result.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="test-message">${result.message}</div>
                        ${result.details ? `<div class="test-details">${JSON.stringify(result.details, null, 2)}</div>` : ''}
                        <div class="test-duration">Duration: ${result.duration}ms ${result.url ? `• URL: ${result.url}` : ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;
  }
}

export default SmokeTestRunner;