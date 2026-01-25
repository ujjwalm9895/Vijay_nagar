# Frontend - Portfolio Website

Next.js 16+ portfolio website with CMS admin dashboard.

## 🎨 Admin Dashboard

**Access**: Navigate to `/admin` on your website
- **Local**: `http://localhost:3000/admin`
- **Production**: `https://your-domain.com/admin`

**Features:**
- Beautiful web interface for content management
- Login with email/password
- Manage publications (Create, Read, Update, Delete)
- Responsive design with dark mode
- Real-time updates

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
src/
├── app/
│   ├── admin/          # CMS Admin Dashboard
│   │   ├── page.tsx    # Admin interface
│   │   └── layout.tsx  # Admin layout (no navbar/footer)
│   ├── about/          # About page
│   ├── publications/   # Publications page
│   └── ...             # Other pages
├── components/         # Reusable components
├── config/            # Configuration
└── lib/               # Utilities
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [CMS Usage Guide](../CMS_USAGE.md)
- [Deployment Guide](../DEPLOYMENT.md)
