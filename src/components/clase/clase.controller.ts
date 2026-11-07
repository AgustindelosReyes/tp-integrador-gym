import type { Request, Response } from "express";
import { Error as MongooseError, isValidObjectId } from "mongoose";
import * as claseService from "./clase.service";

// Controlador: recibe la request HTTP, llama al servicio y arma la respuesta
// con el código de estado correcto. No sabe nada de la base de datos.

type IdParams = { id: string };

// Si Mongoose rechazó los datos (campo faltante, cupo < 1, etc.) es culpa del
// cliente → 400. Cualquier otro error es del servidor → 500.
const handleError = (res: Response, error: unknown) => {
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

const isEmptyBody = (body: unknown) =>
  !body || typeof body !== "object" || Object.keys(body).length === 0;

// GET /api/clases
export const getAll = async (_req: Request, res: Response) => {
  try {
    const clases = await claseService.getAllClases();
    return res.status(200).json(clases);
  } catch (error) {
    return handleError(res, error);
  }
};

// GET /api/clases/:id
export const getById = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const clase = await claseService.getClaseById(id);
    if (!clase) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    return res.status(200).json(clase);
  } catch (error) {
    return handleError(res, error);
  }
};

// POST /api/clases
export const create = async (req: Request, res: Response) => {
  try {
    if (isEmptyBody(req.body)) {
      return res.status(400).json({ message: "El body no puede estar vacío" });
    }

    const nuevaClase = await claseService.createClase(req.body);
    return res.status(201).json(nuevaClase);
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT /api/clases/:id
export const update = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    if (isEmptyBody(req.body)) {
      return res.status(400).json({ message: "El body no puede estar vacío" });
    }

    const claseActualizada = await claseService.updateClase(id, req.body);
    if (!claseActualizada) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    return res.status(200).json(claseActualizada);
  } catch (error) {
    return handleError(res, error);
  }
};

// DELETE /api/clases/:id
export const remove = async (req: Request<IdParams>, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const claseEliminada = await claseService.deleteClase(id);
    if (!claseEliminada) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    return res.status(200).json({ message: "Clase eliminada", clase: claseEliminada });
  } catch (error) {
    return handleError(res, error);
  }
};
