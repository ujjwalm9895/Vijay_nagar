# 🚨 Quick Fix: "Invalid Credentials" Error

## ✅ Good News
Your connection is working! The error "Invalid credentials" means:
- ✅ Backend is running
- ✅ CORS is configured correctly
- ✅ Frontend can reach backend
- ❌ Admin user doesn't exist in database OR password is wrong

---

## 🔧 Solution: Create Admin User in Database

The admin user needs to be created in your Render database. Here's how:

### Step 1: Open Render Shell

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click your backend service**: `vijay-nagar-backend`
3. **Click "Shell" tab** (in left sidebar, under "MANAGE")

### Step 2: Run Database Seed

In the Render Shell, run these commands:

```bash
# Navigate to backend directory
cd backend

# Run the seed script (creates admin user)
npm run seed
```

### Step 3: Expected Output

You should see:
```
✅ Admin user created: admin@example.com
✅ Publication seeded: ...
✅ Industry projects seeded
✅ Experience seeded
✅ Achievements seeded
✅ Teaching & Service seeded
```

### Step 4: If Seed Fails

If you see errors, try:

```bash
# Make sure you're in the right directory
pwd
# Should show: /opt/render/project/src/backend

# Install dependencies (if needed)
npm install

# Generate Prisma client
npm run db:generate

# Try seed again
npm run seed
```

---

## 🔑 Login Credentials

After running seed, use these credentials:

- **Email**: `admin@example.com` (from your `ADMIN_EMAIL` env var)
- **Password**: `Vijay@124` (from your `ADMIN_PASSWORD` env var)

**Note**: The seed script uses your Render environment variables:
- `ADMIN_EMAIL=admin@example.com`
- `ADMIN_PASSWORD=Vijay@124`

---

## ✅ Verify It Works

1. **Go to**: https://vijay-nagar.vercel.app/admin
2. **Login with**:
   - Email: `admin@example.com`
   - Password: `Vijay@124`
3. **Should work now!**

---

## 🐛 Troubleshooting

### Issue: "Command not found: npm"

**Solution**: Make sure you're in the backend directory:
```bash
cd backend
npm run seed
```

### Issue: "Cannot find module '@prisma/client'"

**Solution**: Install dependencies first:
```bash
npm install
npm run db:generate
npm run seed
```

### Issue: "Database connection error"

**Solution**: 
- Check `DATABASE_URL` is set correctly in Render environment variables
- Use the **Internal Database URL** (not External)
- Format: `postgresql://user:password@host:port/database?schema=public`

### Issue: "Admin user created" but still can't login

**Solution**: 
- The seed uses `upsert`, so it creates or updates
- If user exists with wrong password, seed will update it
- Try running seed again to update password

### Issue: Seed runs but no output

**Solution**:
- Check Render Logs tab for errors
- Verify environment variables are set
- Try running with verbose output:
  ```bash
  DEBUG=* npm run seed
  ```

---

## 📝 Alternative: Create Admin Manually

If seed doesn't work, create admin manually:

### Option 1: Using Prisma Studio (if available)

```bash
npm run db:studio
# Opens Prisma Studio in browser
# Create user manually with hashed password
```

### Option 2: Using SQL directly

```bash
# Connect to database
psql $DATABASE_URL

# Create admin user (password hash for "Vijay@124")
# You'll need to generate the bcrypt hash first
```

### Option 3: Create via API (after fixing)

Once you can login, use the change password API to update.

---

## 🎯 Most Likely Solution

**Just run the seed script!**

1. Render Dashboard → Backend service → Shell
2. `cd backend`
3. `npm run seed`
4. Login with `admin@example.com` / `Vijay@124`

That's it! The seed script will create the admin user with your password from the environment variables.

---

## ✅ Checklist

- [ ] Opened Render Shell
- [ ] Navigated to `backend` directory
- [ ] Ran `npm run seed`
- [ ] Saw "✅ Admin user created" message
- [ ] Tried logging in with `admin@example.com` / `Vijay@124`
- [ ] Successfully logged in!

---

**Still not working?** Check the main [FIX_ADMIN_LOGIN.md](FIX_ADMIN_LOGIN.md) for more detailed troubleshooting.
