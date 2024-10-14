const { Schema } = require("mongoose");

// Definir un esquema de ejemplo
const TripSchema = new Schema({
  driver: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },

      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
    },
    required: true, // Si el conductor es obligatorio
  },
  ratings: [
    {
      comment: {
        type: String,
        required: false,
      },
      score: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Si la calificación es de 1 a 5
      },
    },
  ],

  vehicle: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    licensePlate: { type: String, required: true },
    vehiclePhoto: { type: String, required: false },
  },

  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },

  date: { type: String, required: true },
  time: { type: String, required: true },
  route: { type: String, required: true },
  fare: { type: String, required: true }, // Si la tarifa es necesaria
  seatCount: { type: Number, required: true },

  waitingPassengers: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],

  acceptedPassengers: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = { Trip };
