#!/bin/bash

# Loop to run the script every 20 seconds
for i in {1..3}; do
  # Run the PHP script
  php /var/www/html/reset_discussions.php

  # Wait for 20 seconds
  sleep 20
done
