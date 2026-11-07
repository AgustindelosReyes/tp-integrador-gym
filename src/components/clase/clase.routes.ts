import { Router } from "express";
import * as claseController from "./clase.controller";

// Rutas: solo conectan "método + URL" con la función del controlador.
const router = Router();

router.get("/", claseController.getAll);
router.get("/:id", claseController.getById);
router.post("/", claseController.create);
router.put("/:id", claseController.update);
router.delete("/:id", claseController.remove);

export default router;
