import type { Request, Response } from "express";
import { PrestacaoServicoModel } from "../models/prestacao.servico.model.js";
import type { prestacaoServicoDBType, PrestacaoServicoDetalhadoType, ResponseType } from "../utils/types.js";


export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: prestacaoServicoDBType = req.body;

        if (!newPrestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createPrestacaoServicoResponse: prestacaoServicoDBType | null = await PrestacaoServicoModel.create(newPrestacaoServico);

        if (createPrestacaoServicoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse: prestacaoServicoDBType[] | null = await PrestacaoServicoModel.getAll();

        if (!getAllPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestacaoServicoDBType[]> = {
            status: "sucess",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicoResponse
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de prestacao de servico nao fornecido",
                data: null
            };
            return res.status(400).json(response);
        }

        const getPrestacaoServicoResponse: prestacaoServicoDBType | null = await PrestacaoServicoModel.get(id as string);

        if (!getPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<prestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestacaoServico: prestacaoServicoDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedPrestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updatePrestacaoServicoResponse: prestacaoServicoDBType | null = await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico);

        if (!updatePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse,
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

        const deletePrestacaoServicoResponse: prestacaoServicoDBType | null = await PrestacaoServicoModel.delete(id as string);

        if (!deletePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestacaoServicoDBType> = {
            status: "sucess",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse,
        };
        return res.status(200).json(response);
    },

    async getAllPrestacaoServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit: string, offset: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const getAllPrestacaoServicoDetalhadaResponse: PrestacaoServicoDetalhadoType[] | null = await PrestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacaoServicoDetalhadaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestacaoServicoDetalhadoType[]> = {
            status: "sucess",
            message: "Prestacao de servico buscadas com sucesso",
            data: getAllPrestacaoServicoDetalhadaResponse
        };
        return res.status(200).json(response);
    }

}
