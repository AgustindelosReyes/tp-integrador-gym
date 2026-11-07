// Tiene que ir PRIMERO: carga las variables del .env en process.env
import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000;

// server.ts es el punto de entrada: conecta a la base y después levanta el servidor.
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

start();
