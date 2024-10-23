# Hola Isa

# RUTAS DOCUMENTACION

## VERIFICAR EMAIL

> [!IMPORTANT]
> **METHODO**: ```POST```    
> **RUTA**:```/email/validate```  
> **DESCRIPCCION**:  Envía un correo electrónico al usuario con un enlace para validar su cuenta. (Junto con un Token, que se envia a Registro de Sesion, Para tener todos los datos)  
> **AUTORIZACION**: No  
> **BODY**:
```json
> { "firstName": "user", "lastName": "1","idUniversidad": "0000300562","userName":"user1","email": "user1@unisabana.edu.co","phone":"1234567890","password": "user1"} 
```

## CREAR USUARIO

> [!IMPORTANT]
> **METHODO**: ```POST ```   
> **RUTA**: ```/user```  
> **DESCRIPCCION**:  Crea un nuevo usuario después de verificar que no exista un usuario con el mismo ```idUniversidad```, ```email``` o ```userName```.  
> **AUTORIZACION**: SI (El Token que te dan despues de validar el Email)  
> **BODY**: No Necesario  

## LOG IN

>[!IMPORTANT]
> **METHODO**:```POST```  
> **RUTA**: ```/user/login```  
> **DESCRIPCCION**: Autentica al usuario usando su correo electrónico o nombre de usuario, y su contraseña. Devuelve un token de autenticación.   
> **AUTORIZACION**: No  
> **BODY**:
```json
{"email": "user1@unisabana.edu.co","password": "user1"}  
```

>[!TIP]
>**Tokens**  
>**user1** : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIxIiwiaWQiOiI2NzEyNWYzMTYyZTljOTA3ZmQ1MzU0MWEiLCJpYXQiOjE3Mjk0NzMwODB9.yJIBDgnomJzNrFyc_NpEZ_zC0wvsG2d5mfNJ2nlT8F8  
>**user2** : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVzZXIyIiwiaWQiOiI2NzEyNWY1YzYyZTljOTA3ZmQ1MzU0MWQiLCJpYXQiOjE3Mjk0NzMyMzJ9.jen4AfyGq4eOPeG85B83fVSSowlX0hXEEihBPk_iJtk  
>**admin1** : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluMSIsImlkIjoiNjcxMDIyNzI2OTcyZDAyN2VmMDgyMzg1IiwiaWF0IjoxNzI5NDczMzI1fQ.d4p7cPi88Q3FfCGurP5UmWzm7omaDG1DdzbOSx2_GPI  

## ACTUALIZAR USUARIO

> [!IMPORTANT]
> **METHODO**: ```PUT```  
> **RUTA**: ```/user```  
> **DESCRIPCCION**: Actualiza los datos del usuario autenticado. No se pueden modificar los campos ```idUniversidad```, ```email``` ni ```_id```.  
> **AUTORIZACION**: Sí (decodificado con el middleware decode)  
> **BODY**:
```json
{"firstName": "Juan","lastName": "Perez","userName": "juanp","password": "newPassword123"}  
```

## ELIMINAR USUARIO

> [!IMPORTANT]
> **METHODO**: ```DELETE```  
> **RUTA**: ```/user```  
> **DESCRIPCCION**: Elimina al usuario autenticado, así como sus registros relacionados en Trip y Car.    
> **AUTORIZACION**:  Sí (decodificado con el middleware decode)  
> **BODY**: Ninguno

