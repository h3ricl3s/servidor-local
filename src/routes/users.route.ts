import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import AuthMiddleware from "../security/auth.middlerware.js";


const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
}

const router = Router()

router.post(UsersRouter.login, userController.login)

router.post(UsersRouter.create, userController.create)

router.get(UsersRouter.getAll,AuthMiddleware, userController.getAll)

router.get(UsersRouter.getById, userController.get)

router.put(UsersRouter.update, userController.update)

router.delete(UsersRouter.delete, userController.delete) 



export { router };