# 📖 CMS & Website Usage Guide

Complete guide for using the Vijay Nagar Portfolio website and Content Management System (CMS).

## 🌐 Website Overview

The portfolio website is a modern, responsive site showcasing:
- **Home**: Introduction and quick links
- **About**: Background and interests
- **Research Interests**: Research areas
- **Publications**: Research papers and publications
- **Industry Projects**: Professional projects
- **Academic Projects**: Academic work
- **Experience**: Work history
- **Skills**: Technical skills
- **Achievements**: Awards and recognitions
- **Teaching & Service**: Academic contributions
- **Contact**: Contact information

## 🎨 Admin Dashboard UI (Easiest Way)

### Access the Admin Dashboard

**URL**: `/admin` on your website
- **Local Development**: `http://localhost:3000/admin`
- **Production**: `https://your-domain.com/admin`

### Features

- ✅ **Beautiful Web Interface**: No coding required
- ✅ **Easy Login**: Simple email/password authentication
- ✅ **Full CRUD Operations**: Create, read, update, and delete content
- ✅ **Publications Management**: Complete interface for managing publications
- ✅ **Tabbed Navigation**: Easy switching between content types
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Dark Mode Support**: Automatic theme switching
- ✅ **Real-time Updates**: Changes reflect immediately
- ✅ **Secure**: JWT token-based authentication

### How to Use

1. **Navigate to Admin Dashboard**
   - Go to your website URL + `/admin`
   - Example: `http://localhost:3000/admin`

2. **Login**
   - Enter your admin email (default: `admin@example.com`)
   - Enter your admin password (from your `.env` file)
   - Click "Login"

3. **Manage Content**
   - **View**: Browse all your publications
   - **Create**: Click "Add Publication" button
   - **Edit**: Click the edit icon (pencil) on any item
   - **Delete**: Click the delete icon (trash) on any item
   - **Save**: Click "Save" after making changes

4. **Logout**
   - Click the "Logout" button in the top right corner

### Current Features

- ✅ **Publications**: Full CRUD interface
- 🚧 **Projects**: Coming soon
- 🚧 **Experience**: Coming soon
- 🚧 **Achievements**: Coming soon
- 🚧 **Teaching & Service**: Coming soon

### Tips

- Your login session persists across page refreshes
- Token is stored securely in browser localStorage
- Changes are saved immediately to the database
- You can edit multiple items without logging in again

## 🔐 Admin Access (API - For Developers)

### Getting Started

1. **Access the Admin API**
   - Backend URL: `http://localhost:3001/api` (local) or your production URL
   - Frontend: `http://localhost:3000` (local) or your production URL

2. **Login to CMS**
   ```bash
   # Using curl
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "changeme123"
     }'
   ```

   **Response:**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": "user-id",
       "email": "admin@example.com",
       "role": "admin"
     }
   }
   ```

3. **Save the JWT Token**
   - Copy the `token` from the response
   - Use it in the `Authorization` header for all admin requests:
   ```
   Authorization: Bearer <your-token-here>
   ```

### Token Expiration

- **No Expiration** (default): Token never expires (set `JWT_EXPIRES_IN=never`)
- **With Expiration**: Token expires after specified time (e.g., `JWT_EXPIRES_IN=7d`)

## 📝 Managing Content

### Publications

#### Create a Publication
```bash
curl -X POST http://localhost:3001/api/publications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Deep Learning for Computer Vision",
    "authors": "Vijay Nagar, et al.",
    "venue": "CVPR 2024",
    "year": 2024,
    "type": "conference",
    "link": "https://example.com/paper",
    "description": "A novel approach to computer vision using deep learning."
  }'
```

#### Get All Publications
```bash
# Public endpoint (no auth required)
curl http://localhost:3001/api/publications
```

#### Get Single Publication
```bash
curl http://localhost:3001/api/publications/<publication-id>
```

#### Update a Publication
```bash
curl -X PUT http://localhost:3001/api/publications/<publication-id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Updated Title",
    "year": 2025
  }'
```

#### Delete a Publication
```bash
curl -X DELETE http://localhost:3001/api/publications/<publication-id> \
  -H "Authorization: Bearer <your-token>"
```

### Industry Projects

#### Create Industry Project
```bash
curl -X POST http://localhost:3001/api/projects/industry \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "AI Safety & Security for ADAS",
    "role": "Computer Vision Engineer",
    "timeline": "2023 - Present",
    "description": "Developed safety-critical AI systems for autonomous driving.",
    "contributions": [
      "Implemented robust perception pipelines",
      "Ensured compliance with automotive safety standards"
    ],
    "impact": "Improved system reliability by 30%"
  }'
