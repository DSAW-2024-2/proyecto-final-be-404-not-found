//AQUI SE HACEN TODOS LOS AJUSTES DE LA API EN GENERAL
DataBase =
  "mongodb+srv://404NotFound:AXHtFgTMMyPUoeQl@wheels.mnm6c.mongodb.net/?retryWrites=true&w=majority&appName=Wheels";

//1. IMPORTAR DEPENDENCIAS
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

//2. CONFIGURACION DE LA API
app.use(express.json());
app.use(cors());

// Conexión a MongoDB usando Mongoose
mongoose
  .connect(DataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

//USANDO ROUTES PARA SEPARAR EL CODIGO EN MODULOS
//RUTA DE LOGIN
app.use(require("./Routes/")); // Rutas

// Capturar rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json("Ruta no encontrada");
});

//3. INICIAR LA API
let port = process.env.PORT || 3000;
app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`server is running on port ${port}`);
});
