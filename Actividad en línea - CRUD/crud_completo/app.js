const express = require("express");
const { sequelize } = require("./database");
const rutas = require("./routes/crud");

const app = express();
app.use(express.json());
app.use("/", rutas);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
});
