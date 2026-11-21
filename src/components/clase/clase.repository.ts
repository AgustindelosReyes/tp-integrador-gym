import { Clase, type IClase } from "./clase.model";

export type FiltrosClase = { instructor?: string; nombre?: string };

// Escapa los caracteres especiales para que el texto se busque tal cual
// (así nadie puede colar una expresión regular maliciosa en la búsqueda).
const escapar = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const findAll = (filtros: FiltrosClase = {}) => {
  const filtro: { instructor?: RegExp; nombre?: RegExp } = {};

  // "i" = sin distinguir mayúsculas; busca coincidencia parcial
  if (filtros.instructor) filtro.instructor = new RegExp(escapar(filtros.instructor), "i");
  if (filtros.nombre) filtro.nombre = new RegExp(escapar(filtros.nombre), "i");

  return Clase.find(filtro);
};

export const findById = (id: string) => {
  return Clase.findById(id);
};

export const create = (data: IClase) => {
  return Clase.create(data);
};

export const update = (id: string, data: Partial<IClase>) => {
  return Clase.findByIdAndUpdate(id, data, {
    returnDocument: "after", 
    runValidators: true, 
  });
};

export const remove = (id: string) => {
  return Clase.findByIdAndDelete(id);
};
