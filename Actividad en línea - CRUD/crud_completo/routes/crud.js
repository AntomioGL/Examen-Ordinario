const express = require("express");
const router = express.Router();
const { Cliente, Proveedor, Articulo, Empleado } = require("../database");

// Función para generar CRUD dinámicamente
function crearCRUD(modelo, nombre) {
  router.post(`/${nombre}`, async (req, res) => {
    const nuevo = await modelo.create(req.body);
    res.json(nuevo);
  });

  router.get(`/${nombre}`, async (req, res) => {
    const lista = await modelo.findAll();
    res.json(lista);
  });

  router.get(`/${nombre}/:id`, async (req, res) => {
    const item = await modelo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  });

  router.put(`/${nombre}/:id`, async (req, res) => {
    const item = await modelo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  });

  router.delete(`/${nombre}/:id`, async (req, res) => {
    const item = await modelo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: `${nombre} eliminado` });
  });
}

// Generar CRUD para todos los modelos
crearCRUD(Cliente, "clientes");
crearCRUD(Proveedor, "proveedores");
crearCRUD(Articulo, "articulos");
crearCRUD(Empleado, "empleados");

module.exports = router;
