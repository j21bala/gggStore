#!/bin/bash
# start-services.sh - Iniciar MySQL y el backend

echo "🔵 Iniciando servicios..."

# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL no está instalado. Ejecuta primero: ./setup-mysql.sh"
    exit 1
fi

# Iniciar MySQL
echo "🗄️  Iniciando MySQL..."
sudo service mysql start

# Verificar que MySQL esté corriendo
if sudo service mysql status | grep -q "running"; then
    echo "✅ MySQL está corriendo"
else
    echo "❌ Error al iniciar MySQL"
    exit 1
fi

# Verificar conexión a la base de datos
echo "🔍 Verificando conexión a la base de datos..."
if mysql -u root -e "USE merchverse_db; SELECT COUNT(*) FROM productos;" 2>/dev/null; then
    echo "✅ Base de datos conectada correctamente"
else
    echo "⚠️  La base de datos no existe. Creándola..."
    mysql -u root < setup-database.sql
fi

echo ""
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

echo ""
echo "🚀 Iniciando el servidor backend..."
npm run dev