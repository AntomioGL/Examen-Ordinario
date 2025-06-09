module.exports = (sequelize, DataTypes) => {
  const Articulo = sequelize.define("Articulo", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    existencia: { type: DataTypes.INTEGER, allowNull: false }
  });
  return Articulo;
};