import type { Request, Response } from "express";
import { PropostaModel } from "../models/proposta.model.js";
import type { propostaDBType } from "../utils/types.js";

export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: propostaDBType = req.body;

        if (!newProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            });
        }

        const createPropostaResponse = await PropostaModel.create(newProposta);

        if (createPropostaResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        });
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse = await PropostaModel.getAll();

        if (!getAllPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Propostas buscadas com sucesso",
            data: getAllPropostaResponse
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de proposta nao fornecido",
                data: null
            });
        }

        const getPropostaResponse = await PropostaModel.get(id as string);

        if (!getPropostaResponse) {
            return res.status(404).json({
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta encontrada com sucesso",
            data: getPropostaResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedProposta: propostaDBType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        if (!updatedProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null,
            });
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updatedProposta);

        if (!updatePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse,
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

        const deletePropostaResponse = await PropostaModel.delete(id as string);

        if (!deletePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar proposta",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta apagada com sucesso",
            data: deletePropostaResponse,
        });
    }
};
