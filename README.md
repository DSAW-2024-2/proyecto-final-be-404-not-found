# Documentación de la API

## Base URL: /api-wheels/v1

## Usuarios (Users)

### GET /user

- **Descripción**: Obtiene la información del usuario autenticado.
- **Autenticación**: Sí (decode middleware)
- **Respuesta**: Información del usuario, incluyendo la URL de la imagen de perfil.

### POST /user

- **Descripción**: Crea un nuevo usuario.
- **Autenticación**: Sí (decode middleware)
- **Body**: No necesario (la información del usuario viene del token)

### PUT /user

- **Descripción**: Actualiza la información del usuario autenticado.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "firstName": "Nuevo Nombre",
  "lastName": "Nuevo Apellido",
  "userName": "nuevoUsername",
  "password": "nuevaContraseña"
}

```

### DELETE /user

- **Descripción**: Elimina el usuario autenticado y sus registros relacionados.
- **Autenticación**: Sí (decode middleware)

### POST /user/login

- **Descripción**: Inicia sesión del usuario.
- **Autenticación**: No
- **Body**:

```json
 {{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}

```

## Carros (Cars)

### GET /car

- **Descripción**: Obtiene la información del carro del usuario autenticado.
- **Autenticación**: Sí (decode middleware)

### POST /car

- **Descripción**: Registra un nuevo carro para el usuario autenticado.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "brand": "Toyota",
  "model": "Corolla",
  "licensePlate": "ABC123",
  "capacity": "5",
  "licensePhoto": "nombreFoto",
  "vehiclePhoto": "nombreFoto",
  "soatPhoto": "nombreFoto"
}

```

### PUT /car

- **Descripción**: Actualiza la información del carro del usuario autenticado.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "capacity": "4",
  "licensePhoto": "nuevaFotoLicencia",
  "vehiclePhoto": "nuevaFotoVehiculo",
  "soatPhoto": "nuevaFotoSoat"
}

```

### DELETE /car

- **Descripción**: Elimina el carro del usuario autenticado.
- **Autenticación**: Sí (decode middleware)

## Viajes (Trips)

### GET /trip/:id

- **Descripción**: Obtiene información de un viaje específico.
- **Autenticación**: No
- **Parámetros**: id (ID del viaje)

### POST /trip

- **Descripción**: Crea un nuevo viaje.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "startPoint": "Universidad",
  "endPoint": "Centro Comercial",
  "date": "2024-10-17",
  "time": "08:00",
  "route": "Ruta 1",
  "fare": "5.00",
  "seatCount": 4,
  "paymentMethods": [{ "method": "Efectivo" }]
}

```

### PUT /trip

- **Descripción**: Actualiza la información de un viaje.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "date": "2024-10-26",
  "time": "17:00"
}

```

### DELETE /trip

- **Descripción**: Elimina un viaje.
- **Autenticación**: Sí (decode middleware)

### POST /trip/accept

- **Descripción**: Acepta a un pasajero en espera para el viaje.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "id": "60c72b2f9f1b2c001c8e4eae"
}

```

### POST /trip/deny

- **Descripción**: Niega a un pasajero en espera para el viaje.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "id": "60c72b2f9f1b2c001c8e4eae"
}

```

## Reservas (Bookings)

### GET /trip/booking/:id

- **Descripción**: Obtiene las reservas de un usuario para un viaje específico.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: id (ID del viaje)

### POST /trip/booking/:id

- **Descripción**: Crea una nueva reserva para un viaje.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: id (ID del viaje)
- **Body**:

```json
 {{
  "firstName": "Mario",
  "lastName": "Bros",
  "email": "mario.bros@example.com",
  "phone": "555-1234",
  "stop": "Calle Falsa 123",
  "paymentMethod": "Efectivo"
}

```

### PUT /trip/booking/:id

- **Descripción**: Actualiza una reserva existente.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: id (ID del viaje)
- **Body**:

```json
 {{
  "id": "60d21b4667d0d8992e610c85",
  "stop": "Parada 2",
  "phone": "0987654321",
  "email": "nuevo_correo@correo.com"
}

```

### DELETE /trip/booking/:id

- **Descripción**: Elimina una reserva.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: id (ID del viaje)
- **Body**:

```json
 {{
  "id": "60d21b4667d0d8992e610c85"
}

```

## Listado de Viajes

### GET /trip/list

- **Descripción**: Obtiene una lista de todos los viajes disponibles.
- **Autenticación**: No

### GET /trip/list/waiting

- **Descripción**: Obtiene la lista de pasajeros en espera para el viaje del usuario autenticado.
- **Autenticación**: Sí (decode middleware)

### GET /trip/list/accepted

- **Descripción**: Obtiene la lista de pasajeros aceptados para el viaje del usuario autenticado.
- **Autenticación**: Sí (decode middleware)

## Emails

### POST /email/validate

- **Descripción**: Envía un correo de validación de cuenta.
- **Autenticación**: No
- **Body**:

```json
 {{
  "firstName": "user",
  "lastName": "1",
  "idUniversidad": "0000300562",
  "userName": "user1",
  "email": "user1@unisabana.edu.co",
  "phone": "1234567890",
  "password": "user1"
}

```

### POST /email/forgottenpass

- **Descripción**: Envía un correo para restablecer la contraseña.
- **Autenticación**: No
- **Body**:

```json
 {{
  "userName": "usuarioEjemplo"
}

```

## Información Adicional del Usuario

### POST /user/additional/recommend

- **Descripción**: Agrega una recomendación al usuario.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {{
  "message": "Excelente conductor, muy puntual."
}

```

### GET /user/additional/recommend

- **Descripción**: Obtiene las recomendaciones del usuario.
- **Autenticación**: Sí (decode middleware)

### POST /user/additional/comments

- **Descripción**: Agrega un comentario y calificación a un usuario.
- **Autenticación**: Sí (decode middleware)
- **Body**:

```json
 {
  "id": "60d21b4667d0d8992e610c85",
  "score": 5,
  "comment": "Excelente servicio y muy amable."
}

```

### GET /user/additional/comments

- **Descripción**: Obtiene los comentarios y calificaciones del usuario.
- **Autenticación**: Sí (decode middleware)

## Manejo de Archivos (Firebase)

### POST /firebase/upload

- **Descripción**: Sube una imagen a Firebase Storage.
- **Autenticación**: Sí (decode middleware)
- **Body**: Form-data con campo "image" conteniendo el archivo a subir.

### PUT /firebase/update/:imageName

- **Descripción**: Actualiza una imagen existente en Firebase Storage.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: imageName (nombre de la imagen a actualizar)
- **Body**: Form-data con campo "image" conteniendo el nuevo archivo.

### DELETE /firebase/image/:imageName

- **Descripción**: Elimina una imagen de Firebase Storage.
- **Autenticación**: Sí (decode middleware)
- **Parámetros**: imageName (nombre de la imagen a eliminar)

### GET /firebase/image/:imageName

- **Descripción**: Obtiene la URL firmada de una imagen en Firebase Storage.
- **Autenticación**: No
- **Parámetros**: imageName (nombre de la imagen)

Esta documentación proporciona una visión general completa de todos los endpoints disponibles en la API, incluyendo los métodos HTTP, las rutas, los requisitos de autenticación y los cuerpos de las solicitudes cuando son necesarios.
