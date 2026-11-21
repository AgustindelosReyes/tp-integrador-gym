import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

// Middleware: verifica el JWT que viene en el header "Authorization: Bearer <token>".
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Falta JWT_SECRET en el archivo .env");
    return res.status(500).json({ message: "Error interno del servidor" });
  }

  try {
    // verify comprueba la firma y que no haya vencido; si algo falla, lanza un error
    const payload = jwt.verify(token, secret);

    // Guardamos los datos del usuario (id y role) para usarlos más adelante
    res.locals.user = payload;

    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Middleware: solo deja pasar a usuarios con rol "admin".
// Tiene que ir DESPUÉS de verificarToken, que es quien carga res.locals.user.
export const soloAdmin = (_req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user?.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: se requiere rol admin" });
  }
  return next();
};