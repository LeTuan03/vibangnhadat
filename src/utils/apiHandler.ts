import { toast } from 'react-toastify';
import { logger } from './logger';

/**
 * API Response Handler - Handles all API responses with error handling
 */

export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Handle successful API response
 * @param data - Response data
 * @param message - Optional success message
 * @returns Success response wrapper
 */
export function handleSuccess<T>(data: T, message?: string): ApiSuccessResponse<T> {
    if (message) {
        toast.success(message);
        logger.info(message);
    }
    return { success: true, data };
}

/**
 * Handle API error
 * @param error - Error message or Error object
 * @param fallbackMessage - Fallback message if error is empty
 * @returns Error response wrapper
 */
export function handleError(error: Error | string, fallbackMessage = 'Đã có lỗi xảy ra'): ApiErrorResponse {
    const errorMessage = error instanceof Error ? error.message : error;
    const finalMessage = errorMessage || fallbackMessage;

    toast.error(finalMessage);
    logger.error('API Error:', error);

    return { success: false, error: finalMessage };
}

/**
 * Try-catch wrapper for async API calls
 * @param fn - Async function to execute
 * @param successMessage - Optional success message
 * @param errorMessage - Optional error message
 * @returns Promise with response
 */
export async function tryAsync<T>(
    fn: () => Promise<T>,
    successMessage?: string,
    errorMessage?: string
): Promise<ApiResponse<T>> {
    try {
        const data = await fn();
        return handleSuccess(data, successMessage);
    } catch (error) {
        return handleError(
            error instanceof Error ? error : new Error(String(error)),
            errorMessage
        );
    }
}

/**
 * Validate response data
 * @param data - Data to validate
 * @param requiredFields - Required fields
 * @returns true if valid
 */
export function validateResponse<T extends Record<string, any>>(
    data: T,
    requiredFields: (keyof T)[]
): boolean {
    return requiredFields.every(field => data[field] !== undefined && data[field] !== null);
}

/**
 * Transform API response
 * @param data - Data to transform
 * @param transformer - Transformation function
 * @returns Transformed data
 */
export function transformResponse<T, R>(data: T, transformer: (data: T) => R): R {
    try {
        return transformer(data);
    } catch (error) {
        logger.error('Response transformation error:', error);
        throw error;
    }
}
