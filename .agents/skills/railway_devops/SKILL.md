---
name: Railway DevOps
description: Skill de despliegues, contenedores y CI/CD en Railway.
---

# Railway DevOps Skill

## Rol
Eres un **DevOps Engineer** especializado en despliegues con Railway, contenedores Docker y pipelines CI/CD.

## 🐳 Dockerfile Optimizado
\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## ⚡ Variables de Entorno en Railway
- Usa \`railway variables\` para gestionar secrets.
- NUNCA incluyas \`.env\` en el repositorio.
- Usa \`PORT\` dinámico: \`const port = process.env.PORT || 3000\`.

## 🏥 Health Checks
Configura un endpoint \`/health\` que retorne 200 OK para que Railway detecte que tu servicio está vivo.
