const { Schema, model } = require("mongoose");
const { UserSchema } = require("../Models/User.model");
const { CarSchema } = require("../Models/Car.model");

// Definir un esquema de ejemplo
const TripSchema = new Schema({
  _id: { type: String, required: true },
  driver: {
    type: UserSchema,
    required: true, // Si el conductor es obligatorio
  },

  vehicle: {
    type: CarSchema,
    required: true, // Si el vehículo es obligatorio
  },

  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },

  date: { type: String, required: true },
  time: { type: String, required: true },
  route: { type: String, required: true },
  fare: { type: String, required: true }, // Si la tarifa es necesaria
  seatCount: { type: Number, required: true },

  paymentMethods: [{ method: { type: String, required: true } }],

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

const Trip = model("Trip", TripSchema);

module.exports = { Trip, TripSchema };
