#!/bin/bash
set -euo pipefail
cd /opt/sv_bahrdorf

echo "=== SV Bahrdorf Website Deploy ==="

# Abfrage
read -p "Are you sure you want to deploy? This will overwrite local changes! (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
    echo "Aborted."
    exit 0
fi

echo "Pulling latest changes..."
git -C /opt/sv_bahrdorf fetch origin
git -C /opt/sv_bahrdorf reset --hard origin/main

echo "Fixing figma:asset imports..."
find /opt/sv_bahrdorf/website/src/src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|from "figma:asset/|from "../assets/|g'

echo "Building and deploying..."
cd /opt/sv_bahrdorf/website
docker compose -f compose/prod/docker-compose.yml up -d --build

echo "Waiting for container..."
sleep 2

echo "Health check..."
curl -sf http://127.0.0.1:7090/health && echo " ✓ Website is live!" || echo " ✗ Health check failed!"