# -------------------
# BUILD STAGE
# -------------------
FROM node:23-slim AS build

# Create a non-root user for building
RUN addgroup --system builduser && adduser --system --ingroup builduser builduser

# Set working directory
WORKDIR /app

# Copy dependencies and install them as builduser
COPY --chown=builduser:builduser package.json package-lock.json ./
USER builduser
RUN npm install

# Copy application source code with correct permissions
COPY --chown=builduser:builduser . .

# Build the Next.js application
RUN npm run build

# Switch to root to fix permissions for nextjs user in the final image
USER root
RUN chown -R 1001:1001 /app/.next

# -------------------
# PRODUCTION STAGE
# -------------------
FROM node:23-slim AS production

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Create a secure runtime user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy only the necessary files from the build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/server.js ./

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
    