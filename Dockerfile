# Build Stage
FROM node:23-slim AS build

WORKDIR /app

# Instala dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o código
COPY . .

# Garante que o diretório de saída tenha permissões certas
RUN rm -rf .next && npm run build

# Production Stage
FROM node:23-slim AS production

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copia arquivos gerados já com permissões corretas
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/server.js ./
COPY --from=build /app/start.sh ./

# Permissões do script de inicialização
RUN chmod +x ./start.sh

# Só agora troca para o usuário não root
USER nextjs

EXPOSE 8080

CMD ["./start.sh"]
