# Datum Storybook (apps/datum), served as a static site by nginx.
# Build context: the repository root (npm workspaces).

FROM node:23-slim AS builder

WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/site/package.json apps/site/package.json
COPY apps/datum/package.json apps/datum/package.json
COPY packages/ packages/
RUN npm ci

COPY . .

RUN npx turbo run build --filter=@datum/storybook

FROM nginx:1.27-alpine AS production

COPY apps/datum/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/datum/storybook-static /usr/share/nginx/html

EXPOSE 80
