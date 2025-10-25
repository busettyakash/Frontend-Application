# Multi-stage build for Next.js application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies (ignore peer dependency conflicts like React 19)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Use built-in non-root user (from Node base image)
USER node

# Copy built application from builder
COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nextjs /app/package*.json ./
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Build metadata labels
ARG BUILD_ID=unknown
ARG BUILD_DATE
ARG VCS_REF

LABEL org.opencontainers.image.title="Frontend-dev"
LABEL org.opencontainers.image.description="Jain University Login Portal"
LABEL org.opencontainers.image.build-id="${BUILD_ID}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${VCS_REF}"

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node_modules/.bin/next", "start"]
