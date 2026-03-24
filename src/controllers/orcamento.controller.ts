import type { Request, Response } from "express";
import { orcamentoModel } from "../models/orcamento.model.js";
import type { orcamentoDBType } from "../utils/types.js";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const newOrcamento: orcamentoDBType = req.body;

        if (!newOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            });
        }

        const createOrcamentoResponse = await orcamentoModel.create(newOrcamento);

        if (createOrcamentoResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse = await orcamentoModel.getAll();

        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de orcamento nao fornecido",
                data: null
            });
        }

        const getOrcamentoResponse = await orcamentoModel.get(id as string);

        if (!getOrcamentoResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedOrcamento: orcamentoDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null,
            });
        }

        const updateOrcamentoResponse = await orcamentoModel.update(id as string, updatedOrcamento);

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse,
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

        const deleteOrcamentoResponse = await orcamentoModel.delete(id as string);

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse,
        });
    }
};
