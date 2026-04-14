import { Router } from "express";
import { ServicoController } from "../controllers/servico.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";
import { userController } from "../controllers/user.controller.js";

const UserRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
    getAllDetailed: "/all-detailed",
}

const router = Router()

router.post(UserRoute.login, userController.login)
router.post(UserRoute.create, userController.create)
router.use(AuthMiddleware)

router.get(UserRoute.getAll, authorize([Role.ADMIN]), ServicoController.getAll)

router.get(UserRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.get)

router.put(UserRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), ServicoController.update)

router.delete(UserRoute.delete, authorize([Role.ADMIN]), ServicoController.delete)

router.get(UserRoute.getAllDetailed, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.getAllServicoDetalhado)

export { router };