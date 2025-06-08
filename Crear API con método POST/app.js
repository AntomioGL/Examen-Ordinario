
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para leer JSON del body
app.use(express.json());

// Ruta POST /alumno
app.post('/alumno', (req, res) => {
  const { cuenta, nombre, promedio, grado, grupo } = req.body;

  // Validación básica
  if (!cuenta || !nombre || promedio == null || !grado || !grupo) {
    return res.status(400).json({ error: 'Faltan datos del alumno.' });
  }

  const nuevoAlumno = { cuenta, nombre, promedio, grado, grupo };

  // Leer archivo existente o iniciar nuevo arreglo
  let alumnos = [];
  const archivo = 'alumnos.json';

  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, 'utf-8');
    try {
      alumnos = JSON.parse(contenido);
    } catch (e) {
      alumnos = [];
    }
  }

  alumnos.push(nuevoAlumno);

  // Guardar el arreglo actualizado
  fs.writeFileSync(archivo, JSON.stringify(alumnos, null, 2), 'utf-8');

  res.status(201).json({ mensaje: 'Alumno guardado exitosamente.', alumno: nuevoAlumno });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
