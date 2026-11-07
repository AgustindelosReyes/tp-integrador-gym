import type { IClase } from "./clase.model";
import * as claseRepository from "./clase.repository";

// Servicio: lógica de negocio. Usa el repositorio para leer/escribir datos.
// En la semana 2 acá van las validaciones de negocio.

export const getAllClases = async () => {
  return await claseRepository.findAll();
};

export const getClaseById = async (id: string) => {
  return await claseRepository.findById(id);
};

export const createClase = async (data: IClase) => {
  return await claseRepository.create(data);
};

export const updateClase = async (id: string, data: Partial<IClase>) => {
  return await claseRepository.update(id, data);
};

export const deleteClase = async (id: string) => {
  return await claseRepository.remove(id);
};
