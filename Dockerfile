# Site (apps/site) image. Built from the repository root so the npm
# workspaces (apps/*, packages/*) resolve during the build.

# -------------------
# BUILD STAGE
# -------------------
FROM node:23-slim AS builder

WORKDIR /app

# Manifests first, for a cached dependency layer.
COPY package.json package-lock.json turbo.json ./
COPY apps/site/package.json apps/site/package.json
COPY packages/ packages/
RUN npm ci

COPY . .

# Builds the site and every workspace package it depends on.
RUN npx turbo run build --filter=@rafaelfachinelli/site

# -------------------
# PRODUCTION STAGE
# -------------------
FROM node:23-slim AS production

WORKDIR /app

ENV NODE_ENV=production

# curl for health checks; non-root user.
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* \
	&& addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder --chown=1001:1001 /app/apps/site ./apps/site

WORKDIR /app/apps/site
RUN chmod +x ./start.sh

USER nextjs

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

CMD ["./start.sh"]
