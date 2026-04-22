
import { categoriaModel } from "../models/categoria.model.js";
import type { CategoriaType, ResponseType } from "../utils/types.js";
import type { Request, Response } from "express";


export const CategoriaController = {
    async create(req: Request, res: Response) {
        const newCategoria: CategoriaType = req.body;

        if (!newCategoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createCategoriaResponse: CategoriaType | null = await categoriaModel.create(newCategoria);

        if (createCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaType> = {
            status: "sucess",
            message: "Categoria criada com sucesso",
            data: createCategoriaResponse
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

        const getCategoriaResponse: CategoriaType | null = await categoriaModel.get(id as string);

        if (getCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaType> = {
            status: "sucess",
            message: "Categoria encontrada com sucesso",
            data: getCategoriaResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllCategoriaResponse: CategoriaType[] | null = await categoriaModel.getAll();

        if (getAllCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categorias",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaType[]> = {
            status: "sucess",
            message: "Categorias encontradas com sucesso",
            data: getAllCategoriaResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const updatedCategoria: CategoriaType = req.body;

        if (!id || !updatedCategoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const updateCategoriaResponse: CategoriaType | null = await categoriaModel.update(id as string, updatedCategoria);

        if (updateCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaType> = {
            status: "sucess",
            message: "Categoria atualizada com sucesso",
            data: updateCategoriaResponse
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

        const deleteCategoriaResponse: CategoriaType | null = await categoriaModel.delete(id as string);

        if (deleteCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaType> = {
            status: "sucess",
            message: "Categoria deletada com sucesso",
            data: deleteCategoriaResponse
        };
        return res.status(200).json(response);
    },
}
