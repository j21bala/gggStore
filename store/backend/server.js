// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configurado
app.use(cors({
  origin: "https://automatic-space-dollop-qj79xrxpwqxfxx7p-5173.app.github.dev", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());






// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'merchverse_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

// Promisify para usar async/await
const dbPromise = db.promise();

// ==================== RUTAS API ====================

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const [rows] = await dbPromise.query('SELECT * FROM productos ORDER BY fecha_creacion DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
    try {
        const [rows] = await dbPromise.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

// Crear un nuevo producto
app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, artista, descripcion, precio, url, categoria } = req.body;
        
        // Validación básica
        if (!nombre || !artista || !precio) {
            return res.status(400).json({ error: 'Nombre, artista y precio son requeridos' });
        }

        const [result] = await dbPromise.query(
            'INSERT INTO productos (nombre, artista, descripcion, precio, url, categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, artista, descripcion || '', precio, url || '', categoria || 'merchandise']
        );

        // Obtener el producto recién creado
        const [newProduct] = await dbPromise.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
        
        res.status(201).json({
            message: 'Producto creado exitosamente',
            producto: newProduct[0]
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, artista, descripcion, precio, url, categoria } = req.body;

        // Verificar si el producto existe
        const [existing] = await dbPromise.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar el producto
        await dbPromise.query(
            'UPDATE productos SET nombre = ?, artista = ?, descripcion = ?, precio = ?, url = ?, categoria = ? WHERE id = ?',
            [
                nombre || existing[0].nombre,
                artista || existing[0].artista,
                descripcion !== undefined ? descripcion : existing[0].descripcion,
                precio || existing[0].precio,
                url !== undefined ? url : existing[0].url,
                categoria || existing[0].categoria,
                id
            ]
        );

        // Obtener el producto actualizado
        const [updated] = await dbPromise.query('SELECT * FROM productos WHERE id = ?', [id]);
        
        res.json({
            message: 'Producto actualizado exitosamente',
            producto: updated[0]
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el producto existe
        const [existing] = await dbPromise.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await dbPromise.query('DELETE FROM productos WHERE id = ?', [id]);
        
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: '✅ API funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api`);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n👋 Cerrando servidor...');
    db.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión:', err);
        } else {
            console.log('✅ Conexión a MySQL cerrada');
        }
        process.exit(0);
    });
});