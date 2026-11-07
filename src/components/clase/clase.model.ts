import { Schema, model } from "mongoose";

// Interfaz TypeScript: describe la forma de una Clase en el código.
export interface IClase {
  nombre: string;
  instructor: string;
  horario: string;
  cupo: number;
}

// Schema de Mongoose: describe la forma y las reglas en la base de datos.
const claseSchema = new Schema<IClase>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    instructor: {
      type: String,
      required: [true, "El instructor es obligatorio"],
      trim: true,
    },
    horario: {
      type: String,
      required: [true, "El horario es obligatorio"],
      trim: true,
    },
    cupo: {
      type: Number,
      required: [true, "El cupo es obligatorio"],
      min: [1, "El cupo debe ser al menos 1"],
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
    versionKey: false, // oculta el campo __v
  }
);

// El modelo es el objeto con el que se consulta la colección "clases".
export const Clase = model<IClase>("Clase", claseSchema);
