# 🔧 Step-by-Step Guide: Fix "Failed to fetch" / "Cannot reach API" Error

## Error Message
```
Network error: Failed to fetch. 
Please check: 1) Backend is running at https://vijay-nagar-backend.onrender.com/api, 
2) CORS is configured correctly, 
3) Environment variable NEXT_PUBLIC_API_URL is set.
```

---

## ✅ Step-by-Step Troubleshooting

### Step 1: Verify Backend is Running

**Goal**: Confirm your backend service is accessible

1. **Open your browser** (Chrome, Firefox, etc.)

2. **Visit the backend root URL**:
   ```
   https://vijay-nagar-backend.onrender.com
   ```

3. **Expected Result**:
   - ✅ **Success**: You see JSON like:
     ```json
     {
       "message": "Vijay Nagar Portfolio API",
       "version": "1.0.0",
       "status": "running",
       ...
     }
     ```
   - ❌ **Error**: Page doesn't load, timeout, or error message
     - **Action**: Go to Step 1.1

4. **Test the health endpoint**:
   ```
   https://vijay-nagar-backend.onrender.com/api/health
   ```

5. **Expected Result**:
   - ✅ **Success**: You see:
     ```json
     {"status":"ok","timestamp":"..."}
     ```
   - ❌ **Error**: Timeout or error
     - **Action**: Wait 15-20 seconds and try again (Render free tier may be sleeping)

**If backend is NOT accessible**:
- Go to Render dashboard → Check backend service status
- Check Logs tab for errors
- Verify service is "Available" (not "Sleeping" or "Error")

---

### Step 2: Check Frontend Environment Variable

**Goal**: Ensure `NEXT_PUBLIC_API_URL` is set correctly

#### For Local Development:

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Check if `.env.local` exists**:
   ```bash
   # Windows PowerShell
   Test-Path .env.local
   
   # Mac/Linux
   ls -la .env.local
   ```

3. **If file doesn't exist, create it**:
   ```bash
   # Windows PowerShell
   New-Item .env.local -ItemType File
   
   # Mac/Linux
   touch .env.local
   ```

4. **Open `.env.local` in your editor** (VS Code, Notepad, etc.)

5. **Add/Verify these lines** (exactly as shown):
   ```env
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

6. **⚠️ CRITICAL: Check for trailing slash**:
   - ✅ **Correct**: `https://vijay-nagar-backend.onrender.com/api`
   - ❌ **Wrong**: `https://vijay-nagar-backend.onrender.com/api/`
   
   **Remove any trailing slash after `/api`**

7. **Save the file**

8. **Restart your frontend dev server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then start again
   npm run dev
   ```

#### For Production (Vercel/Render):

1. **Go to your frontend service dashboard**:
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com

2. **Navigate to Environment Variables**:
   - Vercel: Project → Settings → Environment Variables
   - Render: Service → Environment tab

3. **Check/Add**:
   ```
   NEXT_PUBLIC_API_URL = https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL = https://your-frontend-url.com
   ```

4. **Verify**:
   - No trailing slash after `/api`
   - Value is exactly: `https://vijay-nagar-backend.onrender.com/api`

5. **Redeploy frontend** after changing environment variables

---

### Step 3: Verify Backend CORS Configuration

**Goal**: Ensure backend allows requests from your frontend

#### Check Backend Code (Already Updated):

The backend code should allow `localhost:3000`. Verify in `backend/src/server.ts`:

```typescript
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [frontendUrl, 'http://localhost:3000'] // Allow localhost even in production
  : ['http://localhost:3000', frontendUrl];
```

#### Check Render Backend Environment Variables:

1. **Go to Render dashboard** → Your backend service

2. **Click "Environment" tab**

3. **Check `FRONTEND_URL` variable**:
   - **For local testing**: Should be set to your production frontend URL (e.g., `https://vijay-nagar.vercel.app`)
   - **The code allows localhost automatically**, but `FRONTEND_URL` should still be set

4. **Verify format**:
   - ✅ **Correct**: `https://vijay-nagar.vercel.app` (no trailing slash)
   - ❌ **Wrong**: `https://vijay-nagar.vercel.app/` (has trailing slash)

#### Redeploy Backend (CRITICAL):

**You MUST redeploy the backend for CORS changes to take effect:**

1. **Option A: Auto-deploy** (if connected to GitHub):
   - Push your code changes to GitHub
   - Render will auto-deploy
   - Wait 2-3 minutes

2. **Option B: Manual deploy**:
   - Go to Render dashboard → Backend service
   - Click **"Manual Deploy"** → **"Deploy latest commit"**
   - Wait 2-3 minutes for deployment

3. **Verify deployment**:
   - Check deployment status in Render dashboard
   - Should show "Live" when complete
   - Check Logs tab for any errors

---

### Step 4: Test the Connection

**Goal**: Verify frontend can connect to backend

1. **Open your frontend**:
   ```
   http://localhost:3000/admin
   ```

2. **Open Browser DevTools**:
   - Press `F12` or `Right-click → Inspect`
   - Go to **Console** tab

