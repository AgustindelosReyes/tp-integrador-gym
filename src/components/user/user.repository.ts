import { User, type IUser } from "./user.model";

// Repositorio: la única capa que habla con la base de datos.
export const findByEmail = (email: string) => {
  return User.findOne({ email });
};

export const create = (data: IUser) => {
  return User.create(data);
};