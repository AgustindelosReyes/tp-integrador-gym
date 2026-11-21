# Gym API

API REST para gestionar las clases de un gimnasio, con registro y login de usuarios. Trabajo práctico integrador del Bootcamp 5.0 (módulo Node.js).

## Tecnologías

- Node.js, Express y TypeScript
- MongoDB Atlas con Mongoose
- Autenticación con Bcrypt y JWT
- dotenv para variables de entorno

## Instalación

```bash
git clone https://github.com/AgustindelosReyes/tp-integrador-gym.git
cd tp-integrador-gym
npm install
```

Creá un archivo `.env` en la raíz del proyecto, tomando como modelo `.env.example`:

```
MONGO_URI=
PORT=
JWT_SECRET=
```

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Cadena de conexión de MongoDB Atlas |
| `PORT` | Puerto del servidor (por ejemplo 3000) |
| `JWT_SECRET` | Secreto con el que se firman los tokens JWT |

## Ejecución

```bash
npm run dev     # desarrollo, con recarga automática
npm run build   # compila a /dist
npm start       # ejecuta la versión compilada
```

El servidor queda disponible en `http://localhost:3000`.

## Estructura del proyecto

```
src/
├── config/
│   └── db.ts                  # conexión a MongoDB
├── components/
│   ├── clase/                 # modelo, repositorio, servicio, controlador y rutas
│   └── user/                  # modelo, repositorio, servicio, controlador y rutas
├── middlewares/
│   └── auth.middleware.ts     # verificación del JWT
├── utils/
│   ├── AppError.ts            # error de negocio con código HTTP
│   └── handleError.ts         # traduce errores a respuestas HTTP
├── app.ts
└── server.ts
```

Cada componente sigue la arquitectura en capas: **rutas → controlador → servicio → repositorio (acceso a datos)**.

## Autenticación

1. Registrate en `POST /api/auth/register`.
2. Iniciá sesión en `POST /api/auth/login`: devuelve un token JWT (dura 1 hora).
3. Para las rutas protegidas, enviá el token en el header:

```
Authorization: Bearer <token>
```

El token solo contiene el `id` y el `role` del usuario. Las contraseñas se guardan encriptadas con Bcrypt.

## Endpoints

### Auth

| Método | Ruta | Descripción | Protegida | Códigos |
|---|---|---|---|---|
| POST | `/api/auth/register` | Registrar un usuario | No | 201, 400, 409 |
| POST | `/api/auth/login` | Iniciar sesión y obtener el token | No | 200, 400, 401 |

Body de registro y login:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "123456"
}
```

### Clases

| Método | Ruta | Descripción | Protegida | Códigos |
|---|---|---|---|---|
| GET | `/api/clases` | Listar todas las clases | No | 200 |
| GET | `/api/clases/:id` | Obtener una clase por id | No | 200, 400, 404 |
| POST | `/api/clases` | Crear una clase | Sí | 201, 400, 401 |
| PUT | `/api/clases/:id` | Actualizar una clase | Sí | 200, 400, 401, 404 |
| DELETE | `/api/clases/:id` | Eliminar una clase | Sí | 200, 400, 401, 404 |

Body para crear una clase:

```json
{
  "nombre": "Spinning",
  "instructor": "Laura Gómez",
  "horario": "18:30",
  "cupo": 20
}
```

En cualquier endpoint, un error inesperado del servidor devuelve **500**.

## Validaciones

- **Horario:** debe tener formato `HH:MM` (por ejemplo `18:30`).
- **Cupo:** debe ser un número entero entre 1 y 100.
- **Email:** debe tener un formato válido y no puede estar repetido (409).
- **Contraseña:** mínimo 6 caracteres.

## Extras implementados

- **Middleware de logging:** muestra en la consola el método y la URL de cada petición.

## Pruebas

Las pruebas manuales se hicieron con Thunder Client. La colección exportada está en `thunder-tests/thunder-collection_Gym_API.json` (para usarla: Thunder Client → Collections → Import).

Casos incluidos:

- **CRUD de clases:** crear, listar, obtener por id, actualizar y eliminar.
- **Auth:** registro y login.
- **200 / 201:** operaciones exitosas.
- **400:** id inválido, falta el nombre, horario inválido, cupo fuera de rango, email inválido, contraseña inválida y body vacío.
- **401:** sin token, token inválido, contraseña incorrecta y email inexistente.
- **404:** id inexistente y clase ya eliminada.
- **409:** email ya registrado.

Notas para ejecutarla:

- Las requests protegidas (POST, PUT y DELETE de clases) traen un token de ejemplo que ya venció, porque dura 1 hora. Para repetirlas: hacer login, copiar el token y pegarlo en la pestaña **Auth → Bearer** de cada request.
- Los ids de las requests de ejemplo corresponden a mi base de datos. Para probar GET por id, PUT o DELETE, crear una clase con el POST y reemplazar el id en la URL.