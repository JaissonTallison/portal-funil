#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# PortalFunil — Backup PostgreSQL
# Uso: bash scripts/backup.sh [--retention-days N] [--dir /caminho]
# Funciona tanto com pg_dump local quanto via docker exec (auto-detectado)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# ── Carrega .env ──────────────────────────────────────────────────────────────
ENV_FILE="$ROOT_DIR/apps/api/.env"
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source <(grep -v '^#' "$ENV_FILE" | grep -v '^[[:space:]]*$' | sed 's/ *= */=/')
  set +a
fi

# ── Parâmetros ────────────────────────────────────────────────────────────────
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --retention-days) RETENTION_DAYS="$2"; shift 2 ;;
    --dir)            BACKUP_DIR="$2";     shift 2 ;;
    *) echo "Flag desconhecida: $1"; exit 1 ;;
  esac
done

mkdir -p "$BACKUP_DIR"

# ── Parse da DATABASE_URL ─────────────────────────────────────────────────────
DB_URL="${DATABASE_URL:-postgresql://portalfunil:portalfunil_dev@localhost:5433/portalfunil}"
DB_USER="$(echo "$DB_URL" | sed -n 's|.*://\([^:]*\):.*|\1|p')"
DB_PASS="$(echo "$DB_URL" | sed -n 's|.*://[^:]*:\([^@]*\)@.*|\1|p')"
DB_HOST="$(echo "$DB_URL" | sed -n 's|.*@\([^:]*\):.*|\1|p')"
DB_PORT="$(echo "$DB_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')"
DB_NAME="$(echo "$DB_URL" | sed -n 's|.*/\([^?]*\)|\1|p')"

# ── Timestamp e nome ──────────────────────────────────────────────────────────
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
BACKUP_FILE="$BACKUP_DIR/portalfunil-${TIMESTAMP}.sql"
BACKUP_LATEST="$BACKUP_DIR/portalfunil-latest.sql"

echo "▶ Iniciando backup: $(date)"
echo "  Banco:    $DB_NAME @ $DB_HOST:$DB_PORT"
echo "  Arquivo:  $BACKUP_FILE"

# ── Executa pg_dump (local ou via docker exec) ────────────────────────────────
if command -v pg_dump &> /dev/null; then
  echo "  Método:   pg_dump local"
  PGPASSWORD="$DB_PASS" pg_dump \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="$DB_NAME" \
    --no-password \
    --clean \
    --if-exists \
    --create \
    > "$BACKUP_FILE"
else
  # Detecta container do postgres
  CONTAINER="portalfunil_db"
  if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
    echo "✗ pg_dump não encontrado e container '$CONTAINER' não está rodando."
    echo "  Instale postgresql-client ou inicie o container com: pnpm db:up"
    exit 1
  fi
  echo "  Método:   docker exec ($CONTAINER)"
  docker exec -e PGPASSWORD="$DB_PASS" "$CONTAINER" \
    pg_dump \
      --host=localhost \
      --port=5432 \
      --username="$DB_USER" \
      --dbname="$DB_NAME" \
      --clean \
      --if-exists \
      --create \
    > "$BACKUP_FILE"
fi

cp "$BACKUP_FILE" "$BACKUP_LATEST"

BACKUP_SIZE="$(du -sh "$BACKUP_FILE" | cut -f1)"
echo "✓ Backup concluído: $BACKUP_SIZE"

# ── Limpeza por retenção ──────────────────────────────────────────────────────
echo "▶ Removendo backups com mais de ${RETENTION_DAYS} dias..."
REMOVED=0
while IFS= read -r old_file; do
  rm -f "$old_file"
  REMOVED=$((REMOVED + 1))
  echo "  Removido: $(basename "$old_file")"
done < <(find "$BACKUP_DIR" -name "portalfunil-[0-9]*.sql" -mtime "+${RETENTION_DAYS}" 2>/dev/null || true)
echo "  ${REMOVED} arquivo(s) removido(s)"

# ── Listagem final ────────────────────────────────────────────────────────────
echo ""
echo "── Backups disponíveis ──────────────────────────────────────"
ls -lh "$BACKUP_DIR"/portalfunil-*.sql 2>/dev/null | awk '{print "  " $NF " (" $5 ")"}' || echo "  (nenhum)"
echo "──────────────────────────────────────────────────────────────"
echo "✓ Concluído em $(date)"
