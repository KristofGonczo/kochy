# Contributing to kochy

Thank you for your interest in contributing to kochy. Contributions, bug reports, and ideas are welcome.

## Development setup

### Prerequisites

- Node.js
- pnpm 12+

Install dependencies from the repository root:

```bash
pnpm install
```

Start the local PostgreSQL database before running the app:

```bash
docker compose up -d postgres
```

The app requires this Docker Compose service to be running locally. The root [`docker-compose.yml`](./docker-compose.yml) is for local development only and is not a production deployment configuration. By default, it creates the `kochy` database for the `kochy` user with the password `kochy_dev_password`, exposed at `localhost:5432`. Set `POSTGRES_DB`, `POSTGRES_USER`, or `POSTGRES_PASSWORD` in your environment before starting Compose to override these development defaults.

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses Next.js' development server and updates as you edit files.

Stop the database while preserving its data:

```bash
docker compose down
```

Useful commands:

```bash
pnpm lint
pnpm build
pnpm start
```

Prisma commands:

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:studio
```

Run `pnpm prisma:generate` after changing the Prisma schema. Use `pnpm prisma:migrate` to create and apply a development migration, and `pnpm prisma:studio` to inspect the local database in Prisma Studio.

## Tech stack

### Current

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/)
- [Base UI](https://base-ui.com/)
- [Lucide](https://lucide.dev/) icons
- [PostgreSQL](https://www.postgresql.org/) for local development
- [Prisma](https://www.prisma.io/) as the ORM
- [Better Auth](https://www.better-auth.com/) for authentication
- [pnpm](https://pnpm.io/) for package management

## Contribution guidelines

- Keep changes focused and consistent with the existing codebase.
- Run `pnpm lint` before opening a pull request.
- Run `pnpm build` when changes may affect the production build.
- Include a clear description of the problem and solution in pull requests.
