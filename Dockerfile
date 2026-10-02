# Dockerfile - EstudioSimple para Railway y Neon Scale-to-Zero
FROM node:20-alpine

# Instalacion de librerias necesarias para Prisma en Alpine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiar todo el codigo del proyecto (.dockerignore ya excluye node_modules, .git y archivos pesados)
COPY . .

# Instalar dependencias del root y del frontend
RUN npm install
RUN npm install --prefix "Web Studio Simple"

# Generar cliente Prisma para Linux Alpine
RUN npx prisma generate

# Compilar frontend Vite
RUN npm run build --prefix "Web Studio Simple"

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

# Iniciar servidor de produccion
CMD ["node", "server.js"]
