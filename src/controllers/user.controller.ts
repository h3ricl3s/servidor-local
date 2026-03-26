import type { Request, Response } from "express";
import type { UserType } from "../utils/types.js";
import { usersModel } from "../models/users.models.js";

export const userController = {
    async create(req: Request, res: Response) {
        const user: UserType = req.body;

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null,
            });
        }

        console.log(user);

        const createUserResponse = await usersModel.create(user);

        return res.status(201).json(
            {
                status: "success",
                message: "Utilizador criado com sucesso",
                data: createUserResponse
            });
    },


    async getAll(req: Request, res: Response) {
        const getUsersResponse = await usersModel.getAll();

        if (!getUsersResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizadores buscados com sucesso",
            data: getUsersResponse,
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;
        const getUserResponse = await usersModel.get(id as string);

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do utilizador é obrigatório",
                data: null
            });

        }

        if (!getUserResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });

        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: getUserResponse
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserType = req.body;

        if (!id) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "ID é obrigatório",
                    data: null
                }
            )
        }

        if (!updatedUser) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Dados de utilizador inválidos",
                    data: null
                }
            )
        }

        const updateUserResponse = await usersModel.update(id as string, updatedUser);

        if (!updateUserResponse) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Erro ao atualizar utilizador",
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                status: "success",
                message: "Utilizador atualizado com sucesso",
                data: updateUserResponse
            }
        )
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

        const deleteUserResponse = await usersModel.delete(id as string);

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse,
        });
    }
}
