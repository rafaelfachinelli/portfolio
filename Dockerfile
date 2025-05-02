# Build Stage
FROM node:23-slim AS build

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

USER root
RUN chown -R 1001:1001 /app/.next

# Production Stage
FROM node:23-slim AS production

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/server.js ./

COPY ./start.sh ./
RUN chmod +x ./start.sh

USER nextjs

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]
