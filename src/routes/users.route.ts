import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";


const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    resetPassword: "/reset-password/:id",
    login: "/login",
}

const router = Router()


router.post(UsersRouter.login, userController.login)

router.post(UsersRouter.create, userController.create)

router.use(AuthMiddleware)

router.get(UsersRouter.getAll, authorize([Role.ADMIN]), userController.getAll)

router.get(UsersRouter.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.getById)

router.put(UsersRouter.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), userController.update)

router.delete(UsersRouter.delete, userController.delete)

// router.put(UsersRouter.resetPassword,authorize([Role.ADMIN,Role.CLIENTE,Role.PRESTADOR,Role.EMPRESA]), userController.resetPassword)



export { router };