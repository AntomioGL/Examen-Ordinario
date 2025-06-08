
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

// Conectar con la base de datos
const db = new sqlite3.Database('./boletos.sqlite', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos boletos.sqlite');
  }
});

// Ruta POST /boleto
app.post('/boleto', (req, res) => {
  const { localidad, fecha, esEstudiante } = req.body;

  if (!localidad || !fecha || esEstudiante === undefined) {
    return res.status(400).json({ error: 'Faltan datos: localidad, fecha o esEstudiante.' });
  }

  const sql = 'SELECT precio, descuento FROM precios WHERE localidad = ? AND fecha = ?';
  db.get(sql, [localidad, fecha], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar la base de datos.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'No se encontró combinación de localidad y fecha.' });
    }

    let total = row.precio;
    if (esEstudiante) {
      total = total - (total * row.descuento);
    }

    res.json({
      localidad,
      fecha,
      esEstudiante,
      precioBase: row.precio,
      descuento: esEstudiante ? (row.descuento * 100) + '%' : 'No aplica',
      totalPagar: total.toFixed(2)
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
