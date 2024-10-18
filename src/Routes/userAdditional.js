const { Router } = require("express");
const router = Router();

const { User } = require("../Models/User.model.js");
const { Trip } = require("../Models/Trip.model.js");
const { hashData, verifyPassword } = require("../Middlewares/hashing.js");
const { decode, codify } = require("../Middlewares/secure.js");
const { Car } = require("../Models/Car.model.js");

router.post("/recommend", decode, async (req, res) => {
  try {
    const { id } = req.user;
    const { message } = req.body;

    // Actualizar el usuario agregando la recomendación
    const newUser = await User.findByIdAndUpdate(
      id,
      { $push: { recommendations: message } }, // Agrega la recomendación
      { new: true } // Retorna el usuario actualizado
    );

    if (!newUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Responder con el usuario actualizado
    res.json(newUser);
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar la recomendación",
      error: err.message,
    });
  }
});

router.get("/recommend", decode, async (req, res) => {
  try {
    const { id } = req.user;

    // Buscar al usuario por su ID
    const user = await User.findById(id);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver las recomendaciones del usuario
    res.json(user.recommendations);
  } catch (err) {
    // Manejo de errores
    res.status(500).json({
      message: "Error al obtener las recomendaciones",
      error: err.message,
    });
  }
});

router.post("/forgottenpass", (req, res) => {});

router.post("/comments", decode, async (req, res) => {
  try {
    const { id } = req.body;
    const { score, comment } = req.body;

    // Validar que el score y el comentario existan
    if (typeof score !== "number" || !comment) {
      return res
        .status(400)
        .json({ message: "El puntaje y el comentario son requeridos." });
    }

    // Crear el nuevo rating
    const rating = { score, comment };

    // Agregar el nuevo rating al usuario
    const newUser = await User.findByIdAndUpdate(
      id,
      { $push: { ratings: rating } },
      { new: true }
    );

    // Verificar si el usuario existe
    if (!newUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Responder con el usuario actualizado
    res.json(newUser);
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar comentario",
      error: err.message,
    });
  }
});

module.exports = router;
