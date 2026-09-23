# install all dependencies (devDeps + deps) for build & migrations
FROM node:24-alpine AS deps-dev
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
# install production-only dependencies for the runtime image
FROM node:24-alpine AS deps-prod
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
# build the application
FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
# production runtime image
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000
ENV DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public
COPY package.json pnpm-lock.yaml* ./
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD [ "node", "./dist/server/index.mjs" ]
