# 🚀 CMS Quick Reference

Quick reference for common CMS operations.

## 🎨 Admin Dashboard UI (Recommended)

**Easiest way to manage content**: Use the web interface at `/admin`

- **Local**: `http://localhost:3000/admin`
- **Production**: `https://your-domain.com/admin`

Just login and start managing your content through the beautiful web interface!

## 🔑 Authentication (API)

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "changeme123"}'

# Save token from response, then use:
Authorization: Bearer <token>
```

## 📝 Quick Commands

### Publications

```bash
# Create
curl -X POST http://localhost:3001/api/publications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "...", "authors": "...", "venue": "...", "year": 2024, "type": "conference"}'

# List (Public)
curl http://localhost:3001/api/publications

# Update
curl -X PUT http://localhost:3001/api/publications/<id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Updated"}'

# Delete
curl -X DELETE http://localhost:3001/api/publications/<id> \
  -H "Authorization: Bearer <token>"
```

### Projects

```bash
# Industry Projects
curl http://localhost:3001/api/projects/industry  # List
curl -X POST http://localhost:3001/api/projects/industry \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "...", "role": "...", "timeline": "..."}'

# Academic Projects
curl http://localhost:3001/api/projects/academic  # List
curl -X POST http://localhost:3001/api/projects/academic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "...", "institution": "...", "timeline": "..."}'
```

### Experience

```bash
# List
curl http://localhost:3001/api/experience

# Create
curl -X POST http://localhost:3001/api/experience \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "...", "company": "...", "startDate": "2024-01-01", "current": true}'
```

### Achievements

```bash
# List
curl http://localhost:3001/api/achievements

# Create
curl -X POST http://localhost:3001/api/achievements \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "...", "organization": "...", "year": 2024}'
```

### Teaching & Service

```bash
# List
curl http://localhost:3001/api/teaching

# Create
curl -X POST http://localhost:3001/api/teaching \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"type": "teaching", "title": "...", "institution": "...", "year": "2024"}'
```

## 🔧 JavaScript Example

```javascript
const API_URL = 'http://localhost:3001/api';
const token = 'your-jwt-token';

// Get publications
fetch(`${API_URL}/publications`)
  .then(res => res.json())
  .then(data => console.log(data));

// Create publication
fetch(`${API_URL}/publications`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Paper Title',
    authors: 'Author Name',
    venue: 'Conference Name',
    year: 2024,
    type: 'conference'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 📋 All Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | Login |
| `/api/auth/me` | GET | Yes | Current user |
| `/api/publications` | GET | No | List publications |
| `/api/publications` | POST | Yes | Create |
| `/api/publications/:id` | PUT | Yes | Update |
| `/api/publications/:id` | DELETE | Yes | Delete |
| `/api/projects/industry` | GET | No | List |
| `/api/projects/industry` | POST | Yes | Create |
| `/api/projects/academic` | GET | No | List |
| `/api/projects/academic` | POST | Yes | Create |
| `/api/experience` | GET | No | List |
| `/api/experience` | POST | Yes | Create |
| `/api/achievements` | GET | No | List |
| `/api/achievements` | POST | Yes | Create |
| `/api/teaching` | GET | No | List |
| `/api/teaching` | POST | Yes | Create |

## 🎨 Admin UI vs API

- **Admin UI** (`/admin`): Best for non-technical users, visual interface, no coding required
- **API**: Best for developers, automation, integrations, custom workflows

**Full Guide**: See [CMS_USAGE.md](CMS_USAGE.md) for detailed documentation.
