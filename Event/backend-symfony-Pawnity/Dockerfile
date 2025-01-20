#Etapa 1: Construcción de la aplicación
FROM php:8.2-cli as builder

RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    postgresql-client \
    unzip \
    git \
    dos2unix \ 
    #Instala dos2unix para convertir terminaciones de línea
    && docker-php-ext-install intl pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Crear un usuario no root

RUN useradd -ms /bin/bash appuser

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Cambiar el propietario de los archivos al usuario no root

RUN chown -R appuser:appuser /app

# Convertir terminaciones de línea a formato Unix en todos los archivos del proyecto

RUN find . -type f -exec dos2unix {} +

# Cambiar al usuario no root

USER appuser

RUN composer install --no-dev --optimize-autoloader

# Volver al usuario root para completar la configuración de la etapa de construcción

USER root
RUN php -m | grep pdo_pgsql

# Etapa 2: Imagen final

FROM php:8.2-apache

# Instalar dependencias para PostgreSQL y dos2unix

RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    dos2unix \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Crear un usuario no root en la etapa final

RUN useradd -ms /bin/bash appuser

COPY --from=builder /app /var/www/html

# Cambiar el propietario de los archivos al usuario no root

RUN chown -R appuser:appuser /var/www/html

# Convertir terminaciones de línea a formato Unix en los scripts copiados

RUN find /var/www/html -type f -exec dos2unix {} +

RUN a2enmod rewrite

RUN printf '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    </VirtualHost>\n' > /etc/apache2/sites-available/000-default.conf

RUN a2ensite 000-default.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN chmod -R 755 /var/www/html

USER appuser

EXPOSE 9091

CMD ["bash", "-c", "php /var/www/html/bin/console cache:clear --env=prod && apache2-foreground"]