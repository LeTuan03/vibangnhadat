# 🚀 Quick Reference Guide - Các Công Cụ Mới

Hướng dẫn nhanh sử dụng các tính năng mới được thêm vào hệ thống.

---

## 📚 Logger Utility

### Import
```typescript
import { logger } from '@/utils/logger';
```

### Basic Usage
```typescript
// Info level (luôn được logged)
logger.info('User action', { userId: 123 });

// Debug level (chỉ development)
logger.debug('Debug info', debugData);

// Warning level
logger.warn('Deprecation warning');

// Error level
logger.error('Something went wrong', error);
```

### Advanced Features
```typescript
// Get all logs
const allLogs = logger.getLogs();

// Filter by level
const errors = logger.getLogsByLevel('error');

// Export as JSON
const jsonLogs = logger.exportLogs();

// Download logs file
logger.downloadLogs(); // Tải file logs-timestamp.json
```

---

## 🛡️ Error Boundary

### Setup (tự động trong main.tsx)
```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary>
    <YourComponent />
</ErrorBoundary>
```

### Features
- Tự động catch React errors
- Hiển thị fallback UI
- Reset button để recover
- Link về trang chủ
- Thông tin lỗi chi tiết (development)

---

## 🔌 API Response Handler

### Import
```typescript
import { 
    handleSuccess, 
    handleError, 
    tryAsync,
    validateResponse,
    transformResponse 
} from '@/utils/apiHandler';
```

### Success Handling
```typescript
const result = handleSuccess(data, 'Tải dữ liệu thành công!');
// Shows toast notification
// Returns: { success: true, data }
```

### Error Handling
```typescript
const result = handleError(error, 'Lỗi: Không thể tải dữ liệu');
// Shows error toast
// Logs error
// Returns: { success: false, error }
```

### Async Wrapper
```typescript
const result = await tryAsync(
    () => fetch('/api/data').then(r => r.json()),
    'Success message',
    'Error message'
);

if (result.success) {
    console.log(result.data);
} else {
    console.error(result.error);
}
```

### Validation
```typescript
const isValid = validateResponse(data, ['name', 'email', 'phone']);
if (!isValid) {
    // Handle invalid response
}
```

### Transformation
```typescript
const transformed = transformResponse(data, (data) => ({
    id: data.id,
    title: data.title.toUpperCase(),
}));
```

---

## 🧰 Helper Utilities

### Import
```typescript
import {
    formatDate,
    formatPhoneNumber,
    createPhoneLink,
    createZaloLink,
    debounce,
    scrollToElement,
    truncateText,
    searchInText,
    filterBySearch,
    getReadingTime,
    isValidEmail,
    isValidPhone,
    generateId,
    storage
} from '@/utils/helpers';
```

### Common Usage

#### Date Formatting
```typescript
const formatted = formatDate('2024-01-15');
// Result: "15 tháng 1, 2024"
```

#### Phone Utilities
```typescript
const formatted = formatPhoneNumber('0901234567');
// Result: "090 123 4567"

const telLink = createPhoneLink('0901234567');
// Result: "tel:+84901234567"

const zaloLink = createZaloLink('0901234567');
// Result: "https://zalo.me/0901234567"
```

#### Text Utilities
```typescript
const short = truncateText('Long text here...', 20);
// Result: "Long text here..."

const found = searchInText('Hello World', 'world');
// Result: true (case-insensitive)

const readTime = getReadingTime(longText);
// Result: estimated minutes
```

#### Validation
```typescript
isValidEmail('user@example.com');      // true/false
isValidPhone('0901234567');            // true/false
```

#### ID Generation
```typescript
const id = generateId();
// Result: "1702000000000-abc123def"
```

#### Local Storage
```typescript
// Set
storage.set('user', { id: 1, name: 'John' });

// Get with default
const user = storage.get('user', { id: 0, name: 'Guest' });

// Remove
storage.remove('user');
```

---

## 📝 Enhanced Types

