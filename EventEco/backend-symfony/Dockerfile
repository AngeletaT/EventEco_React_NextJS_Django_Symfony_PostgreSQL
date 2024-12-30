# Etapa 1: Construcción de la aplicación
FROM php:8.2-cli as builder

# Instala dependencias de sistema
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    postgresql-client \
    unzip \
    git \
    && docker-php-ext-install intl pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Verifica que los módulos estén instalados
RUN php -m | grep pdo_pgsql

# Etapa 2: Imagen final
FROM php:8.2-apache

# Instala dependencias para PostgreSQL en Apache
RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Copia la aplicación desde la etapa de construcción
COPY --from=builder /app /var/www/html

# Habilita módulos de Apache
RUN a2enmod rewrite

# Configuración de Symfony
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Establece permisos
RUN chown -R www-data:www-data /var/www/html

# Verifica que los módulos estén instalados en Apache
RUN php -m | grep pdo_pgsql

# Configuración para eliminar el error de `ServerName`
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Expone el puerto 8091
EXPOSE 8091

# Comando por defecto
CMD ["apache2-foreground"]