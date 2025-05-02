# Build Stage
FROM node:23-slim AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY ./ ./

# Build the application
RUN npm run build

# Production Stage
FROM node:23-slim AS production

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/server.js ./

# Adjust permissions for start.sh before switching to the nextjs user
COPY ./start.sh ./
RUN chmod +x ./start.sh

# Switch to the nextjs user after setting permissions
USER nextjs

EXPOSE 8080

# server.js is created by next build from the standalone output
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]