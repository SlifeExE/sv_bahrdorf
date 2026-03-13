#!/bin/bash
set -euo pipefail

cd /opt/sv_bahrdorf

echo "=== SV Bahrdorf Website Deploy ==="

# Ask for confirmation before overwriting local changes
read -p "Are you sure you want to deploy? This will overwrite local changes! (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
    echo "Aborted."
    exit 0
fi

echo "Pulling latest changes..."
git -C /opt/sv_bahrdorf fetch origin
git -C /opt/sv_bahrdorf reset --hard origin/main

echo "Loading Pretix secrets from .env..."

PRETIX_ENV_FILE="/opt/sv_bahrdorf/pretix/secrets/.env"
PRETIX_CFG="/opt/sv_bahrdorf/pretix/config/pretix.cfg"

PRETIX_DB_PASSWORD=$(grep '^PRETIX_DB_PASSWORD=' "$PRETIX_ENV_FILE" | cut -d '=' -f2-)
PRETIX_SECRET_KEY=$(grep '^PRETIX_SECRET_KEY=' "$PRETIX_ENV_FILE" | cut -d '=' -f2-)
PRETIX_SMTP_HOST=$(grep '^PRETIX_SMTP_HOST=' "$PRETIX_ENV_FILE" | cut -d '=' -f2- || true)
PRETIX_SMTP_USER=$(grep '^PRETIX_SMTP_USER=' "$PRETIX_ENV_FILE" | cut -d '=' -f2- || true)
PRETIX_SMTP_PASSWORD=$(grep '^PRETIX_SMTP_PASSWORD=' "$PRETIX_ENV_FILE" | cut -d '=' -f2- || true)

if [[ -z "${PRETIX_DB_PASSWORD:-}" ]]; then
    echo "✗ PRETIX_DB_PASSWORD not found in $PRETIX_ENV_FILE"
    exit 1
fi

if [[ -z "${PRETIX_SECRET_KEY:-}" ]]; then
    echo "✗ PRETIX_SECRET_KEY not found in $PRETIX_ENV_FILE"
    exit 1
fi

echo "Fixing figma:asset imports..."

# Fix imports in src/app/components -> ../../assets/
find /opt/sv_bahrdorf/website/src/src/app/components \( -name "*.tsx" -o -name "*.ts" \) -print0 | \
while IFS= read -r -d '' file; do
    sed -i 's|from "figma:asset/|from "../../assets/|g' "$file"
    sed -i "s|from 'figma:asset/|from '../../assets/|g" "$file"
    sed -i 's|from "../assets/|from "../../assets/|g' "$file"
    sed -i "s|from '../assets/|from '../../assets/|g" "$file"
done

# Fix imports in all other source files -> ../assets/
find /opt/sv_bahrdorf/website/src/src \( -name "*.tsx" -o -name "*.ts" \) \
    ! -path "/opt/sv_bahrdorf/website/src/src/app/components/*" -print0 | \
while IFS= read -r -d '' file; do
    sed -i 's|from "figma:asset/|from "../assets/|g' "$file"
    sed -i "s|from 'figma:asset/|from '../assets/|g" "$file"
done

echo "Patching pretix.cfg with secrets..."

