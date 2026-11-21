import type { IClase } from "./clase.model";
import * as claseRepository from "./clase.repository";
import { AppError } from "../../utils/AppError";
import type { FiltrosClase } from "./clase.repository";

// Validaciones de negocio: se ejecutan antes de tocar la base de datos.
const validarClase = (data: Partial<IClase>) => {
  // Regla 1: el horario tiene formato HH:MM (por ejemplo 18:30)
  if (data.horario !== undefined && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.horario)) {
    throw new AppError("El horario debe tener formato HH:MM (por ejemplo 18:30)", 400);
  }

  // Regla 2: el cupo es un número entero entre 1 y 100
  if (data.cupo !== undefined && (!Number.isInteger(data.cupo) || data.cupo < 1 || data.cupo > 100)) {
    throw new AppError("El cupo debe ser un número entero entre 1 y 100", 400);
  }
};

// Servicio: lógica de negocio. Usa el repositorio para leer/escribir datos.

export const getAllClases = async (filtros: FiltrosClase = {}) => {
  return await claseRepository.findAll(filtros);
};

export const getClaseById = async (id: string) => {
  return await claseRepository.findById(id);
};

export const createClase = async (data: IClase) => {
  validarClase(data);
  return await claseRepository.create(data);
};

export const updateClase = async (id: string, data: Partial<IClase>) => {
  validarClase(data);
  return await claseRepository.update(id, data);
};

export const deleteClase = async (id: string) => {
  return await claseRepository.remove(id);
};