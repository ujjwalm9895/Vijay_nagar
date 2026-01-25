# 🔧 Fixing "Network Error" in Admin Dashboard

## Common Causes & Solutions

### 1. ❌ Environment Variable Not Set

**Problem**: `NEXT_PUBLIC_API_URL` is not set in Render/Vercel

**Solution**:
1. Go to your Frontend service on Render/Vercel
2. Navigate to **Environment Variables**
3. Add/Update:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   ```
4. **Redeploy** the frontend service

### 2. ❌ CORS Not Configured

**Problem**: Backend CORS doesn't allow your frontend URL

**Solution**:
1. Go to your Backend service on Render
2. Navigate to **Environment Variables**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend.onrender.com
   ```
   (or `https://your-frontend.vercel.app` if using Vercel)
4. **Redeploy** the backend service

### 3. ❌ Backend Not Running

**Problem**: Backend service is down or not accessible

**Solution**:
1. Check backend health: `https://your-backend.onrender.com/api/health`
2. If it fails, check backend logs in Render dashboard
3. Verify backend service is running (not sleeping)

### 4. ❌ Wrong API URL Format

**Problem**: API URL is missing `/api` suffix or has wrong format

**Correct Format**:
```
✅ https://your-backend.onrender.com/api
❌ https://your-backend.onrender.com
❌ https://your-backend.onrender.com/api/
```

### 5. ❌ Backend Service Type Issue

**Problem**: Frontend deployed as Static Site instead of Web Service

**Solution**:
- Frontend must be **Web Service** (not Static Site) for admin dashboard
- See [ADMIN_TROUBLESHOOTING.md](ADMIN_TROUBLESHOOTING.md) for details

## Quick Diagnostic Steps

### Step 1: Check Environment Variables

**In Render Frontend Service:**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend.onrender.com
```

**In Render Backend Service:**
```
FRONTEND_URL=https://your-frontend.onrender.com
```

### Step 2: Test Backend Health

Open in browser:
```
https://your-backend.onrender.com/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Step 3: Test API Endpoint

Open in browser:
```
https://your-backend.onrender.com/api/publications
```

Should return: `[]` or array of publications

### Step 4: Check Browser Console

1. Open admin page: `https://your-frontend.onrender.com/admin`
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Look for error messages
5. Go to **Network** tab
6. Try to login
7. Check the failed request - see the exact error

### Step 5: Verify CORS

If you see CORS errors in console:
- Backend `FRONTEND_URL` must match your frontend URL exactly
- Include protocol (`https://`)
- No trailing slash
- Redeploy backend after changing

## Common Error Messages

### "Failed to fetch"
- **Cause**: Backend is not reachable
- **Fix**: Check backend URL, verify backend is running

### "CORS policy: No 'Access-Control-Allow-Origin'"
- **Cause**: CORS not configured
- **Fix**: Set `FRONTEND_URL` in backend environment variables

### "Network error: TypeError: Failed to fetch"
- **Cause**: Backend URL is wrong or backend is down
- **Fix**: Verify `NEXT_PUBLIC_API_URL` is correct

### "401 Unauthorized"
- **Cause**: Invalid credentials or token expired
- **Fix**: Login again with correct credentials

## Testing Locally

To test if it's a deployment issue:

1. **Run locally:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Access**: `http://localhost:3000/admin`

3. **If it works locally**: The issue is with environment variables or deployment configuration

4. **If it doesn't work locally**: Check:
   - Backend is running on port 3001
   - Frontend `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001/api`
   - Backend `.env` has `FRONTEND_URL=http://localhost:3000`

## Production Checklist

- [ ] `NEXT_PUBLIC_API_URL` set in frontend environment variables
- [ ] `FRONTEND_URL` set in backend environment variables
- [ ] Both URLs use `https://` (not `http://`)
- [ ] Backend URL includes `/api` suffix
- [ ] Frontend deployed as **Web Service** (not Static Site)
- [ ] Backend service is running (not sleeping)
- [ ] Both services redeployed after environment variable changes
- [ ] No CORS errors in browser console
- [ ] Backend health check works: `/api/health`

## Still Not Working?

1. **Check Render Logs**:
   - Frontend service → Logs tab
   - Backend service → Logs tab
   - Look for errors

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Console tab for JavaScript errors
   - Network tab for failed requests

3. **Verify URLs**:
   - Backend: `https://your-backend.onrender.com/api/health`
   - Frontend: `https://your-frontend.onrender.com/admin`
   - Make sure they're both accessible

4. **Test API Directly**:
   ```bash
   curl https://your-backend.onrender.com/api/health
   curl https://your-backend.onrender.com/api/publications
   ```

---

**Need more help?** Check the main [README.md](README.md) or [CMS_USAGE.md](CMS_USAGE.md)
