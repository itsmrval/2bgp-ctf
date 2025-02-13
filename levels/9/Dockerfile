FROM php:8.1-apache

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache rewrite module
RUN a2enmod rewrite

# Copy application files to the container
COPY . /var/www/html/
RUN mkdir -p /var/www/scripts/
COPY run-clear.sh /var/www/scripts/
RUN rm -rf /var/www/html/run-clear.sh

# Expose port 80
EXPOSE 80

# Set the working directory
WORKDIR /var/www/html/

# Run the PHP script at startup
CMD ["sh", "-c", "bash /var/www/scripts/run-clear.sh && apache2-foreground"]