```

#### Get Industry Projects
```bash
# Public endpoint
curl http://localhost:3001/api/projects/industry
```

### Academic Projects

#### Create Academic Project
```bash
curl -X POST http://localhost:3001/api/projects/academic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "3D Object Detection Research",
    "institution": "University Name",
    "timeline": "2022 - 2023",
    "description": "Research on 3D object detection using LiDAR.",
    "technologies": ["Python", "PyTorch", "LiDAR"],
    "outcomes": "Published in top-tier conference"
  }'
```

#### Get Academic Projects
```bash
curl http://localhost:3001/api/projects/academic
```

### Experience

#### Create Experience Entry
```bash
curl -X POST http://localhost:3001/api/experience \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Senior Computer Vision Engineer",
    "company": "Tech Company",
    "location": "City, Country",
    "startDate": "2023-01-01",
    "endDate": null,
    "current": true,
    "description": "Leading computer vision projects for autonomous vehicles.",
    "achievements": [
      "Led team of 5 engineers",
      "Improved model accuracy by 25%"
    ]
  }'
```

#### Get Experience
```bash
curl http://localhost:3001/api/experience
```

### Achievements

#### Create Achievement
```bash
curl -X POST http://localhost:3001/api/achievements \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Best Paper Award",
    "organization": "CVPR 2024",
    "year": 2024,
    "description": "Awarded for outstanding contribution to computer vision.",
    "link": "https://example.com/award"
  }'
```

#### Get Achievements
```bash
curl http://localhost:3001/api/achievements
```

### Teaching & Service

#### Create Teaching/Service Entry
```bash
curl -X POST http://localhost:3001/api/teaching \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "type": "teaching",
    "title": "Computer Vision Course",
    "institution": "University Name",
    "year": "2024",
    "description": "Taught graduate-level computer vision course.",
    "role": "Instructor"
  }'
```

#### Get Teaching & Service
```bash
curl http://localhost:3001/api/teaching
```

## 🔧 Using JavaScript/TypeScript

### Example: Fetch API

```javascript
// Login
async function login(email, password) {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  localStorage.setItem('jwt_token', data.token);
  return data;
}

// Create Publication
async function createPublication(token, publicationData) {
  const response = await fetch('http://localhost:3001/api/publications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(publicationData),
  });
  
  return await response.json();
}

// Get Publications (Public)
async function getPublications() {
  const response = await fetch('http://localhost:3001/api/publications');
  return await response.json();
}

