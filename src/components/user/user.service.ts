import * as bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import * as userRepository from "./user.repository";

const SALT_ROUNDS = 10;

type Credenciales = { email?: unknown; password?: unknown };

export const register = async ({ email, password }: Credenciales) => {
  // Validaciones de negocio
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    throw new AppError("Email y contraseña son obligatorios", 400);
  }
  const emailNormalizado = email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(emailNormalizado)) {
    throw new AppError("El email no es válido", 400);
  }
  if (password.length < 6) {
    throw new AppError("La contraseña debe tener al menos 6 caracteres", 400);
  }

  // ¿Ya existe un usuario con ese email?
  const existente = await userRepository.findByEmail(emailNormalizado);
  if (existente) {
    throw new AppError("Ya existe un usuario con ese email", 409);
  }

  // Bcrypt convierte la contraseña en un hash irreversible
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create({
    email: emailNormalizado,
    password: passwordHash,
    role: "user",
  });

  // Devolvemos solo datos seguros: JAMÁS el hash ni la contraseña
  return { id: user._id, email: user.email, role: user.role };
};