# Hola Isa

[!TIP]
#Base de Datos MongoDB
Usuario = 404NotFound
Contraseña = AXHtFgTMMyPUoeQl

url connection = "mongodb+srv://404NotFound:AXHtFgTMMyPUoeQl@wheels.mnm6c.mongodb.net/?retryWrites=true&w=majority&appName=Wheels"

## Lo que he entendido de Mongoose

1. Se deben definir schemas de los json que queremos guardar

```javascript
// Definir un esquema de ejemplo
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  contraseña: String,
});
```

2. Despues debemos definir un modelo

```javascript
// Modelo basado en el esquema
const Usuario = mongoose.model("Usuario", UsuarioSchema);
```

3. Despues un ejemplo de enpoint podria ser el siguiente, que lo podemos dividir por rutas para mayor orden

```javascript
// Ruta para crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).send(nuevoUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
});
```

4. Algunos de los metodos que encontre son:

- `save()` o `create()`: Guarda el modelo que se envia.

```javascript
// Crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body); // Crear instancia del modelo
    await nuevoUsuario.save(); // Guardar en la base de datos
    res.status(201).send(nuevoUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
});
```

- `find()`: Busca todos los documentos que coinciden con el filtro especificado.

```javascript
// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Encuentra todos los usuarios
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});
```

- `findById()`: Busca por id en la base de datos

```javascript
// Obtener un usuario por su ID
app.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id); // Buscar por ID
    if (!usuario) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
});
```

- `findByIdAndUpdate()`: Busca por id en la base de datos y lo actualiza

```javascript
// Actualizar un usuario por ID
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send(usuarioActualizado);
  } catch (error) {
    res.status(400).send(error);
  }
});
```

`findByIdAndDelete()`: Bisaca por el Id y lo elimina

```javascript
// Eliminar un usuario por ID
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send({ mensaje: "Usuario eliminado", usuarioEliminado });
  } catch (error) {
    res.status(500).send(error);
  }
});
```

# TripSchema Documentation

Este esquema representa los detalles de un viaje dentro de un sistema de gestión de transporte. Incluye información sobre el conductor, los pasajeros, el vehículo, y los detalles específicos del viaje.

## User Schema

El `UserSchema` define la estructura de los documentos que representan los usuarios en la base de datos. A continuación se detallan los campos y su descripción:

| Campo                       | Tipo   | Requerido | Descripción                                      |
| --------------------------- | ------ | --------- | ------------------------------------------------ |
| `_id`                       | String | Sí        | Identificador único del usuario.                 |
| `firstName`                 | String | Sí        | El primer nombre del usuario.                    |
| `lastName`                  | String | Sí        | El apellido del usuario.                         |
| `email`                     | String | Sí        | Correo electrónico del usuario (debe ser único). |
| `phone`                     | String | Sí        | Número de teléfono del usuario.                  |
| `password`                  | String | Sí        | Contraseña del usuario.                          |
| `vehicle`                   | Object | No        | Detalles del vehículo del usuario (opcional).    |
| &nbsp;&nbsp; `brand`        | String | No        | La marca del vehículo.                           |
| &nbsp;&nbsp; `model`        | String | No        | El modelo del vehículo.                          |
| &nbsp;&nbsp; `licensePlate` | String | No        | El número de matrícula del vehículo.             |
| &nbsp;&nbsp; `capacity`     | String | No        | La capacidad del vehículo (número de pasajeros). |
| `recommendations`           | Array  | No        | Lista de recomendaciones del usuario.            |
| `ratings`                   | Array  | No        | Arreglo de calificaciones dadas al usuario.      |
| &nbsp;&nbsp; `score`        | Number | Sí        | Puntuación de la calificación (de 1 a 5).        |
| &nbsp;&nbsp; `comment`      | String | No        | Comentario asociado a la calificación.           |

### Ejemplo de uso

Aquí tienes un ejemplo de cómo crear un nuevo documento de usuario utilizando este esquema:

```javascript
const User = mongoose.model("User", UserSchema);

const newUser = new User({
  _id: "user123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "123456789",
  password: "securepassword",
  vehicle: {
    brand: "Toyota",
    model: "Camry",
    licensePlate: "XYZ987",
    capacity: "5",
  },
  recommendations: ["Best driver ever!", "Friendly and punctual."],
  ratings: [
    { score: 5, comment: "Excellent service!" },
    { score: 4, comment: "Very good experience." },
  ],
});

newUser
  .save()
  .then(() => console.log("User saved!"))
  .catch((err) => console.error("Error saving user:", err));
```

## Car Schema

El `CarSchema` define la estructura de los documentos que representan los vehículos en la base de datos. A continuación se detallan los campos y su descripción:

| Campo          | Tipo   | Requerido | Descripción                                      |
| -------------- | ------ | --------- | ------------------------------------------------ |
| `brand`        | String | No        | La marca del vehículo.                           |
| `model`        | String | No        | El modelo del vehículo.                          |
| `licensePlate` | String | No        | El número de matrícula del vehículo.             |
| `capacity`     | String | No        | La capacidad del vehículo (número de pasajeros). |
| `licensePhoto` | String | No        | URL de la foto de la licencia del vehículo.      |
| `vehiclePhoto` | String | No        | URL de la foto del vehículo.                     |
| `soatPhoto`    | String | No        | URL de la foto del SOAT (seguro obligatorio).    |

