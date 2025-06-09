module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Cliente", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false }
  });
};
