# sindaril-back

API backend for Sindaril — Fastify, TypeScript, Prisma 7, PostgreSQL.

## Prerequisites

- Node.js 22+
- PostgreSQL (Neon or local)

## First-time setup

```bash
git clone git@github.com:VincentCMLejeune/sindaril-back.git
cd sindaril-back

cp .env.example .env
# Edit .env and set DATABASE_URL to your PostgreSQL connection string

npm install
npm run db:generate
```

## Launch

### Development

Starts the API with hot reload on `http://localhost:3000` (or the port set in `.env`):

```bash
npm run dev
```

### Production

Build TypeScript, then run the compiled server:

```bash
npm run build
npm start
```

## Verify the server

With the server running:

```bash
curl http://localhost:3000/health
# {"status":"ok"}

curl http://localhost:3000/health/db
# {"status":"ok","db":true}
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server (requires `npm run build` first) |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | required |
| `PORT` | HTTP port | `3000` |
| `HOST` | Bind address | `0.0.0.0` |
| `CORS_ORIGIN` | Allowed origin(s), comma-separated or `*` | `*` |

`DATABASE_URL` is read by the app at runtime and by Prisma CLI via `prisma.config.ts`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | API health check |
| GET | `/health/db` | Database connectivity check |

## Project structure

```
src/
  app.ts          # Fastify instance & plugin registration
  server.ts       # Entry point
  config/         # Environment validation (Zod)
  plugins/        # Fastify plugins (CORS, Prisma)
  routes/         # Route handlers
prisma/
  schema.prisma   # Database schema
prisma.config.ts  # Prisma 7 CLI config (DATABASE_URL)
```
