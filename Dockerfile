# ==========================
# 🏗️ Stage 1: Build the Next.js app
# ==========================
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

# ==========================
# 🚀 Stage 2: Production image
# ==========================
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling (important for containers)
RUN apk add --no-cache dumb-init

# Use built-in non-root user (from Node base image)
USER node

# Copy built app and dependencies from builder stage
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Optional metadata labels
ARG BUILD_ID=unknown
ARG BUILD_DATE
ARG VCS_REF
LABEL org.opencontainers.image.title="Frontend-dev"
LABEL org.opencontainers.image.description="Jain University Login Portal"
LABEL org.opencontainers.image.build-id="${BUILD_ID}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${VCS_REF}"

# Health check for app
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Use dumb-init for PID 1 signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the Next.js production server
CMD ["node_modules/.bin/next", "start"]
