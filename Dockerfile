# NanoPocket Ventures website — production image (Next.js + Payload, SQLite by default)
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# The build reads content from the database, so a DATABASE_URL must be reachable at build time.
RUN mkdir -p data media private && npm run build

FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app ./
USER nextjs
EXPOSE 3000
# Persist these: database, uploaded images, private pitch decks
VOLUME ["/app/data", "/app/media", "/app/private"]
CMD ["npm", "start"]
