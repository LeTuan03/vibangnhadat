# Quick Test Guide - Data Persistence Fix

## 🚀 Start Here

### Step 1: Make Sure Dev Server is Running
```
npm run dev
```
Should show: `VITE v5.x ready in XXX ms` at `http://localhost:3000/`

### Step 2: Open Admin Panel
```
URL: http://localhost:3000/admin
Username: admin
Password: admin
```

---

## ✅ Test Case 1: Add New Service

**Expected:** Service saves to Firebase, shows in table, persists after refresh

1. Click **Services** section in admin
2. Click **Add New Service**
3. Fill form:
   - Title: `Test Service 123`
   - Description: `Testing Firebase persistence`
   - Other fields as needed
4. Click **Save**

**Verify:**
- ✅ Service appears in table immediately
- ✅ DevTools (F12) → Console shows: `[services] Creating new document:`
- ✅ No red errors in console

5. Press **F5** (refresh page)
   - ✅ Service STILL in table = **FIXED!**
   - ✅ Table reloaded from Firebase

---

## ✅ Test Case 2: Edit Service

1. Find your test service in table
2. Click **Edit** button
3. Change title to: `Updated Service 123`
4. Click **Save**

**Verify:**
- ✅ Table updates immediately
- ✅ Console shows: `[services] Updating document:`
- ✅ Press F5 → Change persists

---

## ✅ Test Case 3: Delete Service

1. Find your test service
2. Click **Delete** button
3. Confirm delete

**Verify:**
- ✅ Service removed from table
- ✅ Console shows: `[services] Deleting document:`
- ✅ Press F5 → Service still gone (not in Firebase)

---

## ✅ Test Case 4: Firebase Console Verification

Check that data is actually in Firebase:

1. Open: https://console.firebase.google.com/
2. Select project: `vibangnhadat`
3. Go to: **Firestore Database**
4. Click collection: `services`

**Verify:**
- ✅ Your test service document is there
- ✅ Field data matches what you entered
- ✅ Timestamp shows recent time

---

## ✅ Test Case 5: Client Display

Verify data appears on main website:

1. Open main page: http://localhost:3000/
2. Scroll to **Services** section
3. Look for your test service

**Verify:**
- ✅ Service appears in services list
- ✅ Title and description match
- ✅ Page showed loading spinner while fetching

---

## 🔍 Debug Console Logs

What to look for in DevTools Console (F12):

### When Adding Service:
```
[services] Creating new document: {
  title: "Test Service 123",
  description: "Testing Firebase persistence",
  ...
}
```

### When Page Loads:
```
[services] Fetching all documents...
```

### When Updating:
```
[services] Updating document: {id: "...", ...}
```

### When Deleting:
```
[services] Deleting document: {...}
```

---

## ❌ If Something Goes Wrong

### Problem: Service doesn't appear after save
- [ ] Check console for errors (red text)
- [ ] Check: Is Firebase DB online? (Check console logs)
- [ ] Try: F5 refresh, then add again
- [ ] Try: Clear browser cache (Ctrl+Shift+Delete)

### Problem: Service appears but disappears after refresh
- **This means data wasn't saved to Firebase**
- [ ] Check Firebase console: https://console.firebase.google.com/
- [ ] Go to Firestore Database → services collection
- [ ] Should see document there
- [ ] If not: Firebase write failed, check rules

### Problem: Getting errors in console
- [ ] Look for red error messages
- [ ] Common: `serviceService.xyz is not a function` → Old code still present
- [ ] Try: Close and reopen browser tab
- [ ] Try: npm run dev again

---

## 📋 Complete Verification Checklist

### Services Admin (Main Test)
- [ ] Can add new service
- [ ] Service appears in table
- [ ] Console shows: `[services] Creating new document:`
- [ ] Page refresh: service still there
- [ ] Firebase console: document exists

### Other Admin Sections (Quick Check)
- [ ] FAQ/QA: Can add FAQ
- [ ] Blog/News: Can add blog post
- [ ] Documents: Can add document
- [ ] Gallery: Can add image
- [ ] All have console logs showing Firebase operations

### Client Pages (Visual Check)
- [ ] Homepage loads without errors
- [ ] Services section shows all services
- [ ] FAQ section shows all FAQs
- [ ] Blog page shows posts
- [ ] No data is missing

### Technical
- [ ] Dev server running: `npm run dev` ✓
- [ ] No TypeScript errors
- [ ] No console errors (red) in DevTools
- [ ] Firebase rules allow read/write

---

## 🎯 Summary

If all tests pass: **✅ Data persistence is FIXED!**

Your admin panel now:
- ✅ Saves all data to Firebase Firestore
- ✅ Shows data immediately in tables
- ✅ Data persists after page refresh
- ✅ Client pages display updated data
- ✅ No data loss on app restart

**Congratulations! 🎉**
