# Imagen base de Python
FROM python:3.10-slim

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip 

# Copiar el archivo de requerimientos al contenedor
COPY requirements.txt ./

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto al contenedor
COPY . /app

# Crear el directorio de logs y archivo debug.log
RUN mkdir -p /app/backend_django/logs && touch /app/backend_django/logs/debug.log && chmod -R 777 /app/backend_django/logs

# Crear la carpeta staticfiles dentro del contenedor
RUN mkdir -p /app/backend_django/staticfiles

# Ejecutar collectstatic para recopilar archivos estáticos
RUN python manage.py collectstatic --noinput

# Exponer el puerto 8010
EXPOSE 8010

# Comando por defecto para iniciar el servidor de desarrollo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8010", "--insecure"]
