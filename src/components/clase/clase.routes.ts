import { Router } from "express";
import * as claseController from "./clase.controller";
import { verificarToken, soloAdmin } from "../../middlewares/auth.middleware";

// Rutas: solo conectan "método + URL" con la función del controlador.
const router = Router();

router.get("/", claseController.getAll);
router.get("/:id", claseController.getById);
router.post("/", verificarToken, claseController.create);
router.put("/:id", verificarToken, claseController.update);
router.delete("/:id", verificarToken, soloAdmin, claseController.remove);

export default router;
