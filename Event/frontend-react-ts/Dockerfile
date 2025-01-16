# Imagen base para desarrollo
FROM node:18 AS development

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto de desarrollo de Vite
EXPOSE 8096

# Comando por defecto: iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]