# Patch database password only inside [database] block
awk -v dbpw="$PRETIX_DB_PASSWORD" '
BEGIN { in_database=0 }
{
    if ($0 ~ /^\[database\]/) in_database=1
    else if ($0 ~ /^\[/ && $0 !~ /^\[database\]/) in_database=0

    if (in_database && $0 ~ /^password=/) {
        print "password=" dbpw
    } else {
        print
    }
}
' "$PRETIX_CFG" > "${PRETIX_CFG}.tmp" && mv "${PRETIX_CFG}.tmp" "$PRETIX_CFG"

# Patch SMTP host only inside [mail] block
if [[ -n "${PRETIX_SMTP_HOST:-}" ]]; then
    awk -v smtp_host="$PRETIX_SMTP_HOST" '
    BEGIN { in_mail=0 }
    {
        if ($0 ~ /^\[mail\]/) in_mail=1
        else if ($0 ~ /^\[/ && $0 !~ /^\[mail\]/) in_mail=0

        if (in_mail && $0 ~ /^host=/) {
            print "host=" smtp_host
        } else {
            print
        }
    }
    ' "$PRETIX_CFG" > "${PRETIX_CFG}.tmp" && mv "${PRETIX_CFG}.tmp" "$PRETIX_CFG"
fi

# Patch SMTP user only inside [mail] block
if [[ -n "${PRETIX_SMTP_USER:-}" ]]; then
    awk -v smtp_user="$PRETIX_SMTP_USER" '
    BEGIN { in_mail=0 }
    {
        if ($0 ~ /^\[mail\]/) in_mail=1
        else if ($0 ~ /^\[/ && $0 !~ /^\[mail\]/) in_mail=0

        if (in_mail && $0 ~ /^user=/) {
            print "user=" smtp_user
        } else {
            print
        }
    }
    ' "$PRETIX_CFG" > "${PRETIX_CFG}.tmp" && mv "${PRETIX_CFG}.tmp" "$PRETIX_CFG"
fi

# Patch SMTP password only inside [mail] block
if [[ -n "${PRETIX_SMTP_PASSWORD:-}" ]]; then
    awk -v smtp_pw="$PRETIX_SMTP_PASSWORD" '
    BEGIN { in_mail=0 }
    {
        if ($0 ~ /^\[mail\]/) in_mail=1
        else if ($0 ~ /^\[/ && $0 !~ /^\[mail\]/) in_mail=0

        if (in_mail && $0 ~ /^password=/) {
            print "password=" smtp_pw
        } else {
            print
        }
    }
    ' "$PRETIX_CFG" > "${PRETIX_CFG}.tmp" && mv "${PRETIX_CFG}.tmp" "$PRETIX_CFG"
fi

echo "✓ pretix.cfg patched"

echo "Preparing Pretix and PostgreSQL data directories..."

PRETIX_DB_DIR="/opt/sv_bahrdorf/pretix/data/db"
PRETIX_DATA_DIR="/opt/sv_bahrdorf/pretix/data/pretix"
PRETIX_LOG_DIR="${PRETIX_DATA_DIR}/logs"

# Ensure directories exist
sudo mkdir -p "$PRETIX_DB_DIR"
mkdir -p "$PRETIX_LOG_DIR"

# PostgreSQL volume must belong to postgres user in container
sudo chown -R 999:999 "$PRETIX_DB_DIR"
sudo chmod 700 "$PRETIX_DB_DIR"
sudo find "$PRETIX_DB_DIR" -type d -exec chmod 700 {} \;
sudo find "$PRETIX_DB_DIR" -type f -exec chmod 600 {} \;

# Pretix data stays owned by admin on host
sudo chown -R admin:admin "$PRETIX_DATA_DIR"
chmod 755 "$PRETIX_DATA_DIR"
chmod 777 "$PRETIX_LOG_DIR"

# Write Pretix secret file from .env
printf '%s\n' "$PRETIX_SECRET_KEY" > "${PRETIX_DATA_DIR}/.secret"

# Create required log files
touch "${PRETIX_LOG_DIR}/pretix.log"
touch "${PRETIX_LOG_DIR}/csp.log"

# Permissions so container user can read/write
chmod 644 "${PRETIX_DATA_DIR}/.secret"
chmod 666 "${PRETIX_LOG_DIR}/pretix.log"
chmod 666 "${PRETIX_LOG_DIR}/csp.log"

echo "✓ Pretix and PostgreSQL data prepared"

echo "Deploying Pretix..."
cd /opt/sv_bahrdorf/pretix
docker compose --env-file /opt/sv_bahrdorf/pretix/secrets/.env up -d --build
docker restart sv_bahrdorf_pretix_db
docker restart sv_bahrdorf_pretix_redis
docker restart sv_bahrdorf_pretix
echo "✓ Pretix deployed"

echo "Building and deploying website..."
cd /opt/sv_bahrdorf/website
docker compose -f compose/prod/docker-compose.yml up -d --build

echo "Waiting for containers..."
sleep 10

echo "Health checks..."

if curl -sf http://127.0.0.1:7090/health > /dev/null; then
    echo "✓ Website is live!"
else
    echo "✗ Website health check failed!"
fi

if curl -sf -H "Host: tickets.svbahrdorf.de" http://127.0.0.1:7091/svbahrdorf/ -o /dev/null; then
    echo "✓ Pretix is live!"
else
    echo "✗ Pretix health check failed!"
fi

echo "Recent Pretix logs:"
docker logs --tail 40 sv_bahrdorf_pretix || true

echo "Recent PostgreSQL logs:"
docker logs --tail 20 sv_bahrdorf_pretix_db || true