## CREAR CARRO

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/car```  
> **DESCRIPCCION**: Crea un nuevo carro para el usuario autenticado.  
> **AUTORIZACION**: Se requiere un token de autenticación que se maneja mediante el middleware decode.  
> **BODY**:
```json
{"brand": "Toyota","model": "Corolla","licensePlate": "ABC123","capacity": "5","licensePhoto": "https://example.com/license-photo.jpg","vehiclePhoto": "https://example.com/vehicle-photo.jpg","soatPhoto": "https://example.com/soat-photo.jpg"}
```

## ACTUALIZAR CARRO

> [!IMPORTANT]
> **METHODO**: ```PUT```   
> **RUTA**: ```/car```  
> **DESCRIPCCION**: Actualiza la información del carro del usuario autenticado.  
> **AUTORIZACION**:  Se requiere un token de autenticación que se maneja mediante el middleware decode.  
> **BODY**:
```json
{"capacity": "4","licensePhoto": "nueva_url_de_la_foto_de_licencia","vehiclePhoto": "nueva_url_de_la_foto_del_vehículo","soatPhoto": "nueva_url_de_la_foto_de_soat"}
```  

## ELIMINAR CARRO

> [!IMPORTANT]
> **METHODO**: ```DELETE```  
> **RUTA**: ```/car```  
> **DESCRIPCCION**: Elimina el carro del usuario autenticado.    
> **AUTORIZACION**: Se requiere un token de autenticación que se maneja mediante el middleware decode.  
> **BODY**: El Id viene con la autenticacion  

## VER CARRO

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/car```  
> **DESCRIPCCION**: Obtiene la información del carro del usuario autenticado.  
> **AUTORIZACION**: Se requiere un token de autenticación que se maneja mediante el middleware decode.  
> **BODY**: NO NECESARIO  

## CREAR VIAJE

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/trip```  
> **DESCRIPCCION**: Crea un nuevo viaje utilizando los detalles del usuario autenticado y la información del vehículo.  
> **AUTORIZACION**: Sí (Se necesita token)  
> **BODY**:
```json
{"startPoint": "Universidad","endPoint": "Centro Comercial","date": "2024-10-17","time": "08:00","route": "Ruta 1","fare": "5.00","seatCount": 4,"paymentMethods": [{"method": "Efectivo"}]}
```

## ACTUALIZAR VIAJE

> [!IMPORTANT]
> **METHODO**: ```PUT```  
> **RUTA**: ```/trip```  
> **DESCRIPCCION**: Actualiza el viaje basado en el ID del usuario autenticado, excluyendo campos que no se pueden modificar (como driver y vehicle).  
> **AUTORIZACION**: Sí (Se necesita token)  
> **BODY**:
```json
{"date": "2024-10-26","time": "17:00"}
```

## ELIMINAR VIAJE

> [!IMPORTANT]
> **METHODO**: ```DELETE```  
> **RUTA**: ```/trip```  
> **DESCRIPCCION**: Elimina un viaje basado en el ID del usuario autenticado.  
> **AUTORIZACION**: Sí (Se necesita token)  
> **BODY**: No se necesita cuerpo, ya que el ID se obtiene de req.user.

## VER VIAJES

> [!IMPORTANT]
> **METHODO**: ```/trip/list```  
> **RUTA**: ```GET```  
> **DESCRIPCCION**: Recupera una lista de todos los viajes.  
> **AUTORIZACION**:  No (Token no necesario, pero puede requerir permisos de usuario)  
> **BODY**: No se necesita cuerpo.

## VER VIAJE ESPECIFICO

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/trip/:id```  
> **DESCRIPCCION**: Recupera un viaje específico por su ID.  
> **AUTORIZACION**: No (Token no necesario, pero puede requerir permisos de usuario)  
> **BODY**: No se necesita cuerpo. Pero se necesita un parametro  

## PETICIONES EN ESPERA

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/trip/list/waiting```  
> **DESCRIPCCION**:Recupera la lista de pasajeros en espera (waitingPassengers) del viaje del usuario autenticado.  
> **AUTORIZACION**: Sí  
> **BODY**: No se requiere cuerpo.  

## PETICIONES ACEPTADAS

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/trip/list/accepted```  
> **DESCRIPCCION**: Recupera la lista de pasajeros aceptados (acceptedPassengers) del viaje del usuario autenticado.  
> **AUTORIZACION**: Sí
> **BODY**: No se requiere cuerpo.

## NEGAR PETICION

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/trip/deny```  
> **DESCRIPCCION**: Niega a un pasajero en espera para el viaje, removiéndolo de la lista de espera.  
> **AUTORIZACION**: Sí (Se necesita token)  
> **BODY**: Debe incluir el ID del pasajero a negar. Ejemplo:
```json
{"id": "60c72b2f9f1b2c001c8e4eae"}
```

## ACEPTAR PETICION

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/trip/accept```  
> **DESCRIPCCION**: Acepta a un pasajero en espera para el viaje, moviéndolo de la lista de espera a la lista de aceptados.  
> **AUTORIZACION**: Sí (Se necesita token)  
> **BODY**: Debe incluir el ID del pasajero a aceptar. Ejemplo:
```json
{"id": "60c72b2f9f1b2c001c8e4eae"}
```

