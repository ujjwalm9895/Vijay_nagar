# Vijay Nagar Project - GCP Deployment Guide

This project is configured for deployment on **Google Cloud Platform (GCP)** using **Cloud Run**.

## Project Structure

- `frontend/`: Next.js application (Dockerized)
- `backend/`: Django application (Dockerized)

## Prerequisites

1.  [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and authenticated (`gcloud auth login`).
2.  A GCP Project created.
3.  Billing enabled for the project.
4.  APIs enabled:
    - Cloud Run API
    - Artifact Registry API
    - Cloud Build API
    - Cloud SQL Admin API (if using Cloud SQL)

---

## 1. Setup Environment Variables

Create a `.env` file in the `backend` directory for local testing (this is ignored by Git, but used by the app if present). For Cloud Run, we will set these in the console or CLI.

```
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgres://user:password@host:port/dbname
ALLOWED_HOSTS=*
```

---

## 2. Deploy Backend (Django) to Cloud Run

### Option A: Direct Source Deployment (Simplest)

Run the following command from the `backend` directory:

```bash
cd backend
gcloud run deploy vijay-nagar-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

During deployment, you might be asked to enable APIs. Say `y` (yes).

### Option B: Build and Push Container Image

1.  **Create an Artifact Registry repository:**
    ```bash
    gcloud artifacts repositories create my-repo --repository-format=docker \
    --location=us-central1 --description="Docker repository"
    ```

2.  **Build the image:**
    ```bash
    gcloud builds submit --tag us-central1-docker.pkg.dev/PROJECT_ID/my-repo/backend .
    ```

3.  **Deploy:**
    ```bash
    gcloud run deploy vijay-nagar-backend \
    --image us-central1-docker.pkg.dev/PROJECT_ID/my-repo/backend \
    --region us-central1 \
    --allow-unauthenticated
    ```

### Post-Deployment Configuration (Backend)

1.  **Environment Variables:**
    Go to the Cloud Run Console -> Select Service -> **Edit & Deploy New Revision** -> **Variables**.
    Add:
    - `SECRET_KEY`: (Generate a strong key)
    - `DEBUG`: `False`
    - `CSRF_TRUSTED_ORIGINS`: `https://your-frontend-url.run.app` (Add this after deploying frontend)

2.  **Database (Cloud SQL):**
    - Create a Cloud SQL instance (PostgreSQL).
    - Create a database and user.
    - Connect Cloud Run to Cloud SQL:
      - In Cloud Run Edit page -> **Integrations** or **Cloud SQL connections**.
      - Set `DATABASE_URL` env var (e.g., `postgres://user:pass@/dbname?host=/cloudsql/project:region:instance`).

3.  **Migrations:**
    You can run migrations using a temporary Cloud Run job or via Cloud Build. A simple way for one-off tasks:
    ```bash
    # Create a job to run migrations
    gcloud run jobs create migrate \
      --image us-central1-docker.pkg.dev/PROJECT_ID/my-repo/backend \
      --command python,manage.py,migrate \
      --region us-central1
    
    gcloud run jobs execute migrate --region us-central1
    ```

---

## 3. Deploy Frontend (Next.js) to Cloud Run

Run the following command from the `frontend` directory:

```bash
cd frontend
gcloud run deploy vijay-nagar-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### Post-Deployment Configuration (Frontend)

1.  **Environment Variables:**
    Go to Cloud Run Console -> Select Frontend Service -> **Variables**.
    Add:
    - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend service (e.g., `https://vijay-nagar-backend-xyz.a.run.app`).

---

## 4. Final Steps

1.  Update Backend `CSRF_TRUSTED_ORIGINS` with the Frontend URL.
2.  Test the application.

## Troubleshooting

- **500 Errors**: Check Cloud Run logs in the GCP Console.
- **Static Files**: If static files are missing in Django, ensure `whitenoise` is configured correctly (it is already set up in `settings.py`) and `collectstatic` was run (uncomment the line in `Dockerfile` if you want it to run during build, or run it manually). *Note: The current Dockerfile expects `collectstatic` to be run or handled.*
  - *Recommendation*: Uncomment `# RUN python manage.py collectstatic --noinput` in `backend/Dockerfile` for production builds.
