const express = require("express");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./database");
const clientesRoutes = require("./routes/clientes");

const app = express();
app.use(express.json());

// Ruta de login (usuario y contraseña simulados)
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === "admin" && password === "1234") {
    const token = jwt.sign({ usuario }, "clave_secreta", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
});

// CRUD de clientes
app.use("/clientes", clientesRoutes);

// Iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
});
