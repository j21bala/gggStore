#!/bin/bash
# setup-mysql.sh - Script para configurar MySQL en GitHub Codespaces

echo "🔧 Instalando MySQL..."
sudo apt update
sudo apt install -y mysql-server

echo "🚀 Iniciando MySQL..."
sudo service mysql start

echo "📝 Configurando MySQL..."
sudo mysql <<EOF
-- Configurar usuario root sin contraseña
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS merchverse_db;
USE merchverse_db;

-- Crear la tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    url VARCHAR(500),
    categoria VARCHAR(100) DEFAULT 'merchandise',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, artista, descripcion, precio, url, categoria) VALUES
('Astroworld T-Shirt', 'Travis Scott', 'Camiseta oficial del tour Astroworld de Travis Scott.', 35.00, 'https://i.imgur.com/K12t37b.jpg', 'camisetas'),
('Dawn FM Vinyl', 'The Weeknd', 'Vinilo del álbum Dawn FM de The Weeknd.', 45.00, 'https://i.imgur.com/8QjB48O.jpg', 'accesorios'),
('Clics Modernos T-Shirt', 'Charlie Garcia', 'Camiseta clásica inspirada en el álbum Clics Modernos.', 30.00, 'https://i.imgur.com/gK6B65P.jpg', 'camisetas'),
('My Kind of Woman Hoodie', 'Mac DeMarco', 'Sudadera del famoso tema My Kind of Woman.', 60.00, 'https://i.imgur.com/c1d3pA3.jpg', 'hoodies');

SELECT 'Base de datos configurada exitosamente!' as mensaje;
EOF

echo "✅ MySQL configurado correctamente"
echo "📊 Base de datos: merchverse_db"
echo "👤 Usuario: root (sin contraseña)"
echo ""
echo "Para verificar la instalación, ejecuta:"
echo "mysql -u root -e 'SHOW DATABASES;'"