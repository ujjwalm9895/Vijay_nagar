#!/bin/bash
# Render start script for backend
# Run migrations before starting

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting server..."
npm start
