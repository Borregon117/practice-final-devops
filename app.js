const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Lógica de negocio simulada: API de inventario
const inventario = [
    { id: 1, articulo: 'Interfaz de Audio', stock: 5 },
    { id: 2, articulo: 'Micrófono Condensador', stock: 12 }
];

app.get('/api/inventario', (req, res) => {
    res.json({ status: 'success', data: inventario });
});

app.listen(port, () => {
    console.log(`Servicio de inventario ejecutándose en el puerto ${port}`);
});
