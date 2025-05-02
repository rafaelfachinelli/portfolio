# Build Stage
FROM node:23-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./

# Build como root
RUN npm run build

# Agora garanta que a pasta inteira está com o user certo
RUN chown -R 1001:1001 /app

# Production Stage
FROM node:23-slim AS production

WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=build /app /app

COPY ./start.sh ./
RUN chmod +x ./start.sh

USER nextjs
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
CMD ["./start.sh"]
