# 📸 Adding Profile Image to Portfolio

## Steps to Add Your Profile Image

### Step 1: Add Image to Public Folder

1. **Save your profile image** as `profile.jpg` (or `profile.png`)
   - Recommended size: 800x800px or larger (square)
   - Format: JPG or PNG
   - File size: Under 500KB for best performance

2. **Place the image** in the `frontend/public/` folder:
   ```
   frontend/public/profile.jpg
   ```

### Step 2: Image is Already Integrated!

The code has been updated to display your profile image in:
- ✅ **Homepage** (`/`) - Large profile image in hero section
- ✅ **About Page** (`/about`) - Profile image at the top

### Step 3: Verify It Works

1. **Start your development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Visit**:
   - Homepage: `http://localhost:3000`
   - About page: `http://localhost:3000/about`

3. **You should see**:
   - Circular profile image with gradient glow effect
   - Professional border and shadow
   - Responsive sizing (smaller on mobile, larger on desktop)

## Image Styling Features

The profile image includes:
- **Circular shape** with rounded corners
- **Gradient glow effect** (blue to purple)
- **Professional border** (4px)
- **Shadow effect** for depth
- **Ring effect** for polish
- **Responsive sizing**:
  - Mobile: 192x192px (12rem)
  - Desktop: 224x224px (14rem)

## Customization Options

### Change Image Size

In `frontend/src/app/page.tsx`, modify:
```tsx
<div className="relative w-48 h-48 sm:w-56 sm:h-56">
  // Change w-48 h-48 for mobile size
  // Change sm:w-56 sm:h-56 for desktop size
</div>
```

### Change Image Border Color

Modify the border classes:
```tsx
border-4 border-zinc-200 dark:border-zinc-800
// Change to: border-blue-500, border-purple-500, etc.
```

### Change Gradient Glow

Modify the gradient:
```tsx
bg-gradient-to-br from-blue-500/20 to-purple-500/20
// Change colors: from-green-500/20 to-blue-500/20, etc.
```

### Use Different Image Format

If using PNG instead of JPG:
```tsx
<Image
  src="/profile.png"  // Change from /profile.jpg
  ...
/>
```

## Image Optimization

Next.js automatically optimizes images:
- ✅ Lazy loading (except priority images)
- ✅ Responsive sizing
- ✅ WebP format when supported
- ✅ Blur placeholder option (can be added)

## Troubleshooting

### Image Not Showing

1. **Check file path**: Must be in `frontend/public/profile.jpg`
2. **Check file name**: Case-sensitive, must match exactly
3. **Check file format**: JPG, PNG, or WebP
4. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)

### Image Looks Blurry

1. **Use higher resolution**: At least 800x800px
2. **Check image quality**: Use high-quality source image
3. **Verify width/height props**: Should match container size

### Image Too Large/Small

1. **Adjust container size** in the className
2. **Adjust width/height props** in Image component
3. **Use responsive classes** (sm:, md:, lg:)

## Production Deployment

After adding the image:
1. **Commit the image** to your repository
2. **Deploy to Vercel/Render**
3. **Verify** the image loads on production site

The image will be automatically optimized and served via CDN on Vercel.

---

**Need to change the image later?** Just replace `frontend/public/profile.jpg` with your new image (same filename) and redeploy!
