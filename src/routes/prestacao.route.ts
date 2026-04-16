import { Router } from "express";
import { PrestacaoServicoController } from "../controllers/prestacao.servico.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middlerware.js";
import { Role } from "../utils/types.js";

const PrestacaoServicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get_all_detalhado"
}

const router = Router()

router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAll)

router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR]), PrestacaoServicoController.get)

router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAllPrestacaoServicoDetalhada)


router.use(AuthMiddleware)

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestacaoServicoController.create)

router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.delete)

router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update)






export { router };