# Contributing to kochy

Thank you for your interest in contributing to kochy. Contributions, bug reports, and ideas are welcome.

## Development setup

### Prerequisites

- Node.js 26+
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

Drizzle commands:

```bash
npx drizzle-kit generate
npx exec drizzle-kit migrate
npx exec drizzle-kit studio
```

The Drizzle schema is defined in [`db/schema.ts`](./db/schema.ts), with configuration in [`drizzle.config.ts`](./drizzle.config.ts). Run `pnpm exec drizzle-kit generate` after changing the schema to create a migration, then run `pnpm exec drizzle-kit migrate` to apply pending migrations. Use `pnpm exec drizzle-kit studio` to inspect the local database in Drizzle Studio.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/)
- [Base UI](https://base-ui.com/)
- [Lucide](https://lucide.dev/) icons
- [PostgreSQL](https://www.postgresql.org/) for local development
- [Drizzle ORM](https://orm.drizzle.team/) for database access and migrations
- [Better Auth](https://www.better-auth.com/) for authentication
- [next-intl](https://next-intl.dev/) for internationalization
- [pnpm](https://pnpm.io/) for package management

## Translations

Translations are stored as JSON message catalogs in the [`messages/`](./messages/) directory. To edit an existing translation, update the corresponding locale file, such as [`messages/en.json`](./messages/en.json) or [`messages/hu.json`](./messages/hu.json). Keep the message keys and nesting identical across all catalogs; add or update the translated text without renaming keys.

To add a language:

1. Add its short locale code and display name to [`i18n/locales.ts`](./i18n/locales.ts).
2. Create a message catalog in `messages/<locale>.json`.
3. Copy the structure of [`messages/en.json`](./messages/en.json) and translate every message, keeping all keys unchanged.

## Contribution guidelines

- Keep changes focused and consistent with the existing codebase.
- Run `pnpm lint` before opening a pull request.
- Run `pnpm build` when changes may affect the production build.
- Include a clear description of the problem and solution in pull requests.
