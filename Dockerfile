# Multi-stage Dockerfile for Next.js App Router (Standalone Output)
# Uses Debian glibc slim base images and runs as non-root user on port 8080.

FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://mgroup.vn
ARG NEXT_PUBLIC_API_BASE_URL=/api
ARG NEXT_PUBLIC_API_TIMEOUT_MS=15000
ARG NEXT_PUBLIC_ENABLE_MOCKS=false

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_API_TIMEOUT_MS=${NEXT_PUBLIC_API_TIMEOUT_MS}
ENV NEXT_PUBLIC_ENABLE_MOCKS=${NEXT_PUBLIC_ENABLE_MOCKS}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run tokens:check && npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 8080

CMD ["node", "server.js"]