### Ejemplo de uso

Aquí tienes un ejemplo de cómo crear un nuevo documento de vehículo utilizando este esquema:

```javascript
const Car = mongoose.model("Car", CarSchema);

const newCar = new Car({
  brand: "Toyota",
  model: "Corolla",
  licensePlate: "ABC123",
  capacity: "5",
  licensePhoto: "https://example.com/license.jpg",
  vehiclePhoto: "https://example.com/car.jpg",
  soatPhoto: "https://example.com/soat.jpg",
});

newCar
  .save()
  .then(() => console.log("Car saved!"))
  .catch((err) => console.error("Error saving car:", err));
```

## Campos de Trips

## Trip Schema

El `TripSchema` define la estructura de los documentos que representan los viajes en la base de datos. A continuación se detallan los campos y su descripción:

| Campo                       | Tipo   | Requerido | Descripción                                          |
| --------------------------- | ------ | --------- | ---------------------------------------------------- |
| `driver`                    | Object | Sí        | Información sobre el conductor del viaje.            |
| &nbsp;&nbsp; `firstName`    | String | Sí        | Primer nombre del conductor.                         |
| &nbsp;&nbsp; `lastName`     | String | Sí        | Apellido del conductor.                              |
| &nbsp;&nbsp; `email`        | String | Sí        | Correo electrónico del conductor (debe ser único).   |
| &nbsp;&nbsp; `phone`        | String | Sí        | Número de teléfono del conductor.                    |
| `ratings`                   | Array  | No        | Arreglo de calificaciones dadas al viaje.            |
| &nbsp;&nbsp; `comment`      | String | No        | Comentario asociado a la calificación.               |
| &nbsp;&nbsp; `score`        | Number | Sí        | Puntuación de la calificación (de 1 a 5).            |
| `vehicle`                   | Object | Sí        | Información sobre el vehículo utilizado en el viaje. |
| &nbsp;&nbsp; `brand`        | String | Sí        | Marca del vehículo.                                  |
| &nbsp;&nbsp; `model`        | String | Sí        | Modelo del vehículo.                                 |
| &nbsp;&nbsp; `licensePlate` | String | Sí        | Número de matrícula del vehículo.                    |
| &nbsp;&nbsp; `vehiclePhoto` | String | No        | URL de la foto del vehículo (opcional).              |
| `startPoint`                | String | Sí        | Punto de inicio del viaje.                           |
| `endPoint`                  | String | Sí        | Punto final del viaje.                               |
| `date`                      | String | Sí        | Fecha del viaje.                                     |
| `time`                      | String | Sí        | Hora del viaje.                                      |
| `route`                     | String | Sí        | Ruta del viaje.                                      |
| `fare`                      | String | Sí        | Tarifa del viaje.                                    |
| `seatCount`                 | Number | Sí        | Cantidad de asientos disponibles.                    |
| `waitingPassengers`         | Array  | No        | Pasajeros que están en espera.                       |
| &nbsp;&nbsp; `firstName`    | String | Sí        | Primer nombre del pasajero en espera.                |
| &nbsp;&nbsp; `lastName`     | String | Sí        | Apellido del pasajero en espera.                     |
| &nbsp;&nbsp; `email`        | String | Sí        | Correo electrónico del pasajero en espera.           |
| &nbsp;&nbsp; `phone`        | String | Sí        | Número de teléfono del pasajero en espera.           |
| `acceptedPassengers`        | Array  | No        | Pasajeros que han sido aceptados en el viaje.        |
| &nbsp;&nbsp; `firstName`    | String | Sí        | Primer nombre del pasajero aceptado.                 |
| &nbsp;&nbsp; `lastName`     | String | Sí        | Apellido del pasajero aceptado.                      |
| &nbsp;&nbsp; `email`        | String | Sí        | Correo electrónico del pasajero aceptado.            |
| &nbsp;&nbsp; `phone`        | String | Sí        | Número de teléfono del pasajero aceptado.            |

### Ejemplo de uso

Aquí tienes un ejemplo de cómo crear un nuevo documento de viaje utilizando este esquema:

```javascript
const Trip = mongoose.model("Trip", TripSchema);

const newTrip = new Trip({
  driver: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "987654321",
  },
  ratings: [
    { comment: "Great trip!", score: 5 },
    { comment: "Very punctual.", score: 4 },
  ],
  vehicle: {
    brand: "Honda",
    model: "Civic",
    licensePlate: "ABC123",
    vehiclePhoto: "url_to_vehicle_photo",
  },
  startPoint: "Location A",
  endPoint: "Location B",
  date: "2024-10-15",
  time: "10:00",
  route: "Route A to Route B",
  fare: "50.00",
  seatCount: 4,
  waitingPassengers: [],
  acceptedPassengers: [
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      phone: "111222333",
    },
  ],
});

newTrip
  .save()
  .then(() => console.log("Trip saved!"))
  .catch((err) => console.error("Error saving trip:", err));
```
