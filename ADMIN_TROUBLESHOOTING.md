# 🔧 Admin Dashboard Troubleshooting

## Issue: "Not Found" Error on `/admin`

If you're getting a "Not Found" error when accessing `/admin` on Render, follow these steps:

### 1. Verify the Route Exists

The admin page should be at:
```
frontend/src/app/admin/page.tsx
```

### 2. Rebuild and Redeploy

**On Render:**
1. Go to your Frontend service dashboard
2. Click **Manual Deploy** → **Deploy latest commit**
3. Wait for the build to complete

**Or trigger a new deployment:**
```bash
# Make a small change and push
git commit --allow-empty -m "Trigger rebuild for admin route"
git push
```

### 3. Check Build Logs

In Render dashboard:
1. Go to your Frontend service
2. Click on **Logs** tab
3. Look for any build errors
4. Check if the admin route is being built

### 4. Verify Environment Variables

Make sure these are set in Render:
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend.onrender.com
```

### 5. Check Next.js Build Output

The build should include:
```
.next/server/app/admin/page.js
```

### 6. Clear Cache and Try Again

1. Clear browser cache
2. Try incognito/private mode
3. Try a different browser

### 7. Verify File Structure

Your `frontend/src/app/admin/` should contain:
```
admin/
├── layout.tsx
└── page.tsx
```

### 8. Check for TypeScript Errors

Build locally to check for errors:
```bash
cd frontend
npm run build
```

If there are errors, fix them before deploying.

### 9. Verify Route is Accessible

After rebuild, try:
- `https://your-frontend.onrender.com/admin`
- `https://your-frontend.onrender.com/admin/` (with trailing slash)

### 10. Check Render Service Type

Make sure your frontend is deployed as:
- **Web Service** (not Static Site) if using Next.js with server features
- Or **Static Site** if using static export

For the admin dashboard, you need **Web Service** because it uses client-side features.

## Common Issues

### Issue: Route works locally but not on Render

**Solution**: 
- Check if you're using Static Site instead of Web Service
- Verify build command includes `npm run build`
- Check that `output: "standalone"` is set in `next.config.ts` for Render

### Issue: 404 on all routes

**Solution**:
- Check if `trailingSlash: false` in `next.config.ts`
- Verify the build completed successfully
- Check Render service logs

### Issue: Admin page loads but API calls fail

**Solution**:
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Verify backend is running and accessible

## Quick Fix Checklist

- [ ] Admin page file exists at `frontend/src/app/admin/page.tsx`
- [ ] Admin layout exists at `frontend/src/app/admin/layout.tsx`
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] Frontend is deployed as **Web Service** (not Static Site)
- [ ] Environment variables are set in Render
- [ ] Build completed successfully (check logs)
- [ ] Tried clearing browser cache
- [ ] Tried incognito mode

## Still Not Working?

1. **Check Render Logs**: Look for any errors during build or runtime
2. **Test Locally**: Make sure `/admin` works on `localhost:3000/admin`
3. **Verify Deployment**: Check if other routes work (e.g., `/about`)
4. **Contact Support**: If all else fails, check Render support or GitHub issues

## Alternative: Direct File Check

You can verify the route exists by checking the build output:
1. Go to Render → Your Frontend Service → **Shell**
2. Run: `ls -la .next/server/app/admin/`
3. Should show `page.js` file

---

**Note**: After making changes, always rebuild and redeploy on Render for changes to take effect.
