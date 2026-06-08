# PortalFunil

Plataforma de notícias, agenda cultural e gestão de conteúdo construída com foco em performance, SEO, escalabilidade e experiência editorial.

## Visão Geral

O PortalFunil é uma aplicação full stack desenvolvida para publicação e gerenciamento de conteúdo digital, incluindo:

* Notícias
* Agenda Cultural
* Categorias
* Autores
* Conteúdo Editorial
* SEO Avançado

A arquitetura foi construída utilizando monorepo com separação entre frontend e backend.

---

## Stack Tecnológica

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* App Router

### Backend

* NestJS
* JWT Authentication
* Prisma ORM
* Class Validator

### Banco de Dados

* PostgreSQL

### Infraestrutura

* Docker
* Docker Compose
* Redis

---

## Estrutura do Projeto

```text
PortalFunil/
│
├── apps/
│   ├── web/        # Frontend Next.js
│   └── api/        # Backend NestJS
│
├── infra/
│   └── docker/     # Containers e infraestrutura
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Status do Projeto

### Frontend

* [x] Layout principal
* [x] Sistema de componentes
* [x] SEO técnico
* [x] Sitemap
* [x] Robots.txt
* [x] Open Graph
* [x] Schema.org

### Backend

* [x] Estrutura NestJS
* [x] Autenticação JWT
* [x] Prisma Schema
* [x] CRUD de artigos
* [x] Integração completa com frontend
* [x] Módulo de eventos
* [x] Módulo de categorias

### Infraestrutura

* [x] Docker Compose
* [x] PostgreSQL
* [x] Redis
* [x] Deploy automatizado

---

## Como Executar

### Instalar dependências

```bash
pnpm install
```

### Subir banco e Redis

```bash
pnpm db:up
```

### Executar migrations

```bash
pnpm db:migrate
```

### Iniciar desenvolvimento

```bash
pnpm dev
```

---

## Variáveis de Ambiente

Criar os arquivos:

```bash
apps/web/.env.local
apps/api/.env
```

Configurar conforme os exemplos fornecidos no projeto.

---

## Roadmap

### Fase Atual

* Integração Frontend ↔ Backend
* Remoção de mock data
* Conexão com PostgreSQL

### Próximas Fases

* Painel Administrativo
* Workflow Editorial
* Gestão de Usuários
* Sistema de Anúncios
* Analytics
* Deploy de Produção

---

## Arquitetura

O projeto segue os princípios de:

* Separação de responsabilidades
* Modularização
* Escalabilidade
* SEO First
* Clean Code

---

## Licença

Projeto privado desenvolvido por Jaisson Tallison.
