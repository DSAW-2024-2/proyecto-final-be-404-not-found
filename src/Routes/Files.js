const multer = require("multer");
const { Router } = require("express");
const { bucket } = require("../FireBase/firebaseConfig");
const router = Router();
const { decode } = require("../Middlewares/secure");

// Configura multer para manejar la carga de imágenes
const storage = multer.memoryStorage(); // Para almacenar el archivo en memoria (sin guardar en el disco)
const upload = multer({ storage: storage });

// Ruta para subir la imagen
router.post("/upload", decode, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Nombre del archivo en Firebase Storage
    const fileName = `${Date.now()}_${req.file.originalname}`;

    // Subir la imagen al Storage
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error("Error uploading file: ", err);
      res.status(500).send("Error uploading file");
    });

    stream.on("finish", async () => {
      // La carga terminó correctamente, obtenemos la URL de la imagen
      const imageName = file.name;

      // Enviar la URL de la imagen de vuelta al cliente
      res.status(200).json({ imageName: imageName });
    });

    stream.end(req.file.buffer); // Escribimos el archivo en Firebase Storage
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).send("Error uploading image");
  }
});

router.get("/image/:imageName", async (req, res) => {
  const imageName = req.params.imageName;

  try {
    const file = bucket.file(imageName);

    // Genera la URL firmada con un tiempo de expiración (ej. 1 hora)
    const [url] = await file.getSignedUrl({
      action: "read", // La acción es de solo lectura
      expires: Date.now() + 3600 * 1000, // Expira en 1 hora
    });

    // Devuelve la URL firmada para acceder a la imagen
    res.status(200).json({ imageUrl: url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).send("Error generating signed URL");
  }
});

module.exports = router;
