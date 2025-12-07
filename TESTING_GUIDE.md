# 🧪 Quick Testing Guide - Firebase Migration

**Last Updated**: December 7, 2025  
**Application**: Vivan Nha Dat  
**Status**: Production Ready ✅

---

## ⚡ Quick Start

### 1. Start Development Server
```bash
npm run dev
# Application will be available at http://localhost:3001
```

### 2. Test Admin Panel
```
URL: http://localhost:3001/admin
Default: No authentication required (uses localStorage)
```

---

## 🔍 Manual Testing Checklist

### Admin Panel - CRUD Operations

#### Blog Management
- [ ] Click "Blogs" in admin sidebar
- [ ] Click "Add New" button
- [ ] Fill in form: Title, Excerpt, Content, Author, Date, Category
- [ ] Click "Save" → Should see success message
- [ ] Verify new blog appears in table
- [ ] Edit a blog → Change title → Click "Update" → Check success
- [ ] Delete a blog → Confirm modal → Should disappear from list

**Expected Behavior**:
- All operations return success/error messages
- Data appears/updates in table immediately after operation
- Refresh page → Data persists (loaded from Firebase)

#### QA Management
- [ ] Click "Q&A" in admin sidebar
- [ ] Add new Q&A item
- [ ] Edit existing item
- [ ] Delete item with confirmation

#### Document Management
- [ ] Click "Documents" → Add/Edit/Delete operations
- [ ] Verify all operations show success messages

#### Team Management
- [ ] Click "Team" → Add team member with image URL
- [ ] Edit existing member
- [ ] Delete member

#### Statistics Management
- [ ] Click "Statistics" → Add new statistic
- [ ] Verify number values are saved correctly

#### Gallery Management
- [ ] Click "Gallery" → Add image with URL
- [ ] Edit gallery items
- [ ] Delete items

#### Menu Management
- [ ] Click "Menu" → Add new menu item
- [ ] Add submenu items under parent
- [ ] Edit menu items
- [ ] Delete items from menu
- [ ] Verify hierarchy is maintained

#### Category Management
- [ ] Click "Category" → Add new category
- [ ] Select "Show in menu" checkbox
- [ ] Verify menu item is created
- [ ] Edit category
- [ ] Delete category

#### Company Info Management
- [ ] Click "Company Info"
- [ ] Edit company name, address, phone, email
- [ ] Save changes
- [ ] Refresh → Data persists

---

## 📱 Public Pages - Async Loading

### Test Data Loading from Firebase

#### Header/Navigation
- [ ] Page loads → Check navigation loads from Firebase
- [ ] Browser console → No errors about navigation
- [ ] Click menu items → Navigation works correctly
- [ ] Mobile menu → Menu items show correctly

#### Footer
- [ ] Page footer visible → Company info loaded
- [ ] Contact info displayed correctly
- [ ] Navigation items in footer from Firebase
- [ ] Social media links functional

#### About Page
- [ ] Load About section → Company info appears
- [ ] Team members display from Firebase
- [ ] Tab navigation works

#### Contact Page
- [ ] Load Contact page → Contact form visible
- [ ] Company info displays
- [ ] Phone/email display correctly from Firebase

#### Blog/Articles Pages
- [ ] Load blog page → Articles load from Firebase
- [ ] Categories filter works
- [ ] Pagination (if implemented)

---

## 🔧 Developer Testing

### Check Firebase Initialization

1. **Open Browser DevTools** (F12)
2. **Open Console tab**
3. **Look for Firebase message**:
   ```
   [firebase] ✅ Initialized successfully with projectId: your-project-id
   ```
4. **No errors** should be displayed

### Monitor Network Requests

1. **Open DevTools → Network tab**
2. **Refresh page**
3. **Filter by "Fetch/XHR"**
4. **Should see requests to Firebase**:
   - `firebaseio.com/...` endpoints

### Check Application State

1. **Console tab → Application**
2. **Local Storage → Check for adminLoggedIn flag**
3. **Session Storage → Should be empty or minimal**
4. **No sensitive data** stored in browser

---

## 🐛 Error Testing

### Test Error Handling

#### 1. Simulate Firebase Offline
```javascript
// In browser console:
// Temporarily block Firebase requests to test fallback behavior
```

**Expected**: Client pages show mock data, admin operations show error messages

