const express = require('express');
const router = express.Router();
const db = require('../models/Postre');

router.get('/', (req, res) => {
  db.all('SELECT * FROM postres', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  db.run(
    'INSERT INTO postres (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, imagen],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nombre, descripcion, precio, imagen });
    }
  );
});

router.put('/:id', (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  db.run(
    'UPDATE postres SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?',
    [nombre, descripcion, precio, imagen, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, nombre, descripcion, precio, imagen });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM postres WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Postre eliminado' });
  });
});

module.exports = router;