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

echo "Patching pretix.cfg with DB password..."
PRETIX_DB_PASSWORD=$(grep '^PRETIX_DB_PASSWORD' /opt/sv_bahrdorf/pretix/secrets/.env | cut -d '=' -f2-)
if [[ -z "$PRETIX_DB_PASSWORD" ]]; then
    echo " ✗ PRETIX_DB_PASSWORD not found in secrets/.env – aborting!"
    exit 1
fi
sed -i "s|^password=.*|password=${PRETIX_DB_PASSWORD}|" /opt/sv_bahrdorf/pretix/config/pretix.cfg
echo " ✓ pretix.cfg patched"

echo "Deploying pretix..."
cd /opt/sv_bahrdorf/pretix
docker compose up -d --build
echo " ✓ Pretix deployed"

echo "Building and deploying website..."
cd /opt/sv_bahrdorf/website
docker compose -f compose/prod/docker-compose.yml up -d --build

echo "Waiting for containers..."
sleep 5

echo "Health checks..."
curl -sf http://127.0.0.1:7090/health && echo " ✓ Website is live!" || echo " ✗ Website health check failed!"
curl -sf http://127.0.0.1:7091/svbahrdorf/tickets/ -o /dev/null && echo " ✓ Pretix is live!" || echo " ✗ Pretix health check failed!"