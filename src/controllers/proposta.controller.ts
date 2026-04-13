import type { Request, Response } from "express";
import { PropostaModel } from "../models/proposta.model.js";
import type { propostaDBType, ResponseType } from "../utils/types.js";

export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: propostaDBType = req.body;

        if (!newProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createPropostaResponse: propostaDBType | null = await PropostaModel.create(newProposta);

        if (createPropostaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<propostaDBType> = {
            status: "sucess",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse: propostaDBType[] | null = await PropostaModel.getAll();

        if (!getAllPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<propostaDBType[]> = {
            status: "sucess",
            message: "Propostas buscadas com sucesso",
            data: getAllPropostaResponse
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de proposta nao fornecido",
                data: null
            };
            return res.status(400).json(response);
        }

        const getPropostaResponse: propostaDBType | null = await PropostaModel.get(id as string);

        if (!getPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<propostaDBType> = {
            status: "sucess",
            message: "Proposta encontrada com sucesso",
            data: getPropostaResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedProposta: propostaDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de proposta invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updatePropostaResponse: propostaDBType | null = await PropostaModel.update(id as string, updatedProposta);

        if (!updatePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<propostaDBType> = {
            status: "sucess",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse,
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deletePropostaResponse: propostaDBType | null = await PropostaModel.delete(id as string);

        if (!deletePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar proposta",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<propostaDBType> = {
            status: "sucess",
            message: "Proposta apagada com sucesso",
            data: deletePropostaResponse,
        };
        return res.status(200).json(response);
    }
};
