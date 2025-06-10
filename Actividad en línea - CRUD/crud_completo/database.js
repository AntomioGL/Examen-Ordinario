const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "database.sqlite" });

const Cliente = require("./models/cliente")(sequelize, DataTypes);
const Proveedor = require("./models/proveedor")(sequelize, DataTypes);
const Articulo = require("./models/articulo")(sequelize, DataTypes);
const Empleado = require("./models/empleado")(sequelize, DataTypes);

module.exports = { sequelize, Cliente, Proveedor, Articulo, Empleado };
