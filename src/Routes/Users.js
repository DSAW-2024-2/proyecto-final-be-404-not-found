const { Router } = require("express");
const router = Router();

const { User } = require("../Models/User.model.js");
const { Trip } = require("../Models/Trip.model.js");
const { hashData, verifyPassword } = require("../Middlewares/hashing.js");
const { decode, codify } = require("../Middlewares/secure.js");
const { Car } = require("../Models/Car.model.js");
const { decodeImage } = require("../FireBase/Images.js");

const existing = async (newUser) => {
  // Verificar si ya existe un usuario con el mismo `idUniversidad`, `email` o `userName`
  const existingUser = await User.findOne({
    $or: [
      { idUniversidad: newUser.idUniversidad },
      { email: newUser.email },
      { userName: newUser.userName },
    ],
  });

  if (existingUser) {
    if (existingUser.idUniversidad === newUser.idUniversidad) {
      throw new Error("El ID de universidad ya está registrado.");
    }
    if (existingUser.email === newUser.email) {
      throw new Error("El correo electrónico ya está registrado.");
    }
    if (existingUser.userName === newUser.userName) {
      throw new Error("El nombre de usuario ya está en uso.");
    }
  }
};

router.post("/backup/register", async (req, res) => {
  try {
    req.user = req.body;

    // Verificar si el usuario ya existe
    await existing(req.user);

    // Hashear la contraseña antes de guardar el usuario
    const hashedData = await hashData(req.user);
    const newUser = new User(hashedData);

    // Guardar el nuevo usuario si no existe
    const savedUser = await newUser.save();
    res
      .status(200)
      .send({ message: "Usuario creado con éxito", user: savedUser });
  } catch (err) {
    // Manejar errores, ya sea por duplicados o problemas al crear el usuario
    res.status(500).send({ message: err.message });
  }
});

router.post("/", decode, async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    await existing(req.user);

    // Hashear la contraseña antes de guardar el usuario
    const hashedData = await hashData(req.user);
    const newUser = new User(hashedData);

    // Guardar el nuevo usuario si no existe
    const savedUser = await newUser.save();
    res
      .status(200)
      .send({ message: "Usuario creado con éxito", user: savedUser });
  } catch (err) {
    // Manejar errores, ya sea por duplicados o problemas al crear el usuario
    res.status(500).send({ message: err.message });
  }
});

router.put("/", decode, async (req, res) => {
  try {
    // Verificar que se proporcione el ID del usuario
    if (!req.user.id) {
      return res
        .status(400)
        .send({ message: "El ID del usuario es requerido" });
    }

    // Verificar si el usuario existe
    await existing(req.body);

    // Eliminar campos no actualizables
    delete req.body._id;
    delete req.body.email;
    delete req.body.idUniversidad;

    const hashedData = await hashData(req.body);
    // Buscar y actualizar el usuario por ID, devolviendo el documento actualizado
    const user = await User.findByIdAndUpdate(req.user.id, hashedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    try {
      // Actualizar el usuario
      await Trip.findById(req.user.id, { driver: user }, { new: true });
    } catch (err) {}

    // Respuesta exitosa con el usuario actualizado
    res.status(200).send({ message: "Usuario actualizado con éxito", user });
  } catch (err) {
    // Manejo de errores con el mensaje adecuado
    res
      .status(500)
      .send({ message: "Error al actualizar el usuario", error: err });
  }
});

router.delete("/", decode, async (req, res) => {
  try {
    // Verificar si se proporciona el ID
    if (!req.user.id) {
      return res
        .status(400)
        .send({ message: "El ID del usuario es requerido" });
    }

    // Buscar y eliminar el usuario por ID
    const user = await User.findByIdAndDelete(req.user.id);

    // Si no se encuentra el usuario, devolver error
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    await Trip.findByIdAndDelete(req.user.id);
    await Car.findByIdAndDelete(req.user.id);

    // Respuesta exitosa
    res.status(200).send({ message: "Usuario eliminado con éxito" });
  } catch (err) {
    // Manejo de errores
    res
      .status(500)
      .send({ message: "Error al eliminar el usuario", error: err });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, userName } = req.body;

  // Validar que se proporcione al menos un identificador (email o userName) y la contraseña
  if ((!email && !userName) || !password) {
    return res.status(400).send({
      message:
        "Correo electrónico, nombre de usuario y contraseña son requeridos",
    });
  }

  try {
    // Buscar el usuario por su correo electrónico o nombre de usuario
    const user =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ userName: userName }));

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña con bcrypt
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT (sin incluir la contraseña)
    const userToken = {
      id: user._id,
      userName: user.userName,
      password: user.password,
    };
    const token = await codify(userToken);

    // Enviar el token en la respuesta
    res.status(200).send({ token });
  } catch (err) {
    // Manejo de errores
    res
      .status(500)
      .send({ message: "Error al iniciar sesión", error: err.message });
  }
});

router.get("/", decode, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    const { imageProfile } = user;
    const url = await decodeImage(imageProfile);
    user.imageProfile = url;

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error al obtener el usuario", error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error al obtener los usuarios", error: err });
  }
});

module.exports = router;
