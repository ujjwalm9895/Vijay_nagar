# Vijay Nagar Project

This is a full-stack application consisting of a **Next.js** frontend and a **Django** backend.

## Project Structure

- `frontend/`: Next.js application (React, TypeScript, Tailwind CSS)
- `backend/`: Django application (Python)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Python](https://www.python.org/) (v3.10 or later recommended)
- [Git](https://git-scm.com/)

---

## Local Development Guide

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Vijay_nagar
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment.

```bash
cd backend
```

**Create a virtual environment:**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Run migrations:**

```bash
python manage.py migrate
```

**Start the development server:**

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
```

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

---

## Deployment Guide

### Frontend Deployment (Vercel)

The easiest way to deploy the Next.js frontend is using [Vercel](https://vercel.com/).

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Log in to Vercel and click "Add New Project".
3.  Import your repository.
4.  Configure the project:
    - **Root Directory**: Select `frontend`.
    - **Build Command**: `next build` (default).
    - **Output Directory**: `.next` (default).
    - **Install Command**: `npm install` (default).
5.  Click **Deploy**.

### Backend Deployment (Render/Railway)

For the Django backend, you can use platforms like [Render](https://render.com/) or [Railway](https://railway.app/).

**Prerequisites for Production:**
1.  **Database**: Use PostgreSQL instead of SQLite. Update `DATABASES` in `backend/config/settings.py`.
2.  **WSGI Server**: Install `gunicorn` (`pip install gunicorn`) and add it to `requirements.txt`.
3.  **Static Files**: Configure `STATIC_ROOT` in `settings.py` and use `whitenoise` for serving static files.

**Example Steps for Render:**
1.  Create a new **Web Service** on Render.
2.  Connect your repository.
3.  Settings:
    - **Root Directory**: `backend`
    - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
    - **Start Command**: `gunicorn config.wsgi:application`
4.  Add Environment Variables:
    - `PYTHON_VERSION`: `3.11.0` (or your version)
    - `SECRET_KEY`: (Your Django secret key)
    - `DEBUG`: `False`
    - `DATABASE_URL`: (Your PostgreSQL connection string)

### Connecting Frontend and Backend

1.  In your Frontend (Vercel), add an Environment Variable:
    - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://my-backend.onrender.com`).
2.  Update your frontend API calls to use this variable.
3.  In your Backend (Django), configure **CORS** to allow requests from your frontend domain.
    - Install `django-cors-headers`.
    - Add it to `INSTALLED_APPS` and `MIDDLEWARE`.
    - Set `CORS_ALLOWED_ORIGINS = ["https://your-frontend.vercel.app"]`.

---

## Tech Stack

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

**Backend:**
- Django 6
- SQLite (Development)
