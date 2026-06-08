# PortalFunil — Runbook Operacional v1.1.1

> Este documento cobre procedimentos de operação do dia a dia.
> Qualquer administrador deve conseguir executar todos os procedimentos descritos aqui.

---

## Índice

1. [Subir o ambiente](#1-subir-o-ambiente)
2. [Verificar saúde do sistema](#2-verificar-saúde-do-sistema)
3. [Backup do banco de dados](#3-backup-do-banco-de-dados)
4. [Restaurar backup](#4-restaurar-backup)
5. [Resetar senha de usuário](#5-resetar-senha-de-usuário)
6. [Recuperação de falhas](#6-recuperação-de-falhas)
7. [Monitorar pendências editoriais](#7-monitorar-pendências-editoriais)
8. [Expiração de classificados](#8-expiração-de-classificados)
9. [Produção com PM2](#9-produção-com-pm2)

---

## 1. Subir o ambiente

### Pré-requisitos

- Docker Desktop ou Docker Engine + Compose v2
- Node.js 20+
- pnpm 9+
- PostgreSQL client (`pg_dump`, `psql`) para backups

### Passo a passo

```bash
# 1. Clonar e instalar dependências
git clone <repo>
cd PortalFunil
pnpm install

# 2. Subir PostgreSQL + Redis
pnpm db:up

# 3. Configurar variáveis de ambiente (se ainda não existir)
cp apps/api/.env.example apps/api/.env   # editar conforme necessário

# 4. Rodar migrações do banco
pnpm db:migrate

# 5. Popular banco com dados iniciais (opcional)
pnpm --dir apps/api db:seed

# 6. Iniciar frontend e backend em desenvolvimento
pnpm dev
```

**URLs após subida:**
| Serviço   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:3010         |
| API       | http://localhost:3002/api/v1  |
| Health    | http://localhost:3002/api/v1/health |

---

## 2. Verificar saúde do sistema

### Via painel admin

Acesse `/admin/saude` como ADMIN.

### Via terminal

```bash
curl -s http://localhost:3002/api/v1/health | python3 -m json.tool
```

**Resposta esperada (sistema saudável):**

```json
{
  "status": "ok",
  "version": "1.1.1",
  "uptime": 3600,
  "services": {
    "database": "up",
    "redis": "up",
    "uploads": "ok",
    "api": "up"
  },
  "disk": {
    "totalGb": 475,
    "freeGb": 450,
    "usedPercent": 5,
    "status": "ok"
  }
}
```

**Interpretação de `status`:**
- `"ok"` — todos os serviços operacionais
- `"degraded"` — banco fora do ar ou disco acima de 90%

---

## 3. Backup do banco de dados

### Backup manual

```bash
pnpm backup:db
```

O arquivo será salvo em `backups/portalfunil-YYYY-MM-DD_HH-MM-SS.sql`.

### Opções

```bash
# Retenção de 14 dias (padrão: 7)
pnpm backup:db --retention-days 14

# Diretório alternativo
pnpm backup:db --dir /mnt/backup/portalfunil
```

### Backup automático via cron do sistema operacional

Adicionar ao crontab (`crontab -e`):

```cron
# Backup diário às 03:00
0 3 * * * cd /path/to/PortalFunil && bash scripts/backup.sh >> /var/log/portalfunil-backup.log 2>&1
```

### Verificar backups disponíveis

```bash
ls -lh backups/
```

---

## 4. Restaurar backup

> ⚠️ **ATENÇÃO:** Esta operação sobrescreve o banco atual. Faça um backup antes.

### Usar o backup mais recente

```bash
pnpm restore:db
# ou diretamente:
bash scripts/restore.sh
```

### Usar um backup específico

```bash
bash scripts/restore.sh backups/portalfunil-2026-06-08_03-00-00.sql
```

O script pedirá confirmação digitando `sim` antes de prosseguir.

---

## 5. Resetar senha de usuário

Use quando um usuário (incluindo ADMIN) não consegue fazer login.

### Com senha gerada automaticamente

```bash
pnpm user:reset-password usuario@email.com
```

### Com senha manual

```bash
pnpm user:reset-password usuario@email.com MinhaNovaSenh@123
```

**O script irá:**
1. Mostrar informações do usuário encontrado
2. Pedir confirmação
3. Atualizar o hash da senha no banco
4. Registrar a ação no Audit Log
5. Exibir a nova senha na tela

> ⚠️ A nova senha aparece **apenas uma vez** no terminal. Comunique ao usuário imediatamente.

---

## 6. Recuperação de falhas

### Banco de dados inacessível

```bash
# Verificar se o container está rodando
docker ps | grep portalfunil_db

# Se o container não estiver Up, reiniciar
pnpm db:up

# Verificar logs do container
docker logs portalfunil_db --tail 50

# Se o volume estiver corrompido, restaurar de backup
pnpm restore:db
```

### Redis inacessível

```bash
docker ps | grep portalfunil_cache
docker logs portalfunil_cache --tail 50
pnpm db:up   # sobe todos os containers do compose
```

### API não responde

```bash
# Em desenvolvimento: reiniciar manualmente
pnpm dev:api

# Em produção com PM2:
pm2 restart portalfunil-api
pm2 logs portalfunil-api --lines 50
```

### Disco quase cheio (>90%)

```bash
# Ver uso por diretório
du -sh /* 2>/dev/null | sort -hr | head -20

# Limpar logs antigos da API (se usando PM2)
pm2 flush

# Remover imagens de upload antigas se necessário
ls -lhS apps/api/public/uploads/articles/ | tail -20

# Remover backups além do período de retenção
find backups/ -name "*.sql" -mtime +30 -delete
```

### Frontend não carrega

```bash
# Verificar se a API está rodando
curl http://localhost:3002/api/v1/health

# Reconstruir o frontend
pnpm build:web
```

---

## 7. Monitorar pendências editoriais

Acesse `/admin/dashboard` como ADMIN ou EDITOR.

O dashboard exibe alertas visuais para:
- Artigos aguardando revisão (REVIEW)
- Classificados para aprovar (PENDING)
- Denúncias em análise (RECEIVED + UNDER_REVIEW)

### Via API (para scripts de monitoramento)

```bash
# Requer cookie de sessão autenticada
curl -s -b "pf_access_token=SEU_TOKEN" \
  http://localhost:3002/api/v1/stats | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Revisão: {d[\"articles\"][\"review\"]} | Pendentes: {d[\"listings\"][\"pending\"]} | Denúncias: {d[\"reports\"][\"pending\"]}')"
```

---

## 8. Expiração de classificados

Classificados com `expiresAt` no passado são expirados automaticamente a cada 1 hora.

### Disparar manualmente via API

```bash
curl -X POST \
  -b "pf_access_token=SEU_TOKEN" \
  http://localhost:3002/api/v1/listings/admin/run-expiry
```

Resposta esperada:
```json
{ "expired": 3, "message": "3 classificado(s) expirado(s)" }
```

A ação é registrada no Audit Log com `action: STATUS_CHANGE`.

---

## 9. Produção com PM2

### Instalar PM2

```bash
npm install -g pm2
```

### Build e start

```bash
# Build da API
pnpm build:api

# Start com PM2
pm2 start ecosystem.config.cjs

# Verificar status
pm2 status

# Ver logs
pm2 logs portalfunil-api
```

### Habilitar no boot do sistema

```bash
pm2 save
pm2 startup
# Executar o comando que aparecer na tela
```

### Atualização sem downtime

```bash
pnpm build:api
pm2 reload portalfunil-api
```

---

## Contatos e responsabilidades

| Papel             | Responsabilidade                        |
|-------------------|-----------------------------------------|
| ADMIN             | Gerenciar usuários, aprovar conteúdo    |
| EDITOR            | Revisar e publicar artigos, denúncias   |
| JOURNALIST        | Criar e submeter artigos para revisão   |
| DevOps (este doc) | Backups, deploys, recuperação de falhas |

---

*Última atualização: 2026-06-08 — v1.1.1 HARDENING OPERACIONAL*
