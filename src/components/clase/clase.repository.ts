import { Clase, type IClase } from "./clase.model";

// Repositorio: la ÚNICA capa que habla con la base de datos.
// Si mañana cambiás Mongo por otra cosa, solo se toca este archivo.

export const findAll = () => {
  return Clase.find();
};

export const findById = (id: string) => {
  return Clase.findById(id);
};

export const create = (data: IClase) => {
  return Clase.create(data);
};

export const update = (id: string, data: Partial<IClase>) => {
  return Clase.findByIdAndUpdate(id, data, {
    returnDocument: "after", // devuelve el documento ya actualizado
    runValidators: true, // aplica las reglas del schema también al actualizar
  });
};

export const remove = (id: string) => {
  return Clase.findByIdAndDelete(id);
};
