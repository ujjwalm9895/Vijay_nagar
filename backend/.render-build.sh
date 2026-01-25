#!/bin/bash
# Render build script for backend
# This ensures Prisma is set up correctly

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Building application..."
npm run build

echo "Build complete!"
