# Hola Isa

## Lo que he entendido de Mongoose

1. Se deben definir schemas de los json que queremos guardar

```bash{
// Definir un esquema de ejemplo
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contraseña: String,
});
}
2. Despues debemos definir un modelo,
```
