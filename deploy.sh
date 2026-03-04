#!/bin/bash
set -euo pipefail
cd /opt/sv_bahrdorf/website
echo "=== SV Bahrdorf Website Deploy ==="
echo "Pulling latest changes..."
git -C /opt/sv_bahrdorf pull
echo "Building and deploying..."
docker compose -f compose/prod/docker-compose.yml up -d --build
echo "Waiting for container..."
sleep 2
echo "Health check..."
curl -sf http://127.0.0.1:7090/health && echo " ✓ Website is live!" || echo " ✗ Health check failed!"
