const { Router } = require("express");
const router = Router();

const { Car } = require("../Models/Car.model.js");
const { User } = require("../Models/User.model.js");
const { Trip } = require("../Models/Trip.model.js");

const { decode } = require("../Middlewares/secure.js");

router.post("/", decode, async (req, res) => {
  try {
    // Verificar si el usuario ya tiene un carro registrado
    const existingCar = await Car.findById(req.user.id);

    if (existingCar) {
      return res
        .status(400)
        .json({ message: "Ya tienes un carro registrado." });
    }

    // Crear un nuevo carro
    const newCar = new Car({
      userId: req.user.id, // Cambié _id a userId si es necesario para el modelo de Car
      ...req.body,
    });

    // Guardar el nuevo carro
    const savedCar = await newCar.save();

    // Actualizar el usuario con el nuevo vehículo
    await User.findByIdAndUpdate(
      req.user.id,
      { vehicle: savedCar._id },
      { new: true }
    );

    // Responder con el carro guardado
    res.status(201).json(savedCar);
  } catch (err) {
    // Manejo de errores
    res
      .status(500)
      .json({ message: "Error al crear carro", error: err.message });
  }
});

route.put("/", decode, async (req, res) => {});

router.delete("/", decode, async (req, res) => {
  try {
    // Buscar y eliminar el carro por ID
    const car = await Car.findByIdAndDelete(req.user.id);

    // Si no se encuentra el carro, devolver error
    if (!car) {
      return res.status(404).send({ message: "Carro no encontrado" });
    }

    // Actualizar el usuario para eliminar la referencia al vehículo
    await User.findByIdAndUpdate(
      req.user.id,
      { $unset: { vehicle: "" } },
      { new: true }
    );

    // Eliminar todos los viajes asociados al carro
    await Trip.findByIdAndDelete(req.user.id); // Suponiendo que 'vehicleId' se refiere al carro

    // Respuesta exitosa
    res.status(200).send({ message: "Carro eliminado con éxito" });
  } catch (err) {
    // Manejo de errores
    res
      .status(500)
      .send({ message: "Error al eliminar el carro", error: err.message });
  }
});

route.get("/", (req, res) => {
  Car.find()
    .then((trips) => res.json(trips))
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
