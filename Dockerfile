# Dockerfile - EstudioSimple optimizado para Railway y Neon Scale-to-Zero
FROM node:20-alpine AS base

# Instalacion de librerias necesarias para Prisma en Alpine
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# -----------------------------------------------------------------------------
# FASE 1: DEPENDENCIAS
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY "Web Studio Simple/package.json" "Web Studio Simple/package-lock.json*" "./Web Studio Simple/"
COPY prisma ./prisma/

# Instalar dependencias de root y del frontend Vite
RUN npm ci
RUN cd "Web Studio Simple" && npm ci
RUN npx prisma generate

# -----------------------------------------------------------------------------
# FASE 2: COMPILACION (BUILDER)
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/Web\ Studio\ Simple/node_modules ./Web\ Studio\ Simple/node_modules
COPY . .

# Regenerar cliente Prisma con el esquema final
RUN npx prisma generate

# Compilar frontend Vite a dist/
RUN npm run build --prefix "Web Studio Simple"

# -----------------------------------------------------------------------------
# FASE 3: RUNNER DE PRODUCCION (MINIMO PESO Y MEMORIA)
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Crear usuario sin privilegios root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copiar dependencias de produccion y archivos de ejecucion
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/server.js ./server.js
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nodejs:nodejs /app/Web\ Studio\ Simple/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/Web\ Studio\ Simple/dist ./Web\ Studio\ Simple/dist

USER nodejs

EXPOSE 3000

# Iniciar servidor de produccion ligero
CMD ["node", "server.js"]
