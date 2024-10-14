# Hola Isa

usuario = 404NotFound
Contraseña = AXHtFgTMMyPUoeQl

url connection = "mongodb+srv://404NotFound:AXHtFgTMMyPUoeQl@wheels.mnm6c.mongodb.net/?retryWrites=true&w=majority&appName=Wheels"

## Lo que he entendido de Mongoose

1. Se deben definir schemas de los json que queremos guardar

```bash
// Definir un esquema de ejemplo
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contraseña: String,
});
```

2. Despues debemos definir un modelo

```bash
// Modelo basado en el esquema
const Usuario = mongoose.model('Usuario', UsuarioSchema);
```

3. Despues un ejemplo de enpoint podria ser el siguiente, que lo podemos dividir por rutas para mayor orden

```bash
// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
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

```bash
// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
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

```bash
// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
try {
const usuarios = await Usuario.find(); // Encuentra todos los usuarios
res.status(200).send(usuarios);
} catch (error) {
res.status(500).send(error);
}
});
```

- `findById()`: Busca por id en la base de datos

```bash
// Obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
try {
const usuario = await Usuario.findById(req.params.id); // Buscar por ID
if (!usuario) {
return res.status(404).send({ mensaje: 'Usuario no encontrado' });
}
res.status(200).send(usuario);
} catch (error) {
res.status(500).send(error);
}
});
```

- `findByIdAndUpdate()`: Busca por id en la base de datos y lo actualiza

```bash
// Actualizar un usuario por ID
app.put('/usuarios/:id', async (req, res) => {
try {
const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!usuarioActualizado) {
return res.status(404).send({ mensaje: 'Usuario no encontrado' });
}
res.status(200).send(usuarioActualizado);
} catch (error) {
res.status(400).send(error);
}
});
```

`findByIdAndDelete()`: Bisaca por el Id y lo elimina

```bash
// Eliminar un usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
try {
const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
if (!usuarioEliminado) {
return res.status(404).send({ mensaje: 'Usuario no encontrado' });
}
res.status(200).send({ mensaje: 'Usuario eliminado', usuarioEliminado });
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

### 1. `driver` (Obligatorio)

Representa la información del conductor.

- `firstName` (String, requerido): Nombre del conductor.
- `lastName` (String, requerido): Apellido del conductor.
- `email` (String, requerido, único): Correo electrónico del conductor. Debe ser único.
- `phone` (String, requerido): Número de teléfono del conductor.

### 2. `ratings` (Opcional)

Lista de calificaciones y comentarios dejados sobre el viaje.

- `comment` (String, opcional): Comentario sobre el viaje.
- `score` (Number, requerido): Calificación del viaje. Rango permitido de 1 a 5.

### 3. `vehicle` (Obligatorio)

Información del vehículo utilizado para el viaje.

- `brand` (String, requerido): Marca del vehículo.
- `model` (String, requerido): Modelo del vehículo.
- `licensePlate` (String, requerido): Placa del vehículo.
- `vehiclePhoto` (String, opcional): URL de la foto del vehículo.

### 4. `startPoint` (Obligatorio)

Punto de partida del viaje.

- Tipo: String
- Descripción: Indica el lugar donde comienza el viaje.

### 5. `endPoint` (Obligatorio)

Punto de destino del viaje.

- Tipo: String
- Descripción: Lugar donde termina el viaje.

### 6. `date` (Obligatorio)

Fecha del viaje.

- Tipo: String
- Descripción: Fecha del viaje en formato string.

### 7. `time` (Obligatorio)

Hora del viaje.

- Tipo: String
- Descripción: Hora en que se realiza el viaje.

### 8. `route` (Obligatorio)

Descripción de la ruta.

- Tipo: String
- Descripción: Detalles sobre la ruta que se sigue en el viaje.

### 9. `fare` (Obligatorio)

Tarifa del viaje.

- Tipo: String
- Descripción: Monto de la tarifa para el viaje.

### 10. `seatCount` (Obligatorio)

Cantidad de asientos disponibles en el vehículo.

- Tipo: Number
- Descripción: Número de asientos disponibles para pasajeros.

### 11. `waitingPassengers` (Opcional)

Lista de pasajeros en espera de ser aceptados para el viaje.

- `firstName` (String, requerido): Nombre del pasajero en espera.
- `lastName` (String, requerido): Apellido del pasajero en espera.
- `email` (String, requerido): Correo electrónico del pasajero en espera.
- `phone` (String, requerido): Número de contacto del pasajero en espera.

### 12. `acceptedPassengers` (Opcional)

Lista de pasajeros aceptados para el viaje.

- `firstName` (String, requerido): Nombre del pasajero aceptado.
- `lastName` (String, requerido): Apellido del pasajero aceptado.
- `email` (String, requerido): Correo electrónico del pasajero aceptado.
- `phone` (String, requerido): Número de contacto del pasajero aceptado.

## Ejemplo de documento

```json
{
  "driver": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  },
  "ratings": [
    {
      "comment": "Great trip!",
      "score": 5
    }
  ],
  "vehicle": {
    "brand": "Toyota",
    "model": "Corolla",
    "licensePlate": "ABC123",
    "vehiclePhoto": "https://example.com/car.jpg"
  },
  "startPoint": "Main St",
  "endPoint": "Elm St",
  "date": "2024-10-14",
  "time": "10:00 AM",
  "route": "Via Highway 20",
  "fare": "$10",
  "seatCount": 4,
  "waitingPassengers": [
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "987-654-3210"
    }
  ],
  "acceptedPassengers": [
    {
      "firstName": "Tom",
      "lastName": "Brown",
      "email": "tom.brown@example.com",
      "phone": "555-555-5555"
    }
  ]
}
```