### Base Entity
```typescript
import { BaseEntity } from '@/types';

interface CustomItem extends BaseEntity {
    title: string;
    // id is inherited
}
```

### Generic Responses
```typescript
import { ServiceResponse, PaginatedResponse } from '@/types';

type Response<T> = ServiceResponse<T>;
type PagedData<T> = PaginatedResponse<T>;
```

### Collections
```typescript
import { Collection } from '@/types';

const items: Collection<BlogPost> = {
    items: [...],
    total: 100,
    lastUpdated: '2024-01-15'
};
```

---

## ⚡ Performance Tips

### Use React.memo
```typescript
const MyComponent = React.memo(({ prop }) => (
    <div>{prop}</div>
));
```

### Use useMemo
```typescript
const expensiveValue = useMemo(
    () => someExpensiveComputation(data),
    [data]
);
```

### Use useCallback
```typescript
const handleClick = useCallback((id: string) => {
    // Handler logic
}, [dependencies]);
```

### Lazy Load Pages
```typescript
// Already configured in App.tsx
// Just create pages normally, they'll be lazy loaded
```

---

## 🐛 Debugging

### Using Logger
```typescript
logger.debug('Component mounted', { props });
logger.info('Data fetched', data);
logger.warn('Deprecated method used');
logger.error('API failed', error);

// View logs in console or download
logger.downloadLogs();
```

### Check Types
```typescript
// TypeScript compiler will catch type errors
// Run: npm run build
// No output = all types correct
```

### Error Boundary
- Automatically catches React errors
- Shows error details in development
- Provides recovery options

---

## 🔄 Form Validation Pattern

```typescript
import { toast } from 'react-toastify';

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
    }
    
    // Validate format
    if (!isValidEmail(formData.email)) {
        toast.error('Email không hợp lệ');
        return;
    }
    
    // Process
    toast.success('Gửi thành công!');
};
```

---

## 📦 Build & Deploy

### Development
```bash
npm run dev
# Starts dev server with HMR
# Lazy loading: enabled
# Error Boundary: active
```

### Production Build
```bash
npm run build
# Results:
# - 0 TypeScript errors
# - 141 modules
# - ~120 KB gzip
# - 5.48s build time
```

### Preview Production
```bash
npm run preview
# Test production build locally
```

---

## 📊 Monitoring

### Check Performance
```typescript
// Logger provides metrics
logger.getLogs();        // All activity
logger.getLogsByLevel('error'); // Issues only

// Bundle analysis
// Check dist/ folder size
```

### Error Tracking
```typescript
// All errors logged to logger
// Can be exported and analyzed
logger.exportLogs();    // Get JSON
logger.downloadLogs();  // Download file
```

---

## 🎯 Common Patterns

### API Call Pattern
```typescript
const result = await tryAsync(
    async () => {
        const response = await fetch('/api/data');
        return response.json();
    },
    'Dữ liệu tải thành công!',
    'Lỗi: Không thể tải dữ liệu'
);

if (result.success) {
    handleSuccess(result.data);
}
```

### Form Submit Pattern
```typescript
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFormData(formData)) {
        toast.error('Dữ liệu không hợp lệ');
        return;
    }
    
    const result = await tryAsync(
        () => submitForm(formData),
        'Gửi thành công!',
        'Lỗi: Gửi không thành công'
    );
};
```

### Storage Pattern
```typescript
// Save user preferences
storage.set('preferences', {
    theme: 'dark',
    language: 'vi',
});

// Retrieve with default
const prefs = storage.get('preferences', {
    theme: 'light',
    language: 'en',
});
```

---

## 📞 Support & Documentation

### Files to Reference
- `IMPROVEMENTS.md` - Detailed improvements
- `SYSTEM_REFINEMENT_REPORT.md` - Full technical report
- JSDoc comments - Inline documentation
- Type definitions - `src/types/index.ts`

### Questions?
- Check JSDoc comments in code
- Review Examples in files
- Check type definitions
- Review logger output

---

**Happy coding! 🚀**
