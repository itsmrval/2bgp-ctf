FROM php:8.1-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN a2enmod rewrite

COPY . /var/www/html/

RUN find /var/www/html/ -type d -exec chmod 555 {} \;
RUN find /var/www/html/ -type f -exec chmod 444 {} \;

RUN mv /var/www/html/secret /var/www/

RUN mkdir -p /var/www/html/upload
RUN chmod -R 775 /var/www/html/upload
RUN chown -R www-data:www-data /var/www/html/upload

EXPOSE 80

WORKDIR /var/www/html/

# Start Apache in the foreground
CMD ["apache2-foreground"]
