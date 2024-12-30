# Etapa 1: Construcción de la aplicación
FROM node:20-alpine as builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de construcción desde la etapa 1
COPY --from=builder /app ./

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start"]