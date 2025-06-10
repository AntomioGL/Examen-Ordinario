module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Empleado", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    fecha_de_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    sueldo: { type: DataTypes.FLOAT, allowNull: false }
  });
};
