import type { Request, Response } from "express";
import * as userService from "./user.service";
import { handleError } from "../../utils/handleError";

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body ?? {});
    return res.status(201).json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const resultado = await userService.login(req.body ?? {});
    return res.status(200).json(resultado);
  } catch (error) {
    return handleError(res, error);
  }
};