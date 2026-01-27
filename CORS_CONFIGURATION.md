# 🌐 CORS Configuration Guide

## Overview

The backend CORS (Cross-Origin Resource Sharing) is now fully configured to support:
- ✅ Local development (localhost:3000)
- ✅ Production frontend (Vercel/Render)
- ✅ Multiple frontend URLs
- ✅ All HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS)
- ✅ Credentials (cookies, authorization headers)

---

## Automatic CORS Configuration

The backend automatically allows these origins:

### Always Allowed:
- `http://localhost:3000` - For local development

### From Environment Variables:
- `FRONTEND_URL` - Your main production frontend URL
- `ALLOWED_ORIGINS` - Additional frontend URLs (comma-separated)

### In Development Mode:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

---

## Configuration Options

### Option 1: Single Frontend (Recommended for Most Cases)

**Render Backend Environment Variables:**
```
FRONTEND_URL=https://vijay-nagar.vercel.app
```

**What this allows:**
- ✅ `http://localhost:3000` (automatic)
- ✅ `https://vijay-nagar.vercel.app` (from FRONTEND_URL)

---

### Option 2: Multiple Frontends

If you have multiple frontend deployments (e.g., Vercel + Render), use `ALLOWED_ORIGINS`:

**Render Backend Environment Variables:**
```
FRONTEND_URL=https://vijay-nagar.vercel.app
ALLOWED_ORIGINS=https://vijay-nagar.vercel.app,https://vijay-nagar-frontend.onrender.com
```

**What this allows:**
- ✅ `http://localhost:3000` (automatic)
- ✅ `https://vijay-nagar.vercel.app` (from FRONTEND_URL)
- ✅ `https://vijay-nagar-frontend.onrender.com` (from ALLOWED_ORIGINS)

**Format**: Comma-separated, no spaces (or spaces will be trimmed)

---

## Setup Instructions

### Step 1: Configure Render Backend Environment Variables

1. **Go to Render Dashboard** → Your backend service → **Environment** tab

2. **Set `FRONTEND_URL`**:
   ```
   FRONTEND_URL=https://vijay-nagar.vercel.app
   ```
   - Use your production frontend URL
   - Include `https://`
   - No trailing slash

3. **Optional: Set `ALLOWED_ORIGINS`** (if you have multiple frontends):
   ```
   ALLOWED_ORIGINS=https://vijay-nagar.vercel.app,https://vijay-nagar-frontend.onrender.com
   ```
   - Comma-separated list
   - No spaces (or they'll be trimmed automatically)

4. **Save changes**

5. **Redeploy backend** (if code was updated):
   - Click **Manual Deploy** → **Deploy latest commit**
   - Or push code to GitHub (auto-deploy)

---

### Step 2: Verify CORS is Working

1. **Check backend logs** on startup:
   - Go to Render → Backend service → **Logs** tab
   - Look for: `🌐 CORS Allowed Origins: [...]`
   - Should list all allowed origins

2. **Test from browser**:
   - Open `https://vijay-nagar.vercel.app/admin`
   - Open DevTools (F12) → Console tab
   - Should see no CORS errors

3. **Test from localhost**:
   - Open `http://localhost:3000/admin`
   - Should work without CORS errors

---

## CORS Features

### Allowed HTTP Methods:
- `GET` - Read data
- `POST` - Create data
- `PUT` - Update data
- `DELETE` - Delete data
- `PATCH` - Partial update
- `OPTIONS` - Preflight requests

### Allowed Headers:
- `Content-Type` - JSON, form data, etc.
- `Authorization` - JWT tokens
- `X-Requested-With` - AJAX requests
- `Accept` - Content negotiation
- `Origin` - Origin header
- `Access-Control-Request-Method` - Preflight
- `Access-Control-Request-Headers` - Preflight

### Exposed Headers:
- `Content-Length`
- `Content-Type`

### Credentials:
- ✅ Enabled - Cookies and authorization headers work

### Preflight Caching:
- Cached for 24 hours (86400 seconds)
- Reduces preflight requests

---

## Troubleshooting

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause**: Your frontend URL is not in the allowed origins list.

**Solution**:
1. Check backend logs for allowed origins
2. Verify `FRONTEND_URL` matches your frontend URL exactly
3. Add to `ALLOWED_ORIGINS` if needed
4. Redeploy backend

### Issue: "CORS blocked origin" in logs

**Cause**: A request came from an origin not in the allowed list.

**Solution**:
1. Check the blocked origin in logs
2. Add it to `ALLOWED_ORIGINS` if legitimate
3. Redeploy backend

### Issue: CORS works locally but not in production

**Cause**: Environment variables not set in production.

**Solution**:
1. Check Render environment variables
2. Verify `FRONTEND_URL` is set correctly
3. Redeploy after changing environment variables

### Issue: Multiple frontends, only one works

**Cause**: Only `FRONTEND_URL` is set, not `ALLOWED_ORIGINS`.

**Solution**:
1. Set `ALLOWED_ORIGINS` with all frontend URLs (comma-separated)
2. Redeploy backend

---

## Testing CORS

### Test 1: Check Allowed Origins in Logs

1. Go to Render → Backend service → Logs
2. Look for startup message: `🌐 CORS Allowed Origins: [...]`
3. Verify your frontend URL is in the list

### Test 2: Browser Console

1. Open your frontend
2. Open DevTools (F12) → Console
3. Try to make an API request
4. Should see no CORS errors

### Test 3: curl Test

```bash
# Test from allowed origin (should work)
curl -H "Origin: https://vijay-nagar.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://vijay-nagar-backend.onrender.com/api/auth/login

# Should return CORS headers
```

### Test 4: Network Tab

1. Open DevTools → Network tab
2. Make a request to backend
3. Check response headers:
   - `Access-Control-Allow-Origin` - Should show your origin
   - `Access-Control-Allow-Credentials` - Should be `true`
   - `Access-Control-Allow-Methods` - Should list methods

---

## Security Notes

### ✅ Good Practices:
- Only allow specific origins (not `*`)
- Use `https://` in production
- Keep `credentials: true` only if needed
- Log blocked origins for monitoring

### ⚠️ Security Considerations:
- The backend allows `localhost:3000` even in production (for testing)
- If you want to disable this, modify `backend/src/server.ts`
- Always use `https://` for production URLs
- Don't use wildcard origins (`*`) with credentials

---

## Quick Reference

### Environment Variables:

**Required:**
```
FRONTEND_URL=https://your-frontend.vercel.app
```

**Optional:**
```
ALLOWED_ORIGINS=https://frontend1.com,https://frontend2.com
```

### Always Allowed (Automatic):
- `http://localhost:3000` - Local development

### After Changing Environment Variables:
1. Save in Render dashboard
2. Redeploy backend (if code changed)
3. Check logs for allowed origins
4. Test from frontend

---

## Example Configurations

### Example 1: Vercel Frontend Only
```
FRONTEND_URL=https://vijay-nagar.vercel.app
```

### Example 2: Vercel + Render Frontends
```
FRONTEND_URL=https://vijay-nagar.vercel.app
ALLOWED_ORIGINS=https://vijay-nagar.vercel.app,https://vijay-nagar-frontend.onrender.com
```

### Example 3: Multiple Domains
```
FRONTEND_URL=https://vijay-nagar.vercel.app
ALLOWED_ORIGINS=https://vijay-nagar.vercel.app,https://www.vijaynagar.dev,https://vijaynagar.dev
```

---

**Need help?** Check the main [README.md](README.md) or [TROUBLESHOOTING_API_CONNECTION.md](TROUBLESHOOTING_API_CONNECTION.md)
