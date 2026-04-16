import { Router } from "express";
import { OrcamentoController } from "../controllers/orcamento.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";

const OrcamentoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}

const router = Router()
router.use(AuthMiddleware)


router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN]), OrcamentoController.getAll)
router.get(OrcamentoRoute.getById, authorize([Role.ADMIN,]), OrcamentoController.get)
router.post(OrcamentoRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.create)
router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.update)
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)

export { router };
