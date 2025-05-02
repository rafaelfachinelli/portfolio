# Use the official Node.js 23 image as the base image
FROM node:23-slim AS base

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY ./node_modules ./node_modules
COPY ./public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static
COPY --chown=nextjs:nodejs ./server.js ./

# Custom server.js file to serve the standalone output
COPY --chown=nextjs:nodejs ./dist/server.js ./

USER nextjs

EXPOSE 8080

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Use a custom start script to run the server
COPY --chown=nextjs:nodejs ./start.sh ./
RUN chmod +x ./start.sh

# Use the start.sh script to run the server
CMD ["./start.sh"]