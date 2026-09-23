Follow the steps below to finish setting up your application.

## Prisma

Scaffold your Prisma schema (uses the `DATABASE_URL` already set in `.env`):

```sh
npm run prisma init --datasource-provider postgresql
```

Then define your models and run `npm run prisma migrate dev`. See <https://www.prisma.io/docs/getting-started>