// Update Publication
async function updatePublication(token, id, updates) {
  const response = await fetch(`http://localhost:3001/api/publications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  
  return await response.json();
}

// Delete Publication
async function deletePublication(token, id) {
  const response = await fetch(`http://localhost:3001/api/publications/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.ok;
}
```

### Example: Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('jwt_token', data.token);
  return data;
}

// Create Publication
async function createPublication(publicationData) {
  const { data } = await api.post('/publications', publicationData);
  return data;
}

// Get Publications
async function getPublications() {
  const { data } = await api.get('/publications');
  return data;
}
```

## 🐍 Using Python

```python
import requests

BASE_URL = "http://localhost:3001/api"

# Login
def login(email, password):
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": email, "password": password}
    )
    data = response.json()
    return data["token"]

# Create Publication
def create_publication(token, publication_data):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.post(
        f"{BASE_URL}/publications",
        json=publication_data,
        headers=headers
    )
    return response.json()

# Get Publications
def get_publications():
    response = requests.get(f"{BASE_URL}/publications")
    return response.json()

# Usage
token = login("admin@example.com", "changeme123")
publication = {
    "title": "Deep Learning for CV",
    "authors": "Vijay Nagar",
    "venue": "CVPR 2024",
    "year": 2024,
    "type": "conference"
}
result = create_publication(token, publication)
print(result)
```

## 📋 Complete API Reference

### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Login and get JWT token |
| GET | `/api/auth/me` | Yes | Get current user info |
| POST | `/api/auth/change-password` | Yes | Change admin password |

### Publications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/publications` | No | Get all publications |
| GET | `/api/publications/:id` | No | Get single publication |
| POST | `/api/publications` | Yes | Create publication |
| PUT | `/api/publications/:id` | Yes | Update publication |
| DELETE | `/api/publications/:id` | Yes | Delete publication |

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects/industry` | No | Get industry projects |
| POST | `/api/projects/industry` | Yes | Create industry project |
| PUT | `/api/projects/industry/:id` | Yes | Update industry project |
| DELETE | `/api/projects/industry/:id` | Yes | Delete industry project |
| GET | `/api/projects/academic` | No | Get academic projects |
| POST | `/api/projects/academic` | Yes | Create academic project |
| PUT | `/api/projects/academic/:id` | Yes | Update academic project |
| DELETE | `/api/projects/academic/:id` | Yes | Delete academic project |

### Experience

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/experience` | No | Get all experience |
| POST | `/api/experience` | Yes | Create experience entry |
| PUT | `/api/experience/:id` | Yes | Update experience |
| DELETE | `/api/experience/:id` | Yes | Delete experience |

### Achievements

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/achievements` | No | Get all achievements |
| POST | `/api/achievements` | Yes | Create achievement |
| PUT | `/api/achievements/:id` | Yes | Update achievement |
| DELETE | `/api/achievements/:id` | Yes | Delete achievement |

### Teaching & Service

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/teaching` | No | Get teaching & service |
| POST | `/api/teaching` | Yes | Create entry |
| PUT | `/api/teaching/:id` | Yes | Update entry |
| DELETE | `/api/teaching/:id` | Yes | Delete entry |

## 🔄 Common Workflows

### Workflow 1: Adding a New Publication

1. **Login**
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "changeme123"}'
   ```

2. **Save the token** from the response

3. **Create Publication**
   ```bash
   curl -X POST http://localhost:3001/api/publications \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{
       "title": "Your Paper Title",
       "authors": "Your Name, Co-author",
       "venue": "Conference/Journal Name",
       "year": 2024,
       "type": "conference",
       "link": "https://arxiv.org/abs/xxxx",
       "description": "Brief description"
     }'
   ```

4. **Verify** by visiting the Publications page on your website

### Workflow 2: Updating Experience

1. **Get current experience** (to find the ID)
   ```bash
   curl http://localhost:3001/api/experience
   ```

2. **Update the entry**
   ```bash
   curl -X PUT http://localhost:3001/api/experience/<id> \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{
       "current": false,
       "endDate": "2024-12-31"
     }'
   ```

### Workflow 3: Managing Projects

1. **List all industry projects**
   ```bash
   curl http://localhost:3001/api/projects/industry
   ```

2. **Add new project**
   ```bash
   curl -X POST http://localhost:3001/api/projects/industry \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{...project data...}'
   ```

3. **Update project**
   ```bash
   curl -X PUT http://localhost:3001/api/projects/industry/<id> \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{...updated data...}'
   ```

## 🛠️ Admin Account Management

### Change Password

```bash
curl -X POST http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "currentPassword": "old-password",
    "newPassword": "new-secure-password"
  }'
```

### Get Current User Info

```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## 📱 Frontend Integration

The frontend automatically fetches data from the API. All public endpoints are accessible without authentication.

### Example: Frontend Component

```typescript
// In your Next.js component
async function getPublications() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const response = await fetch(`${apiUrl}/publications`);
  const publications = await response.json();
  return publications;
}

export default async function PublicationsPage() {
  const publications = await getPublications();
  
  return (
    <div>
      {publications.map((pub) => (
        <div key={pub.id}>
          <h2>{pub.title}</h2>
          <p>{pub.authors} - {pub.venue} {pub.year}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🔒 Security Best Practices

1. **Never commit tokens** to version control
2. **Use HTTPS** in production
3. **Rotate JWT secrets** regularly
4. **Use strong passwords** for admin account
5. **Limit token expiration** in production (recommended: `7d` or `30d`)
6. **Store tokens securely** (localStorage for web, secure storage for mobile)

## 🐛 Troubleshooting

### "Invalid token" Error
- Token may have expired (if expiration is set)
- Token format is incorrect
- **Solution**: Login again to get a new token

### "Admin access required" Error
- User doesn't have admin role
- **Solution**: Check user role in database

### CORS Errors
- Frontend URL not configured in backend
- **Solution**: Set `FRONTEND_URL` environment variable

### "JWT_SECRET is required" Error
- JWT secret not set in environment
- **Solution**: Set `JWT_SECRET` in `.env` file

## 📚 Additional Resources

- **API Documentation**: See `README.md` for full API details
- **Deployment Guide**: See `DEPLOYMENT.md` for production setup
- **Backend README**: See `backend/README.md` for backend-specific info

## 💡 Tips

1. **Use Postman or Insomnia** for easier API testing
2. **Create a simple admin dashboard** using the API
3. **Automate content updates** with scripts
4. **Backup your database** regularly
5. **Monitor API usage** in production

---

**Need Help?** Check the main `README.md` or open an issue on GitHub.