## CREAR RESERVA

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/trip/booking/:id```  
> **DESCRIPCCION**: Crea un nuevo pasajero y lo agrega a la lista de waitingPassengers del viaje especificado  
> **AUTORIZACION**: Sí  
> **BODY**:
```json
{"firstName": "Mario","lastName": "Bros","email": "mario.bros@example.com","phone": "555-1234","stop": "Calle Falsa 123","paymentMethod":"Efectivo"}
```

## ACTUALIZAR RESERVA

> [!IMPORTANT] 
> **METHODO**: ```PUT```  
> **RUTA**: ```/trip/booking/:id```  
> **DESCRIPCCION**: Actualiza los datos de un pasajero específico en la lista de waitingPassengers del viaje.  
> **AUTORIZACION**: Sí  
> **BODY**:
```json
{"id": "60d21b4667d0d8992e610c85", // ID del pasajero a modificar"stop": "Parada 2","phone": "0987654321","email": "nuevo_correo@correo.com"}
```

## ELIMINAR RESERVA

> [!IMPORTANT]
> **METHODO**: ```DELETE```  
> **RUTA**: ```/trip/booking/:id```  
> **DESCRIPCCION**: Elimina un pasajero específico de la lista de waitingPassengers del viaje.  
> **AUTORIZACION**: Sí  
> **BODY**:
```json
{"id": "60d21b4667d0d8992e610c85" // ID del pasajero a eliminar}
```

## VER RESERVAS DE UNA CUENTA

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/trip/booking/:id```  
> **DESCRIPCCION**: Recupera la lista de pasajeros que han reservado un viaje, filtrando por el idCreator.  
> **AUTORIZACION**: Sí  
> **BODY**: No se requiere cuerpo.  

## EMAIL CONFIRMACION CORREO

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/email/validate```  
> **DESCRIPCCION**: Envía un correo electrónico al usuario con un enlace para validar su cuenta. (JUnto con un Token, que se envia a Registro de Sesion, Para tener todos los datos)  
> **AUTORIZACION**: No  
> **BODY**:
```json
{"firstName": "user","lastName": "1","idUniversidad": "0000300562","userName":"user1","email": "user1@unisabana.edu.co","phone": "1234567890","password": "user1"}
```

## EMAIL FORGOTTEN PASS

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/email/forgottenpass```  
> **DESCRIPCCION**: Envía un correo electrónico al usuario con un enlace para reestablecer su contraseña.  
> **AUTORIZACION**: No  
> **BODY**:
```json
{"userName": "usuarioEjemplo"}
```

## AGREGAR RECOMENDACION

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/user/additional/recommend```  
> **DESCRIPCCION**:  Agrega una nueva recomendación al usuario autenticado.  
> **AUTORIZACION**: Sí  
> **BODY**:
```json
{"message": "Excelente conductor, muy puntual."}
```

## VER RECOMENDACION

> [!IMPORTANT]
> **METHODO**: ```GET```  
> **RUTA**: ```/user/additional/recommend```  
> **DESCRIPCCION**: Recupera la lista de recomendaciones del usuario autenticado.  
> **AUTORIZACION**: Sí  
> **BODY**: No se requiere cuerpo.

## CALIFICACIONES

> [!IMPORTANT]
> **METHODO**: ```POST```  
> **RUTA**: ```/user/additional/comments```  
> **DESCRIPCCION**: Agrega un nuevo comentario y puntaje (score) a las calificaciones de un usuario.  
> **AUTORIZACION**: Sí  
> **BODY**:
```json
{"id": "60d21b4667d0d8992e610c85", // ID del usuario que recibirá el comentario"score": 5,"comment": "Excelente servicio y muy amable."}
```

> [!IMPORTANT]
> **METHODO**: ``````
> **RUTA**: ``````
> **DESCRIPCCION**:
> **AUTORIZACION**:
> **BODY**:
```json
```

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
