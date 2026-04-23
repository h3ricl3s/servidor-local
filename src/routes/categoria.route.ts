import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";

const CategoriaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/all-detailed",
}

const router = Router()


router.get(CategoriaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.getAll)
router.get(CategoriaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.get)
 router.get(CategoriaRoute.getAllDetailed, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.getAll)



router.use(AuthMiddleware)


router.post(CategoriaRoute.create, authorize([Role.ADMIN]), CategoriaController.create)
router.put(CategoriaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.update)
router.delete(CategoriaRoute.delete, authorize([Role.ADMIN]), CategoriaController.delete)



export { router };