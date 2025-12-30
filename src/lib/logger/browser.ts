/**
 * Browser-Safe Logger
 * For client-side components only
 * NO Node.js dependencies (no fs, no winston, no path)
 */

export interface BrowserLogContext {
  readonly component?: string;
  readonly action?: string;
  readonly metadata?: Record<string, unknown>;
}

class BrowserLogger {
  private readonly isDevelopment: boolean;

  constructor() {
    this.isDevelopment = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }

  private formatMessage(level: string, message: string, context?: BrowserLogContext): string {
    const parts = [
      `[${new Date().toISOString()}]`,
      `[${level}]`,
      context?.component && `[${context.component}]`,
      context?.action && `{${context.action}}`,
      message,
    ].filter(Boolean);

    return parts.join(' ');
  }

  public debug(message: string, context?: BrowserLogContext): void {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage('DEBUG', message, context);
    console.debug(formatted, context?.metadata || '');
  }

  public info(message: string, context?: BrowserLogContext): void {
    const formatted = this.formatMessage('INFO', message, context);
    console.log(formatted, context?.metadata || '');
  }

  public warn(message: string, context?: BrowserLogContext): void {
    const formatted = this.formatMessage('WARN', message, context);
    console.warn(formatted, context?.metadata || '');
  }

  public error(message: string, error?: Error | unknown, context?: BrowserLogContext): void {
    const formatted = this.formatMessage('ERROR', message, context);
    console.error(formatted, error, context?.metadata || '');
  }
}

// Export singleton instance
export const browserLogger = new BrowserLogger();
export default browserLogger;
