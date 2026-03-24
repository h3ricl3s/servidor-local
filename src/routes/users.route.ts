import { Router } from "express";
import { userController } from "../controllers/user.controller.js";


const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
}

const router = Router()

router.get(UsersRouter.getAll, userController.getAll)
router.get(UsersRouter.getById, userController.get)
router.post(UsersRouter.create, userController.create)
router.put(UsersRouter.update, userController.update)
router.delete(UsersRouter.delete, userController.delete) 

export { router };