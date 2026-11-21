import type { NextFunction, Request, Response } from "express";

// Middleware de logging: muestra el método y la URL de cada petición.
export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};