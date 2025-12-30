const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const consoleMessages = [];
  const errors = [];
  const networkErrors = [];

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Capture console messages
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({
      type: type,
      text: text,
      timestamp: new Date().toISOString()
    });
    console.log(`[CONSOLE ${type.toUpperCase()}]:`, text);
  });

  // Capture page errors
  page.on('pageerror', error => {
    errors.push({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    console.log('[PAGE ERROR]:', error.message);
    console.log('[STACK]:', error.stack);
  });

  // Capture failed requests
  page.on('requestfailed', request => {
    networkErrors.push({
      url: request.url(),
      failure: request.failure().errorText,
      timestamp: new Date().toISOString()
    });
    console.log('[REQUEST FAILED]:', request.url(), request.failure().errorText);
  });

  // Capture response errors
  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      });
      console.log(`[HTTP ERROR ${response.status()}]:`, response.url());
    }
  });

  try {
    console.log('Navigating to https://travel.ailydian.com...');
    await page.goto('https://travel.ailydian.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('Page loaded, waiting for additional errors...');
    // Wait a bit more to catch any delayed errors
    await page.waitForTimeout(5000);

    // Try to execute some JavaScript to trigger potential errors
    const runtimeErrors = await page.evaluate(() => {
      const errors = [];
      // Check if there are any global error handlers that caught errors
      if (window.__errors) {
        errors.push(...window.__errors);
      }
      return errors;
    });

    if (runtimeErrors.length > 0) {
      errors.push(...runtimeErrors);
    }

    // Take screenshot
    await page.screenshot({ path: '/tmp/site_screenshot.png', fullPage: true });
    console.log('Screenshot saved to /tmp/site_screenshot.png');

  } catch (error) {
    console.log('[NAVIGATION ERROR]:', error.message);
    errors.push({
      message: `Navigation error: ${error.message}`,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  await browser.close();

  // Compile report
  const report = {
    url: 'https://travel.ailydian.com',
    capturedAt: new Date().toISOString(),
    summary: {
      totalConsoleMessages: consoleMessages.length,
      totalPageErrors: errors.length,
      totalNetworkErrors: networkErrors.length
    },
    consoleMessages: consoleMessages,
    pageErrors: errors,
    networkErrors: networkErrors
  };

  // Save detailed report
  const detailedReport = JSON.stringify(report, null, 2);
  fs.writeFileSync('/tmp/current_console_errors.json', detailedReport);

  // Create human-readable report
  let textReport = `=================================================================
PRODUCTION SITE CONSOLE ERRORS - EXACT CAPTURE
=================================================================
URL: https://travel.ailydian.com
Captured At: ${report.capturedAt}

=================================================================
SUMMARY
=================================================================
Console Messages: ${report.summary.totalConsoleMessages}
Page Errors: ${report.summary.totalPageErrors}
Network Errors: ${report.summary.totalNetworkErrors}

`;

  if (errors.length > 0) {
    textReport += `\n=================================================================
PAGE ERRORS (EXACT ERROR MESSAGES)
=================================================================\n\n`;
    errors.forEach((error, idx) => {
      textReport += `ERROR #${idx + 1}:\n`;
      textReport += `Timestamp: ${error.timestamp}\n`;
      textReport += `Message: ${error.message}\n`;
      if (error.stack) {
        textReport += `Stack Trace:\n${error.stack}\n`;
      }
      textReport += `\n${'='.repeat(65)}\n\n`;
    });
  }

  if (consoleMessages.length > 0) {
    textReport += `\n=================================================================
CONSOLE MESSAGES (ALL TYPES)
=================================================================\n\n`;
    consoleMessages.forEach((msg, idx) => {
      textReport += `[${msg.type.toUpperCase()}] ${msg.timestamp}\n`;
      textReport += `${msg.text}\n`;
      textReport += `${'-'.repeat(65)}\n`;
    });
  }

  if (networkErrors.length > 0) {
    textReport += `\n=================================================================
NETWORK ERRORS
=================================================================\n\n`;
    networkErrors.forEach((err, idx) => {
      textReport += `NETWORK ERROR #${idx + 1}:\n`;
      textReport += `Timestamp: ${err.timestamp}\n`;
      textReport += `URL: ${err.url}\n`;
      if (err.status) {
        textReport += `HTTP Status: ${err.status} ${err.statusText}\n`;
      }
      if (err.failure) {
        textReport += `Failure: ${err.failure}\n`;
      }
      textReport += `\n`;
    });
  }

  if (errors.length === 0 && consoleMessages.filter(m => m.type === 'error').length === 0) {
    textReport += `\n=================================================================
NO ERRORS DETECTED
=================================================================
The page loaded successfully without any JavaScript errors or
console errors. The site appears to be working correctly.
\n`;
  }

  fs.writeFileSync('/tmp/current_console_errors.txt', textReport);

  console.log('\n=================================================================');
  console.log('CAPTURE COMPLETE');
  console.log('=================================================================');
  console.log('Reports saved:');
  console.log('  - /tmp/current_console_errors.txt (human-readable)');
  console.log('  - /tmp/current_console_errors.json (structured data)');
  console.log('  - /tmp/site_screenshot.png (screenshot)');
  console.log('=================================================================\n');

  // Exit with error code if there were errors
  process.exit(errors.length > 0 ? 1 : 0);
})();
