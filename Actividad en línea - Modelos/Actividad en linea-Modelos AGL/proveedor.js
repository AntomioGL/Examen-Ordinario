module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define("Proveedor", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false }
  });
  return Proveedor;
};