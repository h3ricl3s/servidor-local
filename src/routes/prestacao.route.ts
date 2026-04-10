import { Router } from "express";
import { PrestacaoServicoController } from "../controllers/prestacao.servico.controller.js";

const PrestacaoServicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get_all_detalhado"
}

const router = Router()

router.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.get)
router.post(PrestacaoServicoRoute.create, PrestacaoServicoController.create)
router.put(PrestacaoServicoRoute.update, PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, PrestacaoServicoController.getAllPrestacaoServicoDetalhada)

export { router };
