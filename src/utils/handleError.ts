import type { Response } from "express";
import { Error as MongooseError } from "mongoose";
import { AppError } from "./AppError";

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error instanceof MongooseError.ValidationError) {
    const errores = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: "Datos inválidos", errores });
  }
  if (error instanceof MongooseError.CastError) {
    return res.status(400).json({ message: `Valor inválido para ${error.path}` });
  }
  console.error(error);
  return res.status(500).json({ message: "Error interno del servidor" });
};