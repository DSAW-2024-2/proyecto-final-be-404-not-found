const { Schema } = require("mongoose");

// Definir un esquema de ejemplo
const UserSchema = new Schema({
  _id: { type: String, required: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  vehicle: {
    brand: { type: String, required: false },
    model: { type: String, required: false },
    licensePlate: { type: String, required: false },
    capacity: { type: String, required: false },
  },

  recommendations: { type: [String], required: false },

  ratings: [
    {
      score: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: false },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
