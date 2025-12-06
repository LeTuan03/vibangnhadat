/**
 * Comprehensive logging utility for development and production
 * Helps with debugging and error tracking
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
    stack?: string;
}

class Logger {
    private isDevelopment: boolean = false;
    private logs: LogEntry[] = [];
    private maxLogs = 1000;

    /**
     * Debug level logging
     * @param message - Log message
     * @param data - Additional data
     */
    debug(message: string, data?: any): void {
        if (this.isDevelopment) {
            console.debug(`[DEBUG] ${message}`, data);
        }
        this.addLog('debug', message, data);
    }

    /**
     * Info level logging
     * @param message - Log message
     * @param data - Additional data
     */
    info(message: string, data?: any): void {
        console.log(`[INFO] ${message}`, data);
        this.addLog('info', message, data);
    }

    /**
     * Warning level logging
     * @param message - Log message
     * @param data - Additional data
     */
    warn(message: string, data?: any): void {
        console.warn(`[WARN] ${message}`, data);
        this.addLog('warn', message, data);
    }

    /**
     * Error level logging
     * @param message - Log message
     * @param error - Error object or data
     */
    error(message: string, error?: Error | any): void {
        console.error(`[ERROR] ${message}`, error);
        this.addLog('error', message, error, error instanceof Error ? error.stack : undefined);
    }

    /**
     * Add log entry to internal log storage
     */
    private addLog(level: LogLevel, message: string, data?: any, stack?: string): void {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
            stack,
        };

        this.logs.push(entry);

        // Keep logs array size manageable
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }

    /**
     * Get all stored logs
     * @returns Array of log entries
     */
    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    /**
     * Get logs by level
     * @param level - Log level to filter by
     * @returns Filtered log entries
     */
    getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter(log => log.level === level);
    }

    /**
     * Clear all stored logs
     */
    clearLogs(): void {
        this.logs = [];
    }

    /**
     * Export logs as JSON
     * @returns JSON string of logs
     */
    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2);
    }

    /**
     * Download logs as file
     */
    downloadLogs(): void {
        const logsJson = this.exportLogs();
        const blob = new Blob([logsJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logs-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export const logger = new Logger();
