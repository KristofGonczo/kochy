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

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses Next.js' development server and updates as you edit files.

Useful commands:

```bash
pnpm lint
pnpm build
pnpm start
```

## Tech stack

### Current

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/)
- [Base UI](https://base-ui.com/)
- [Lucide](https://lucide.dev/) icons
- [pnpm](https://pnpm.io/) for package management

### Planned

The following tools will be added as the application grows:

- [PostgreSQL](https://www.postgresql.org/) for the database
- [Auth.js](https://authjs.dev/) for authentication
- [Prisma](https://www.prisma.io/) as the ORM

## Contribution guidelines

- Keep changes focused and consistent with the existing codebase.
- Run `pnpm lint` before opening a pull request.
- Run `pnpm build` when changes may affect the production build.
- Include a clear description of the problem and solution in pull requests.
