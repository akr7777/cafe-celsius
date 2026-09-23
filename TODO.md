Steps to follow when a real backend gets wired up (not needed for the static site itself — see README.md).

## Prisma

Scaffold your Prisma schema (uses the `DATABASE_URL` already set in `.env`):

```sh
pnpm dlx prisma init --datasource-provider postgresql
```

Then define your models and run `pnpm prisma:generate` (add a `prisma:migrate` script, or run `pnpm dlx prisma migrate dev` directly). See <https://www.prisma.io/docs/getting-started>
