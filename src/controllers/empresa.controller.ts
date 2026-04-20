import { empresaModel } from "../models/empresa.model.js";
import type { empresaDBType, ResponseType } from "../utils/types.js";
import type { Request, Response } from "express";


export const EmpresaController = {
    async create(req: Request, res: Response) {
        const newEmpresa: empresaDBType = req.body;

        if (!newEmpresa) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createEmpresaResponse: empresaDBType | null = await empresaModel.create(newEmpresa);

        if (createEmpresaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<empresaDBType> = {
            status: "sucess",
            message: "Empresa criada com sucesso",
            data: createEmpresaResponse
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const getEmpresaResponse: empresaDBType | null = await empresaModel.get(id as string);

        if (getEmpresaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresa",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<empresaDBType> = {
            status: "sucess",
            message: "Empresa encontrada com sucesso",
            data: getEmpresaResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllEmpresaResponse: empresaDBType[] | null = await empresaModel.getAll();

        if (getAllEmpresaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresas",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<empresaDBType[]> = {
            status: "sucess",
            message: "Empresas encontradas com sucesso",
            data: getAllEmpresaResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const updatedEmpresa: empresaDBType = req.body;

        if (!id || !updatedEmpresa) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const updateEmpresaResponse: empresaDBType | null = await empresaModel.update(id as string, updatedEmpresa);

        if (updateEmpresaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<empresaDBType> = {
            status: "sucess",
            message: "Empresa atualizada com sucesso",
            data: updateEmpresaResponse
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const deleteEmpresaResponse: empresaDBType | null = await empresaModel.delete(id as string);

        if (deleteEmpresaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar empresa",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<empresaDBType> = {
            status: "sucess",
            message: "Empresa deletada com sucesso",
            data: deleteEmpresaResponse
        };
        return res.status(200).json(response);
    },
}
