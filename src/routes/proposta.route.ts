import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";
import { PropostaModel } from "../models/proposta.model.js";

const PropostaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id",

}

const router = Router()


router.get(PropostaRoute.getAll, authorize([Role.ADMIN]), PropostaController.getAll)
router.get(PropostaRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PropostaController.get)



router.use(AuthMiddleware)
router.post(PropostaRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PropostaController.create)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.delete)
//router.put(PropostaRoute.aceitar, authorize([Role.ADMIN,Role.CLIENTE]),isOwner(PropostaModel, "owner"), PropostaController.aceitarProposta)






export { router };
