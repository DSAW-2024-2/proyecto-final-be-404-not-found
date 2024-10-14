const { Schema } = require("mongoose");

// Definir un esquema de ejemplo
const CarSchema = new Schema({
  brand: { type: String, required: false },
  model: { type: String, required: false },
  licensePlate: { type: String, required: false },
  capacity: { type: String, required: false },

  licensePhoto: { type: String, required: false }, // URL de la foto de la licencia
  vehiclePhoto: { type: String, required: false }, // URL de la foto del vehículo
  soatPhoto: { type: String, required: false }, // URL de la foto del SOAT (seguro obligatorio)
});

const Car = mongoose.model("Car", CarSchema);

module.exports = { Car };
