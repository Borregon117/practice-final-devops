const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Lógica de negocio: Inventario en memoria temporal
let inventario = [
    { id: 1, articulo: 'Interfaz de Audio', stock: 5 },
    { id: 2, articulo: 'Micrófono Condensador', stock: 12 }
];

// 1. READ: Obtener todo el inventario
app.get('/api/inventario', (req, res) => {
    res.json({ status: 'success', data: inventario });
});

// 2. CREATE: Agregar un nuevo artículo
app.post('/api/inventario', (req, res) => {
    const { articulo, stock } = req.body;
    if (!articulo || stock === undefined) {
        return res.status(400).json({ status: 'error', message: 'Faltan campos requeridos.' });
    }
    const nuevoItem = {
        id: inventario.length > 0 ? Math.max(...inventario.map(i => i.id)) + 1 : 1,
        articulo,
        stock: parseInt(stock)
    };
    inventario.push(nuevoItem);
    res.status(201).json({ status: 'success', data: nuevoItem });
});

// 3. UPDATE: Modificar stock o nombre de un artículo
app.put('/api/inventario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { articulo, stock } = req.body;
    const item = inventario.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ status: 'error', message: 'Artículo no encontrado.' });
    }

    if (articulo !== undefined) item.articulo = articulo;
    if (stock !== undefined) item.stock = parseInt(stock);

    res.json({ status: 'success', data: item });
});

// 4. DELETE: Eliminar un artículo del inventario
app.delete('/api/inventario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = inventario.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'Artículo no encontrado.' });
    }

    inventario.splice(index, 1);
    res.json({ status: 'success', message: 'Artículo eliminado correctamente.' });
});

app.listen(port, () => {
    console.log(`Servicio logístico ejecutándose en el puerto ${port}`);
});