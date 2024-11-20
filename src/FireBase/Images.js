const { bucket } = require("./firebaseConfig");

const decodeImage = async (imageName) => {
  try {
    const file = bucket.file(imageName);

    // Genera la URL firmada con un tiempo de expiración (ej. 1 hora)
    const [url] = await file.getSignedUrl({
      action: "read", // La acción es de solo lectura
      expires: Date.now() + 3600 * 1000, // Expira en 1 hora
    });

    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return null;
  }
};

module.exports = { decodeImage };
