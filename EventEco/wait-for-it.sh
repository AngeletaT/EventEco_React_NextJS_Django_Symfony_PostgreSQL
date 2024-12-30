#!/usr/bin/env bash
set -e

# Parámetros
host="$1"
port="$2"
username="$3"
password="$4"
database="$5"
cmd="${@:6}" # Captura todos los parámetros restantes como el comando

# Tiempo de espera máximo en segundos
timeout=30
elapsed=0

echo "Iniciando script de espera para PostgreSQL..."
echo "Host: $host"
echo "Puerto: $port"
echo "Usuario: $username"
echo "Base de datos: $database"

# Verificar conexión al servicio PostgreSQL
while ! PGPASSWORD="$password" pg_isready -h "$host" -p "$port" -U "$username" &>/dev/null; do
  if [ "$elapsed" -ge "$timeout" ]; then
    >&2 echo "Error: No se pudo conectar al servicio PostgreSQL en $host:$port después de ${timeout}s."
    exit 1
  fi
  echo "Esperando a que PostgreSQL esté disponible en $host:$port... ($elapsed/$timeout segundos)"
  sleep 1
  elapsed=$((elapsed + 1))
done

echo "Conexión al servicio PostgreSQL exitosa en $host:$port."

# Verificar acceso a la base de datos
echo "Verificando acceso a la base de datos '$database'..."
if ! PGPASSWORD="$password" psql -h "$host" -p "$port" -U "$username" -d "$database" -c "SELECT 1;" &>/dev/null; then
  >&2 echo "Error: La base de datos '$database' no está disponible o no existe."
  exit 1
fi
echo "Acceso exitoso a la base de datos '$database'."

# Ejecutar comando final
>&2 echo "PostgreSQL y la base de datos '$database' están disponibles en $host:$port. Ejecutando comando: $cmd"
exec $cmd