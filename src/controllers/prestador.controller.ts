import type { Request, Response } from "express";
import { PrestadorModel } from "../models/prestador.model.js";
import type { prestadorDBType, ResponseType } from "../utils/types.js";

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: prestadorDBType = req.body;

        if (!newPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            });
        }

        const createPrestadorResponse: prestadorDBType | null = await PrestadorModel.create(newPrestador);

        if (createPrestadorResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestadorDBType> = {
            status: "sucess",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse: prestadorDBType[] | null = await PrestadorModel.getAll();

        if (!getAllPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestadores",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestadorDBType[]> = {
            status: "sucess",
            message: "Prestadores buscados com sucesso",
            data: getAllPrestadorResponse
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID de prestador nao fornecido",
                data: null
            };
            return res.status(400).json(response);
        }

        const getPrestadorResponse: prestadorDBType | null = await PrestadorModel.get(id as string);

        if (!getPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<prestadorDBType> = {
            status: "sucess",
            message: "Prestador encontrado com sucesso",
            data: getPrestadorResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPrestador: prestadorDBType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedPrestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestador invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updatePrestadorResponse: prestadorDBType | null = await PrestadorModel.update(id as string, updatedPrestador);

        if (!updatePrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar prestador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestadorDBType> = {
            status: "sucess",
            message: "Prestador atualizado com sucesso",
            data: updatePrestadorResponse,
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

        const deletePrestadorResponse: prestadorDBType | null = await PrestadorModel.delete(id as string);

        if (!deletePrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<prestadorDBType> = {
            status: "sucess",
            message: "Prestador apagado com sucesso",
            data: deletePrestadorResponse,
        };
        return res.status(200).json(response);
    }
};