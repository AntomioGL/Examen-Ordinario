const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "clientes.sqlite"
});

const Cliente = require("./models/cliente")(sequelize, DataTypes);

module.exports = { sequelize, Cliente };
