import { Router } from "express";
import { PrestadorController } from "../controllers/prestador.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}

const router = Router()

router.get(PrestadorRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.getAll)
router.get(PrestadorRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.get)


router.use(AuthMiddleware)

router.post(PrestadorRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.create)
router.put(PrestadorRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.update)
router.delete(PrestadorRoute.delete, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.delete)

export { router };
