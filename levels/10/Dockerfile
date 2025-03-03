FROM php:8.1-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y libxml2-dev \
    && docker-php-ext-install xml

COPY . /var/www/html/

RUN echo 'allow_url_fopen = Off' >> /usr/local/etc/php/conf.d/custom-php-settings.ini && \
    echo 'allow_url_include = On' >> /usr/local/etc/php/conf.d/custom-php-settings.ini && \
    echo 'libxml_disable_entity_loader = false' >> /usr/local/etc/php/conf.d/custom-php-settings.ini && \
    echo 'disable_functions = curl_exec,curl_multi_exec' >> /usr/local/etc/php/conf.d/custom-php-settings.ini

EXPOSE 80

WORKDIR /var/www/html/

CMD ["apache2-foreground"]
