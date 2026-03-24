import type { Request, Response } from "express";
import { PrestacaoModel } from "../models/prestacao.model.js";
import type { prestacaoServicoDBType } from "../utils/types.js";

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: prestacaoServicoDBType = req.body;

        if (!newPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            });
        }

        const createPrestacaoServicoResponse = await PrestacaoModel.create(newPrestacaoServico);

        if (createPrestacaoServicoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse = await PrestacaoModel.getAll();

        if (!getAllPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicoResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de prestacao de servico nao fornecido",
                data: null
            });
        }

        const getPrestacaoServicoResponse = await PrestacaoModel.get(id as string);

        if (!getPrestacaoServicoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestacaoServico: prestacaoServicoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null,
            });
        }

        const updatePrestacaoServicoResponse = await PrestacaoModel.update(id as string, updatedPrestacaoServico);

        if (!updatePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse,
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

        const deletePrestacaoServicoResponse = await PrestacaoModel.delete(id as string);

        if (!deletePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse,
        });
    }
};
