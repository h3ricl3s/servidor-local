
import { ServicoModel } from "../models/prestacao.servico.models.js";
import type { ServicoDBType } from "../utils/types.js";
import type { Request, Response } from "express";

export const ServicoController = {
    async CreateServico(req: Request, res: Response) {
        const newService: ServicoDBType = req.body;

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const createServicoResponse = await ServicoModel.create(newService);

        if (createServicoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServicoResponse
        })
    },


    async getAll(req: Request, res: Response) {
        const getAllServiceResponse = await ServicoModel.getAll();

        if (!getAllServiceResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servicos",
                data: null
            })
        }


        return res.status(200).json({
            status: "success",
            message: "Servicos buscados com sucesso",
            data: getAllServiceResponse
        })
    },


    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de servico nao fornecido",
                data: null
            })
        }

        const getServiceResponse = await ServicoModel.get(id as string);

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
        const { id } = req.params;

        const updatedService: ServicoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            });
        }

        const updateServiceResponse = await ServicoModel.update(id as string, updatedService);

        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico atualizado com sucesso",
            data: updateServiceResponse,
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteServiceResponse = await ServicoModel.delete(id as string);

        if (!deleteServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse,
        });
    }

}