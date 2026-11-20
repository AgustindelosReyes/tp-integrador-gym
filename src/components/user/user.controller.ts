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