3. **Look for error messages**:
   - Should see connection test logs
   - Check for specific error types

4. **Check Network tab**:
   - Go to **Network** tab in DevTools
   - Try to login or refresh page
   - Look for failed requests to `/api/health` or `/api/auth/login`
   - Click on failed request → Check **Headers** and **Response** tabs

5. **Common errors and fixes**:

   **Error: "Failed to fetch"**
   - **Cause**: CORS issue or backend not reachable
   - **Fix**: 
     1. Verify backend is redeployed (Step 3)
     2. Check backend allows localhost:3000
     3. Wait 15-20 seconds (service may be sleeping)

   **Error: "CORS policy: No 'Access-Control-Allow-Origin' header"**
   - **Cause**: Backend CORS not configured correctly
   - **Fix**: 
     1. Redeploy backend (Step 3)
     2. Verify `FRONTEND_URL` in Render is correct
     3. Check backend code has localhost in allowed origins

   **Error: "Timeout" or "AbortError"**
   - **Cause**: Render service is sleeping
   - **Fix**: 
     1. Wait 15-20 seconds
     2. Visit backend URL in browser first to wake it up
     3. Then refresh frontend

---

### Step 5: Wake Up Render Service (If Sleeping)

**Render free tier services sleep after 15 minutes of inactivity**

1. **Visit backend URL in browser**:
   ```
   https://vijay-nagar-backend.onrender.com/api/health
   ```

2. **Wait 15-20 seconds** for service to wake up

3. **Verify it's awake**:
   - Should return: `{"status":"ok","timestamp":"..."}`
   - If still timing out, wait another 10 seconds

4. **Then try frontend again**:
   - Refresh `http://localhost:3000/admin`
   - Connection should work now

---

### Step 6: Verify Complete Setup

**Checklist - All items should be ✅**:

- [ ] Backend is accessible: `https://vijay-nagar-backend.onrender.com` shows API info
- [ ] Health endpoint works: `https://vijay-nagar-backend.onrender.com/api/health` returns `{"status":"ok"}`
- [ ] `.env.local` exists in `frontend/` directory
- [ ] `.env.local` has `NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api` (no trailing slash)
- [ ] Frontend dev server restarted after changing `.env.local`
- [ ] Backend code updated with CORS allowing localhost
- [ ] Backend redeployed on Render (after CORS code change)
- [ ] `FRONTEND_URL` set in Render backend environment variables
- [ ] Browser console shows no CORS errors
- [ ] Can access `http://localhost:3000/admin` without errors

---

## 🚨 Still Not Working?

### Check These Additional Items:

1. **Browser Console Errors**:
   - Open DevTools (F12) → Console tab
   - Copy the exact error message
   - Look for specific error codes or messages

2. **Network Tab**:
   - DevTools → Network tab
   - Try to login
   - Find the failed request
   - Check:
     - **Status code** (404, 500, CORS error?)
     - **Request URL** (is it correct?)
     - **Response** (what does it say?)

3. **Backend Logs**:
   - Render dashboard → Backend service → Logs tab
   - Look for errors when you try to connect
   - Check for CORS-related errors

4. **Verify Environment Variables**:
   ```bash
   # In frontend directory, check what Next.js sees:
   # This won't work directly, but you can check:
   # The .env.local file should be in frontend/.env.local
   ```

5. **Test with curl** (to bypass browser CORS):
   ```bash
   # Test backend directly
   curl https://vijay-nagar-backend.onrender.com/api/health
   
   # Should return: {"status":"ok","timestamp":"..."}
   ```

---

## 📝 Quick Reference

### Correct Configuration:

**Frontend `.env.local`**:
```env
NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend Render Environment Variables**:
```
FRONTEND_URL=https://vijay-nagar.vercel.app
NODE_ENV=production
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=never
PORT=10000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<your-password>
```

### Common Mistakes:

❌ **Trailing slash in API URL**: `https://...onrender.com/api/`
✅ **Correct**: `https://...onrender.com/api`

❌ **Wrong protocol**: `http://vijay-nagar-backend.onrender.com`
✅ **Correct**: `https://vijay-nagar-backend.onrender.com`

❌ **Missing /api**: `https://vijay-nagar-backend.onrender.com`
✅ **Correct**: `https://vijay-nagar-backend.onrender.com/api`

❌ **Not redeploying backend** after CORS code changes
✅ **Must redeploy** for changes to take effect

---

## 🎯 Most Likely Solution

Based on your error, the most common fix is:

1. **Redeploy backend on Render** (if you haven't already)
   - The CORS code allows localhost, but needs to be deployed

2. **Verify `.env.local` has no trailing slash**
   - Should be: `https://vijay-nagar-backend.onrender.com/api`
   - Not: `https://vijay-nagar-backend.onrender.com/api/`

3. **Restart frontend dev server** after changing `.env.local`

4. **Wake up backend** by visiting it in browser first

---

**Need more help?** Check the main [README.md](README.md) for additional troubleshooting.
