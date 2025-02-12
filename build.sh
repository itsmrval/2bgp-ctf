#!/bin/bash

echo "Cleaning up existing Docker images if they exist..."

if docker images -q 2bgp-ctf_frontend; then
  echo "Removing existing frontend Docker image..."
  docker rmi 2bgp-ctf_frontend
fi

if docker images -q 2bgp-ctf_backend; then
  echo "Removing existing backend Docker image..."
  docker rmi 2bgp-ctf_backend
fi

echo "Building Docker image for frontend..."
cd frontend || { echo "Frontend directory not found! Exiting..."; exit 1; }
docker build -t 2bgp-ctf_frontend .
if [ $? -eq 0 ]; then
  echo "Frontend Docker image built successfully."
else
  echo "Failed to build frontend Docker image."
  exit 1
fi

echo "Building Docker image for backend..."
cd ../backend || { echo "Backend directory not found! Exiting..."; exit 1; }
docker build -t 2bgp-ctf_backend .
if [ $? -eq 0 ]; then
  echo "Backend Docker image built successfully."
else
  echo "Failed to build backend Docker image."
  exit 1
fi

echo "Docker images built successfully for frontend and backend."
