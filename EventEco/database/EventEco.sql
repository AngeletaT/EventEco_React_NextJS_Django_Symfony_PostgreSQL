-- Crear la base de datos solo si no existe
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'EventEco') THEN
      CREATE DATABASE "EventEco";
   END IF;
END
$do$;

-- Crear el usuario solo si no existe
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
      CREATE ROLE postgres WITH LOGIN PASSWORD '12345678';
   END IF;
END
$do$;

-- Asignar permisos al usuario para la base de datos
GRANT ALL PRIVILEGES ON DATABASE "EventEco" TO postgres;