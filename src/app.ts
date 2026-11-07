import express, { type NextFunction, type Request, type Response } from "express";
import claseRoutes from "./components/clase/clase.routes";

// app.ts arma la aplicación Express (middlewares y rutas), pero NO la levanta.
const app = express();

// Permite leer JSON en req.body
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "API Gimnasio funcionando" });
});

app.use("/api/clases", claseRoutes);

// Cualquier ruta que no exista → 404
app.use((_req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejador de errores global. Atrapa, por ejemplo, un JSON mal escrito en el body.
app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status === 400) {
    return res.status(400).json({ message: "JSON inválido en el body" });
  }
  console.error(err);
  return res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
