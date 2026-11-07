import mongoose from "mongoose";

// Conecta a MongoDB Atlas usando la URI del archivo .env.
// Si falla, corta el proceso: sin base de datos la API no sirve.
export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Falta la variable de entorno MONGO_URI en el archivo .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
