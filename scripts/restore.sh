#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# PortalFunil — Restaurar Backup PostgreSQL
# Uso: bash scripts/restore.sh [arquivo.sql]
#   Sem argumento: usa backups/portalfunil-latest.sql
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

ENV_FILE="$ROOT_DIR/apps/api/.env"
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source <(grep -v '^#' "$ENV_FILE" | grep -v '^[[:space:]]*$' | sed 's/ *= */=/')
  set +a
fi

BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups}"
BACKUP_FILE="${1:-$BACKUP_DIR/portalfunil-latest.sql}"

if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "✗ Arquivo não encontrado: $BACKUP_FILE"
  echo "  Use: bash scripts/restore.sh backups/portalfunil-YYYY-MM-DD_HH-MM-SS.sql"
  exit 1
fi

DB_URL="${DATABASE_URL:-postgresql://portalfunil:portalfunil_dev@localhost:5433/portalfunil}"
DB_USER="$(echo "$DB_URL" | sed -n 's|.*://\([^:]*\):.*|\1|p')"
DB_PASS="$(echo "$DB_URL" | sed -n 's|.*://[^:]*:\([^@]*\)@.*|\1|p')"
DB_HOST="$(echo "$DB_URL" | sed -n 's|.*@\([^:]*\):.*|\1|p')"
DB_PORT="$(echo "$DB_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')"
DB_NAME="$(echo "$DB_URL" | sed -n 's|.*/\([^?]*\)|\1|p')"
FILE_SIZE="$(du -sh "$BACKUP_FILE" | cut -f1)"

echo "⚠️  ATENÇÃO: Esta operação irá SOBRESCREVER o banco '$DB_NAME'."
echo "   Arquivo: $BACKUP_FILE ($FILE_SIZE)"
echo ""
read -r -p "   Confirma? (digite 'sim' para prosseguir): " CONFIRM

if [[ "$CONFIRM" != "sim" ]]; then
  echo "✗ Restauração cancelada."
  exit 0
fi

echo "▶ Restaurando..."

if command -v psql &> /dev/null; then
  PGPASSWORD="$DB_PASS" psql \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="postgres" \
    --no-password \
    -f "$BACKUP_FILE"
else
  CONTAINER="portalfunil_db"
  if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
    echo "✗ psql não encontrado e container '$CONTAINER' não está rodando."
    exit 1
  fi
  docker cp "$BACKUP_FILE" "$CONTAINER:/tmp/restore.sql"
  docker exec -e PGPASSWORD="$DB_PASS" "$CONTAINER" \
    psql --host=localhost --username="$DB_USER" --dbname=postgres -f /tmp/restore.sql
  docker exec "$CONTAINER" rm /tmp/restore.sql
fi

echo "✓ Restauração concluída em $(date)"
