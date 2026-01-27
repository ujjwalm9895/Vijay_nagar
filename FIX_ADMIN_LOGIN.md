# 🔐 Fix "Invalid Credentials" Error - Admin Login

## Current Status ✅
- **Good News**: Your backend is connected! The "Invalid credentials" error means the API is working.
- **Issue**: The admin user doesn't exist or the password is incorrect.

---

## Step 1: Check Your Render Backend Environment Variables

The admin user is created using these environment variables:

1. **Go to Render Dashboard** → Your backend service → **Environment** tab

2. **Check these variables**:
   - `ADMIN_EMAIL` - Should be the email you're trying to login with
   - `ADMIN_PASSWORD` - Should be the password you're using

3. **Note down the values** (click the eye icon to reveal them)

---

## Step 2: Run Database Seed on Render

The seed script creates the admin user. You need to run it on Render:

### Option A: Using Render Shell (Recommended)

1. **Go to Render Dashboard** → Your backend service

2. **Click "Shell" tab** (in the left sidebar)

3. **Run these commands**:
   ```bash
   # Make sure you're in the backend directory
   cd backend
   
   # Run the seed script
   npm run seed
   ```

4. **Expected output**:
   ```
   ✅ Admin user created: admin@example.com
   ✅ Publication seeded: ...
   ✅ Industry projects seeded
   ✅ Experience seeded
   ✅ Achievements seeded
   ✅ Teaching & Service seeded
   ```

5. **If you see errors**:
   - Check that `DATABASE_URL` is set correctly
   - Check that `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
   - Check the Logs tab for more details

### Option B: Using Render Manual Deploy with Post-Install

If the seed doesn't run automatically, you can add it to the build process:

1. **Check your `backend/package.json`** - should have:
   ```json
   "scripts": {
     "seed": "tsx src/prisma/seed.ts",
     "postinstall": "prisma generate"
   }
   ```

2. **After deployment, run seed via Shell** (as shown in Option A)

---

## Step 3: Verify Admin User Was Created

1. **In Render Shell**, run:
   ```bash
   # Open Prisma Studio to check database
   npm run db:studio
   ```
   
   **Note**: Prisma Studio might not work in Render Shell. Use Option 2 instead.

2. **Or test via API**:
   ```bash
   # Try to login with the credentials
   curl -X POST https://vijay-nagar-backend.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"changeme123"}'
   ```
   
   - **Success**: Returns `{"token":"...","user":{...}}`
   - **Failure**: Returns `{"error":"Invalid credentials"}`

---

## Step 4: Login with Correct Credentials

Based on your Render environment variables:

1. **Email**: Use the value from `ADMIN_EMAIL` in Render
   - Default: `admin@example.com`

2. **Password**: Use the value from `ADMIN_PASSWORD` in Render
   - Default: `changeme123` (if not set in env vars)

3. **Try logging in** at: https://vijay-nagar.vercel.app/admin

---

## Step 5: If Seed Doesn't Work - Create Admin Manually

If the seed script fails, you can create the admin user manually:

### Using Render Shell:

1. **Open Render Shell** (backend service → Shell tab)

2. **Create a Node.js script** to create admin:
   ```bash
   # Create a temporary script
   cat > create-admin.js << 'EOF'
   const { PrismaClient } = require('@prisma/client');
   const bcrypt = require('bcryptjs');
   
   const prisma = new PrismaClient();
   
   async function createAdmin() {
     const email = process.env.ADMIN_EMAIL || 'admin@example.com';
     const password = process.env.ADMIN_PASSWORD || 'changeme123';
     
     const hashedPassword = await bcrypt.hash(password, 10);
     
     const admin = await prisma.user.upsert({
       where: { email },
       update: { password: hashedPassword },
       create: {
         email,
         password: hashedPassword,
         role: 'admin',
       },
     });
     
     console.log('✅ Admin user created/updated:', admin.email);
   }
   
   createAdmin()
     .catch(console.error)
     .finally(() => prisma.$disconnect());
   EOF
   
   # Run it
   node create-admin.js
   ```

3. **Or use Prisma directly**:
   ```bash
   # Install tsx if needed
   npm install -g tsx
   
   # Run seed
   npm run seed
   ```

---

## Step 6: Reset Admin Password (If Needed)

If you want to change the admin password:

1. **Update `ADMIN_PASSWORD` in Render**:
   - Go to Environment tab
   - Update `ADMIN_PASSWORD` to your new password
   - Save changes

2. **Run seed again** (it will update the existing user):
   ```bash
   npm run seed
   ```

3. **Or use the change password API** (if you're already logged in):
   ```bash
   curl -X POST https://vijay-nagar-backend.onrender.com/api/auth/change-password \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"currentPassword":"old","newPassword":"new"}'
   ```

---

## Quick Checklist

- [ ] Checked `ADMIN_EMAIL` in Render environment variables
- [ ] Checked `ADMIN_PASSWORD` in Render environment variables
- [ ] Ran `npm run seed` in Render Shell
- [ ] Verified seed output shows "✅ Admin user created"
- [ ] Tried logging in with credentials from Render env vars
- [ ] If still failing, created admin manually

---

## Common Issues

### Issue: "Seed script not found"
**Solution**: Make sure you're in the `backend` directory in Render Shell:
```bash
cd backend
npm run seed
```

### Issue: "Database connection error"
**Solution**: 
- Check `DATABASE_URL` is set correctly in Render
- Use the **Internal Database URL** (not External)
- Format: `postgresql://user:password@host:port/database?schema=public`

### Issue: "Module not found: @prisma/client"
**Solution**: 
```bash
npm install
npm run db:generate
npm run seed
```

### Issue: "Admin user exists but password doesn't work"
**Solution**: 
- The password in database is hashed
- Run seed again to update it with current `ADMIN_PASSWORD`
- Or create admin manually (Step 5)

---

## Expected Behavior After Fix

1. **Run seed**: `npm run seed` in Render Shell
2. **See output**: `✅ Admin user created: admin@example.com`
3. **Login at**: https://vijay-nagar.vercel.app/admin
4. **Use credentials**: From your Render `ADMIN_EMAIL` and `ADMIN_PASSWORD`
5. **Success**: You should be logged in and see the admin dashboard

---

## Still Not Working?

1. **Check Render Logs**:
   - Backend service → Logs tab
   - Look for errors when running seed
   - Check for database connection issues

2. **Verify Database**:
   - Check database service is "Available" in Render
   - Verify `DATABASE_URL` is correct

3. **Test API Directly**:
   ```bash
   curl -X POST https://vijay-nagar-backend.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}'
   ```

4. **Check User Exists**:
   - The seed uses `upsert`, so it will create or update
   - If user exists with wrong password, seed will update it

---

**Need more help?** Check the main [README.md](README.md) or [TROUBLESHOOTING_API_CONNECTION.md](TROUBLESHOOTING_API_CONNECTION.md)
