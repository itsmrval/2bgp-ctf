#!/bin/bash

# Enable error handling
set -e

# Function to remove all existing Docker images
remove_all_images() {
  echo "Removing all existing Docker images..."
  docker rmi $(docker images -q) || echo "No images to remove."
}

# Remove existing Docker images
remove_all_images

# Function to build Docker images
build_image() {
  local dir=$1
  local tag=$2
  echo "Building Docker image for $tag..."
  cd "$dir"
  docker build -t "$tag" .
  cd -  # Go back to the original directory
}

# Build images with specific subdirectories
build_image "frontend" "2bgp-ctf_frontend"
build_image "backend" "2bgp-ctf_backend"

build_image "levels/1" "2bgp-ctf_level1"
build_image "levels/2" "2bgp-ctf_level2"
build_image "levels/3" "2bgp-ctf_level3"
build_image "levels/4" "2bgp-ctf_level4"
build_image "levels/5" "2bgp-ctf_level5"


echo "Docker images built successfully for frontend, backend, and level2."
