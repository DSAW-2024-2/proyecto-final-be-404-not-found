const { Router } = require("express");
const router = Router();

const { Trip } = require("../Models/Trip.model.js");
const { User } = require("../Models/User.model.js");
const { Car } = require("../Models/Car.model.js");

const { decode } = require("../Middlewares/secure.js");

router.post("/", decode, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const car = user.vehicle;
    if (!car || !user) {
      return res.status(400).json({ message: "User or car not found" });
    }
    const trip = new Trip({
      _id: req.user.id,
      driver: user,
      vehicle: car,
      ...req.body,
    });
    const unique = await Trip.findOne({ _id: trip._id });
    if (unique) {
      return res
        .status(400)
        .json({ message: "Este conductor ya tiene un viaje creado" });
    }
    await trip.save();
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user" });
  }
});

router.put("/", decode, async (req, res) => {
  try {
    // Filtrar campos no permitidos
    delete req.body.driver;
    delete req.body.vehicle;

    // Actualizar el viaje (asegurarse de que req.user.id esté presente)
    const newTrip = await Trip.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true, // Para validar los datos actualizados según el esquema
    });

    // Verificar si el viaje fue encontrado
    if (!newTrip) {
      return res.status(404).json({ message: "Trip no encontrado" });
    }

    // Responder con el viaje actualizado
    return res.status(200).json(newTrip);
  } catch (err) {
    // Manejo de errores
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

router.post("/accept", (req, res) => {});

router.post("/deny", (req, res) => {});

router.post("/payment", (req, res) => {});

router.post("/booking", (req, res) => {});

router.put("/booking", (req, res) => {});

router.delete("/booking", (req, res) => {});

router.get("/", (req, res) => {
  Trip.find()
    .then((trips) => {
      res.json(trips);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
