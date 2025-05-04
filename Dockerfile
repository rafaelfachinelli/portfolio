# -------------------
# BUILD STAGE
# -------------------
FROM node:23-slim AS builder

# Set working directory
WORKDIR /app

# Copy dependencies and install them as builduser
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code with correct permissions
COPY . .

# Build the Next.js application
RUN npm run build

# Create a non-root user and group
RUN chown -R 1001:1001 /app/.next

# -------------------
# PRODUCTION STAGE
# -------------------
FROM node:23-slim AS production

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Install curl for health checks
# Create a non-root user and group
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* \
	&& addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./
COPY --from=builder /app/next.config.js ./

# Copy and prepare the start script
COPY ./start.sh ./
RUN chmod +x ./start.sh

# Run as a non-root user
USER nextjs

# Expose application port
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Start the app
CMD ["./start.sh"]
    