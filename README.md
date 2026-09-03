# Release Hub

Release Hub is a self-hosted internal tool for organizing frontend and Android projects, environments, and release artifacts in one place.

> [!WARNING]
> Release Hub is currently in early development.
> The current version contains the application foundation, authentication foundation, and database schema. The main dashboard and release-management workflows are still planned.

## Overview

Release Hub is designed to simplify everyday release management for frontend and Android applications.

The long-term goal is to provide one place to:

- organize projects into groups;
- store development, preview, and production environments;
- manage APK releases and release metadata;
- publish and download APK versions;
- verify APK files using SHA-256 checksums;
- keep application store links;
- manage project localizations;
- store project preview images;
- review project activity history.

## Current implementation

The current version includes:

- Next.js application shell;
- email and password sign-up;
- email and password sign-in;
- password hashing with Argon2id;
- database-backed session creation;
- HttpOnly session cookies;
- PostgreSQL database configuration;
- Prisma schema and initial migration;
- environment validation with Zod;
- formatting, linting, type-checking, and unused-code analysis configuration.

The following parts are not implemented yet:

- dashboard pages;
- protected application routes;
- session validation and logout;
- password recovery;
- project and project-group management;
- environment management UI;
- APK upload and storage;
- APK publishing and downloading;
- automatic APK checksum generation;
- store links and localization management;
- activity history.

## Planned features

### Authentication

- [x] Sign-up foundation
- [x] Sign-in foundation
- [x] Argon2id password hashing
- [x] Database-backed session creation
- [ ] Session validation
- [ ] Logout
- [ ] Password recovery
- [ ] Protected dashboard routes

### Project management

- [ ] Project groups
- [ ] Project creation and editing
- [ ] Project status management
- [ ] Repository links
- [ ] Project preview images
- [ ] Project overview page

### Environments

- [ ] Development environments
- [ ] Staging and preview environments
- [ ] Production environments
- [ ] Environment availability status
- [ ] Environment management UI

### APK releases

- [ ] APK upload
- [ ] Release metadata
- [ ] Version and version-code tracking
- [ ] File storage
- [ ] SHA-256 checksum generation
- [ ] Release processing states
- [ ] APK publishing
- [ ] Previous release downloads

### Project information

- [ ] Application store links
- [ ] Project localizations
- [ ] Project activity history

## Domain model

The current database model contains:

- `User` — application user;
- `Session` — persisted authentication session;
- `ProjectGroup` — group of projects;
- `Project` — frontend or Android application project;
- `Environment` — project environment and its URL;
- `ApkRelease` — APK release metadata and status.

The Prisma schema is available in [`prisma/schema.prisma`](./prisma/schema.prisma).

Additional entity notes are available in [`docs/entities.md`](./docs/entities.md).

## Tech stack

### Application

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Data and authentication

- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Argon2](https://github.com/ranisalt/node-argon2)
- [Zod](https://zod.dev/)

### Tooling

- [Bun](https://bun.sh/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- [ESLint](https://eslint.org/)
- [Oxfmt](https://oxc.rs/)
- [Knip](https://knip.dev/)
- [Lefthook](https://github.com/evilmartians/lefthook)

## Requirements

- Bun `>= 1.3.14`
- Node.js `>= 24`
- Docker with Docker Compose

## Getting started

Clone the repository:

```bash
git clone https://github.com/Fixer201/release-hub.git
cd release-hub
```

Install dependencies:

```bash
bun install --frozen-lockfile
```

Create the local environment file:

```bash
cp .env.example .env
```

Start PostgreSQL:

```bash
bun run db:up
```

Apply the committed database migrations:

```bash
bun run db:migrate:deploy
```

Generate the Prisma client:

```bash
bun run db:generate
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development commands

### Application

```bash
bun run dev
bun run build
bun run start
bun run preview
```

### Code quality

```bash
bun run check
bun run lint
bun run lint:fix
bun run format
bun run format:fix
bun run typecheck
bun run knip
```

`bun run check` runs formatting, linting, TypeScript checks, unused-code checks, and Prisma schema validation. The CI lint configuration treats warnings as errors.

### Database

```bash
bun run db:up
bun run db:down
bun run db:reset
bun run db:generate
bun run db:push
bun run db:migrate
bun run db:migrate:deploy
bun run db:migrate:status
bun run db:migrate:check
bun run db:studio
bun run db:validate
```

> [!CAUTION]
> `bun run db:reset` removes the local PostgreSQL container volume and all data stored in it.

Use `bun run db:migrate` when developing and creating migrations. Use `bun run db:migrate:deploy` to apply already committed migrations.

## Project structure

```text
release-hub/
├── docs/
│   └── entities.md
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── compose.yaml
├── package.json
└── .env.example
```

## Project status

Release Hub is a learning-focused full-stack project under active development.

## License

No license has been selected yet.
