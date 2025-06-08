const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Precios por sección
const precios = {
  A: 300,
  B: 490,
  C: 670,
  D: 899
};

// Ruta POST /boleto
app.post('/boleto', (req, res) => {
  const { seccion, dia, cantidad } = req.body;

  // Validación básica
  if (!seccion || !dia || !cantidad || !precios[seccion]) {
    return res.status(400).json({ error: 'Datos inválidos. Enviar: seccion (A-D), dia y cantidad.' });
  }

  let precioUnitario = precios[seccion];

  // Descuento por día domingo
  if (dia.toLowerCase() === 'domingo') {
    precioUnitario -= precioUnitario * 0.16;
  }

  let total = precioUnitario * cantidad;

  // Descuento por cantidad
  if (cantidad > 1) {
    total -= total * 0.05;
  }

  res.json({
    seccion,
    dia,
    cantidad,
    precioUnitario: precioUnitario.toFixed(2),
    totalPagar: total.toFixed(2)
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});