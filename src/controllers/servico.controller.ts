import { ServicoModel } from "../models/servico.models.js"
import type { ResponseType, ServicoDBType, ServicoDetalhadoType } from "../utils/types.js"
import type { Request, Response } from "express"


export const ServicoController = {

    async createServico(req: Request, res: Response) {
        const newService: ServicoDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const createServiceResponse = await ServicoModel.create(newService)

        if (createServiceResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServiceResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllServicesResponse = await ServicoModel.getAll()

        if (!getAllServicesResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servicos",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servicos buscados com sucesso",
            data: getAllServicesResponse
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do servico nao fornecido",
                data: null
            })
        }

        const getServiceResponse = await ServicoModel.get(id as string)

        if (!getServiceResponse) {
            return res.status(404).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico encontrado com sucesso",
            data: getServiceResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedService: ServicoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const updateServiceResponse = await ServicoModel.update(id as string, updatedService)

        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico atualizado com sucesso",
            data: updateServiceResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteServiceResponse = await ServicoModel.delete(id as string)

        if (!deleteServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse
        })
    },

    async getAllServicoDetalhado(req: Request, res: Response) {
        const { limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (limit) {
            LIMIT = parseInt(limit as string)
        }

        if (offset) {
            OFFSET = parseInt(offset as string)
        }

        const getAllServicoDetalhadoResponse = await ServicoModel.getAllServiceDetalhado(LIMIT, OFFSET)

        if (!getAllServicoDetalhadoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<ServicoDetalhadoType[]> = {
            status: "sucess",
            message: "Servico encontrado com sucesso",
            data: getAllServicoDetalhadoResponse
        }
        return res.status(200).json(response)
    }
}