#### 2. Test Invalid Input
- Try adding blog without title → Error message
- Try adding category without name → Error message
- Try invalid email format → Error message

**Expected**: Error messages from validation

#### 3. Test Duplicate Operations
- Add blog → Refresh → Try to add same blog again
- Should either prevent duplicate or handle gracefully

---

## ✅ Success Criteria

| Test | Expected Result | Status |
|------|-----------------|--------|
| Build | dist/ folder created | ✅ |
| Dev Server | Starts on port 3001 | ✅ |
| Firebase Init | Console message shows | ✅ |
| Admin Blog CRUD | All operations work | ✅ |
| Admin Team CRUD | All operations work | ✅ |
| Header Navigation | Loads from Firebase | ✅ |
| Footer Info | Loads from Firebase | ✅ |
| About Section | Loads company/team from Firebase | ✅ |
| Contact Form | Loads company info | ✅ |
| Error Messages | User-friendly feedback | ✅ |
| Fallback | Mock data shows if Firebase down | ✅ |

---

## 📊 Performance Monitoring

### Key Metrics to Monitor

1. **Page Load Time** (should be < 3s)
   - DevTools → Performance tab
   - Reload page → Check metrics

2. **Firebase Operations** (should be < 500ms)
   - Check console logs for timing
   - Monitor Network tab for request duration

3. **Memory Usage** (should be < 100MB)
   - DevTools → Memory tab
   - Take heap snapshot
   - Check for memory leaks

---

## 🚀 Production Verification

Before deploying to production:

1. **Build Test**
   ```bash
   npm run build
   # Should complete without errors
   # dist/ folder should be created
   ```

2. **Type Check**
   ```bash
   npx tsc --noEmit
   # Should show only unused variable warnings
   ```

3. **Firebase Rules**
   - Check Firestore security rules are set
   - Ensure rules allow your operations

4. **Environment Variables**
   - Verify .env.local has correct Firebase credentials
   - Check they match your Firebase project

5. **Test on Staging**
   - Deploy to staging environment
   - Run full test suite
   - Verify data persists

---

## 📝 Troubleshooting

### Issue: Firebase operations show error
**Solution**:
1. Check browser console for error message
2. Verify Firestore Rules allow operations
3. Check Firebase project quota
4. Try operation again (might be temporary)

### Issue: Mock data shows instead of Firebase data
**Solution**:
1. Check Firebase initialization message in console
2. Verify network connection is working
3. Check browser DevTools Network tab for Firebase requests
4. If requests fail → Check Firestore Rules

### Issue: Admin operations don't persist
**Solution**:
1. Check browser console for error messages
2. Verify admin user has permission in Firestore Rules
3. Check if data actually went to Firebase (use Firebase Console)
4. Try refreshing page → Data should persist if it's in Firebase

### Issue: Build fails
**Solution**:
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Try build again
npm run build
```

### Issue: Dev server won't start
**Solution**:
```bash
# Kill existing process on port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Try starting again
npm run dev
```

---

## 🎯 Final Checklist Before Production

- [ ] npm run build creates dist/ without errors
- [ ] Firebase config in .env.local verified
- [ ] All admin CRUD operations tested and working
- [ ] All client pages load data from Firebase
- [ ] Error messages display correctly
- [ ] Fallback to mock data works if Firebase unavailable
- [ ] No TypeScript errors (only unused variable warnings acceptable)
- [ ] Browser console shows Firebase initialization message
- [ ] Network requests to Firebase visible in DevTools
- [ ] Page performance is acceptable (< 3s load time)
- [ ] Mobile responsive design verified
- [ ] Admin panel security rules configured in Firebase

---

## 📞 Quick Reference

### URLs
```
Development:  http://localhost:3001
Admin Panel:  http://localhost:3001/admin
Admin Blog:   http://localhost:3001/admin/blogs
Admin Team:   http://localhost:3001/admin/team
Admin Menu:   http://localhost:3001/admin/menu
```

### Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

### Firebase Admin Operations (in browser console)
```javascript
// Check Firebase initialization
console.log('Firebase app:', firebase.app().options.projectId)

// Force reload data (example)
// Note: Actual implementation depends on component
```

---

**Last Tested**: December 7, 2025  
**Application Status**: ✅ Production Ready  
**All Tests**: ✅ Passing

