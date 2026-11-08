<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI Components

- Use shadcn components for UI work. Reuse an existing component before creating a new one.
- When a needed component is missing, install it with the shadcn CLI (for example, `pnpm dlx shadcn@latest add <component>`).
- Update shadcn components with the shadcn CLI rather than replacing their generated implementation manually.

## Testing

- Use Jest for unit and component tests.
- Use the existing Testing Library utilities and repository test helpers for React components.
- Run focused tests with `pnpm test -- <path>`; run the full suite with `pnpm test`.
