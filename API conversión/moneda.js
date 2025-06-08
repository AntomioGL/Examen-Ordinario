const { DataTypes } = require('sequelize');
const sequelize = require('./conexion');

// Definición del modelo
const Monedas = sequelize.define('monedas', {
id: { type: DataTypes.INTEGER, primaryKey: true },
origen: { type: DataTypes.STRING },
destino: { type: DataTypes.STRING },
valor: { type: DataTypes.DOUBLE }
}, {
timestamps: false
});

// Función para agregar y editar monedas
async function gestionarMonedas() {
try {
await sequelize.sync(); // Asegura que la conexión esté lista

// Agregar nuevas monedas
await Monedas.bulkCreate([
{ id: 1, origen: 'USD', destino: 'EUR', valor: 0.93 },
{ id: 2, origen: 'USD', destino: 'JPY', valor: 154.65 },
{ id: 3, origen: 'EUR', destino: 'GBP', valor: 0.86 },
], { ignoreDuplicates: true });

// Editar monedas existentes
await Monedas.update(
{ valor: 0.95 }, // Nuevo valor
{ where: { origen: 'USD', destino: 'EUR' } } // Condición

);

await Monedas.update(
{ valor: 155.00 },
{ where: { origen: 'USD', destino: 'JPY' } }
);

console.log('Monedas agregadas y editadas exitosamente.');
} catch (error) {
console.error('Error gestionando monedas:', error);
}
}

// Ejecutar la función
gestionarMonedas();

module.exports = Monedas;