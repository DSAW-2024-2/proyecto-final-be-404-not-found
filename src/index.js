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
  .connect(DataBase)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

//USANDO ROUTES PARA SEPARAR EL CODIGO EN MODULOS
app.use("/car", require("./Routes/Cars"));
app.use("/trip", require("./Routes/Trips"));
app.use("/user", require("./Routes/Users"));
app.use("/trip/booking", require("./Routes/Bookings"));
app.use("/trip/list", require("./Routes/ListRequests"));
app.use("/user/additional", require("./Routes/userAdditional"));

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
