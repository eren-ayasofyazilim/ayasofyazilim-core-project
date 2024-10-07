FROM node:18-bullseye AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .

RUN ls -l /app
RUN ls -l 
# Tailwind
COPY tailwind.config.ts tailwind.config.ts
COPY postcss.config.js postcss.config.js
RUN ls -l /app
RUN ls -l 


RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app

# tailwind
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY apps/web/styles ./apps/web/styles
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN npm install pnpm --global
RUN pnpm install
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST

RUN pnpm turbo build --filter=web...

FROM base AS runner
WORKDIR /app

@@ -69,13 +61,14 @@ RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD PORT=3001 HOSTNAME=0.0.0.0 node apps/web/server.js
