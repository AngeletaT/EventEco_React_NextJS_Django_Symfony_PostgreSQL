# Imagen base
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto de desarrollo
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev"]