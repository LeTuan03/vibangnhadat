/**
 * Format date string to Vietnamese locale format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "1 tháng 12, 2024")
 */
export const formatDate = (dateInput?: string | Date | null): string => {
    if (!dateInput) return '';

    const date = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (Number.isNaN(date.getTime())) return '';

    try {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } catch (e) {
        return '';
    }
};

/**
 * Format Vietnamese phone number
 * @param phone - Raw phone number
 * @returns Formatted phone (e.g., "090 123 4567")
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format as: 090 123 4567
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }

    return phone;
};

/**
 * Create phone link for tel: protocol
 * @param phone - Phone number
 * @returns tel: link with +84 country code
 */
export const createPhoneLink = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    return `tel:+84${cleaned.slice(1)}`;
};

/**
 * Create Zalo messaging link
 * @param phone - Phone number
 * @returns Zalo link
 */
export const createZaloLink = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    return `https://zalo.me/${cleaned}`;
};

/**
 * Debounce function to limit function execution frequency
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: any;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Scroll to element smoothly with offset
 * @param elementId - Element ID to scroll to
 * @param offset - Offset from top (default: 80px for fixed header)
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

/**
 * Truncate text to maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Check if text contains query (case-insensitive)
 * @param text - Text to search in
 * @param query - Search query
 * @returns true if found
 */
export const searchInText = (text: string, query: string): boolean => {
    return text.toLowerCase().includes(query.toLowerCase());
};

/**
 * Filter array items by search query on multiple fields
 * @param items - Array of items to filter
 * @param query - Search query
 * @param searchFields - Fields to search in
 * @returns Filtered items
 */
export const filterBySearch = <T>(
    items: T[],
    query: string,
    searchFields: (keyof T)[]
): T[] => {
    if (!query.trim()) return items;

    return items.filter((item) =>
        searchFields.some((field) => {
            const value = item[field];
            if (typeof value === 'string') {
                return searchInText(value, query);
            }
            return false;
        })
    );
};

/**
 * Calculate estimated reading time in minutes
 * @param text - Text content
 * @returns Estimated reading time in minutes
 */
export const getReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if valid email
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate Vietnamese phone number format
 * @param phone - Phone to validate
 * @returns true if valid Vietnamese phone
 */
export const isValidPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && cleaned.startsWith('0');
};

/**
 * Generate unique ID
 * @returns Unique identifier string
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Local storage utility object with typed get/set/remove
 */
export const storage = {
    /**
     * Get item from localStorage with type safety
     * @param key - Storage key
     * @param defaultValue - Default value if key not found
     * @returns Stored value or default
     */
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage
     * @param key - Storage key
     * @param value - Value to store
     */
    set: <T>(key: string, value: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    /**
     * Remove item from localStorage
     * @param key - Storage key
     */
    remove: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },
};
