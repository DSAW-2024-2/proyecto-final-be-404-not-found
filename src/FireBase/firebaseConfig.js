const admin = require("firebase-admin");
require("dotenv").config();

// Asegúrate de que el archivo JSON esté en un lugar seguro
const serviceAccount = require("./wheels-b53db-firebase-adminsdk-sakzv-f4d81c208e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET, // Reemplaza con tu bucket de Firebase Storage
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
