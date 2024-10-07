FROM node:18-bullseye AS base

# Set working directory
WORKDIR /app

# Install turbo globally
RUN npm install turbo --global

# ----------------------------------------
# Builder stage: Prepare the build context
# ----------------------------------------
FROM base AS builder

# Copy the entire repository
COPY . .

# Ensure the contents of the /app directory are as expected
RUN ls -l /app

# Tailwind and CSS configuration
COPY apps/web/tailwind.config.js apps/web/tailwind.config.js
COPY apps/web/postcss.config.js apps/web/postcss.config.js
COPY apps/web/styles apps/web/styles

# Verify the copied files
RUN ls -l /app/apps/web

# Run Turbo to prune unnecessary packages
RUN turbo prune --docker

# ----------------------------------------
# Installer stage: Install dependencies
# ----------------------------------------
FROM base AS installer
WORKDIR /app

# Copy the lockfile and other necessary files from the builder
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm and project dependencies
RUN npm install pnpm --global
RUN pnpm install

# Copy the web app files
COPY --from=builder /app/out/full/apps/web ./apps/web
COPY turbo.json turbo.json

# Build the project
RUN pnpm turbo build --filter=web...

# ----------------------------------------
# Runner stage: Create the final image
# ----------------------------------------
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files from the installer stage
COPY --from=installer /app/apps/web/next.config.js ./apps/web/
COPY --from=installer /app/apps/web/package.json ./apps/web/

# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./apps/web/.next/standalone
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Run the application
CMD PORT=3001 HOSTNAME=0.0.0.0 node apps/web/server.js
