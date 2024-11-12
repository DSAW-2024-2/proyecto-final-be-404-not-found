//1. IMPORTAR DEPENDENCIAS
const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

//2. CONFIGURACION DE LA API
app.use(express.json());
app.use(cors());

// Conexión a MongoDB usando Mongoose
mongoose
  .connect(process.env.DB_USER)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

//USANDO ROUTES PARA SEPARAR EL CODIGO EN MODULOS

// Configuración de la ruta base y sus subrutas
app.use("/api-wheels/v1/car", require("./Routes/Cars"));
app.use("/api-wheels/v1/trip", require("./Routes/Trips"));
app.use("/api-wheels/v1/user", require("./Routes/Users"));
app.use("/api-wheels/v1/email", require("./Routes/Emails"));
app.use("/api-wheels/v1/trip/booking", require("./Routes/Bookings"));
app.use("/api-wheels/v1/trip/list", require("./Routes/ListRequests"));
app.use("/api-wheels/v1/user/additional", require("./Routes/userAdditional"));
app.use("/api-wheels/v1/firebase", require("./Routes/Files"));

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
