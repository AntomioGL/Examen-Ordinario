const express = require("express");
const router = express.Router();
const { Cliente } = require("../database");
const verificarToken = require("../middleware/auth");

// Crear un cliente
router.post("/", verificarToken, async (req, res) => {
  const nuevo = await Cliente.create(req.body);
  res.json(nuevo);
});

// Obtener todos los clientes
router.get("/", verificarToken, async (req, res) => {
  const lista = await Cliente.findAll();
  res.json(lista);
});

// Obtener un cliente por ID
router.get("/:id", verificarToken, async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(cliente);
});

// Actualizar un cliente
router.put("/:id", verificarToken, async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "No encontrado" });
  await cliente.update(req.body);
  res.json(cliente);
});

// Eliminar un cliente
router.delete("/:id", verificarToken, async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "No encontrado" });
  await cliente.destroy();
  res.json({ mensaje: "Cliente eliminado" });
});

module.exports = router;
