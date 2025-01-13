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

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

#Convertir terminaciones de línea a formato Unix en todos los archivos del proyecto
RUN find . -type f -exec dos2unix {} +

RUN composer install --no-dev --optimize-autoloader
RUN php -m | grep pdo_pgsql

#Etapa 2: Imagen final
FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    dos2unix \ 
    # Instala dos2unix en la etapa final también
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

COPY --from=builder /app /var/www/html

#Convertir terminaciones de línea a formato Unix en los scripts copiados
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

RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

EXPOSE 8091

CMD ["bash", "-c", "php /var/www/html/bin/console cache:clear --env=prod && apache2-foreground"]