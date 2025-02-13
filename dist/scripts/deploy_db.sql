-- Create level5 database and user
CREATE DATABASE IF NOT EXISTS level5;
CREATE USER 'level5user'@'%' IDENTIFIED BY 'mKeq8%6ez$IBh0';
GRANT ALL PRIVILEGES ON level5.* TO 'level5user'@'%';
FLUSH PRIVILEGES;

-- Create level8 database and user
CREATE DATABASE IF NOT EXISTS level8;
CREATE USER 'level8user'@'%' IDENTIFIED BY 'AvJl&r%0sk6^tw';
GRANT ALL PRIVILEGES ON level8.* TO 'level8user'@'%';
FLUSH PRIVILEGES;

-- Create level9 database and user
CREATE DATABASE IF NOT EXISTS level9;
CREATE USER 'level9user'@'%' IDENTIFIED BY '65ZnMYz*Q5Wp*7';
GRANT ALL PRIVILEGES ON level9.* TO 'level9user'@'%';
FLUSH PRIVILEGES;
