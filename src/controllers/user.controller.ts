import type { Request, Response } from "express";
import { usersModel } from "../models/users.models.js";
import type { ResponseType, UserType } from "../utils/types.js";
import db from "../lib/db.js";
import { comparePassword } from "../utils/password.js";
import jwt from "jsonwebtoken";


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

        const createUserResponse: UserType | null = await usersModel.create(user);

        if (!createUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar utilizador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "sucess",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        };
        return res.status(200).json(response);
    },

    async getAll(_req: Request, res: Response) {
        const getUsersResponse: UserType[] | null = await usersModel.getAll();

        if (!getUsersResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null,
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<UserType[]> = {
            status: "sucess",
            message: "Utilizadores buscados com sucesso",
            data: getUsersResponse,
        };
        return res.status(200).json(response);
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID do utilizador e obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        const getUserResponse: UserType | null = await usersModel.get(id);

        if (!getUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador nao encontrado",
                data: null,
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "sucess",
            message: "Utilizador encontrado com sucesso",
            data: getUserResponse,
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserType = req.body;

        if (!id || Array.isArray(id)) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID e obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedUser) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updateUserResponse: UserType | null = await usersModel.update(id, updatedUser);

        if (!updateUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "sucess",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse,
        };
        return res.status(200).json(response);
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Credenciais invalidas",
                data: null,
            };
            return res.status(400).json(response);
        }

        const userData: UserType | null = await usersModel.getByEmail(email as string)

        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "nao existe utilizador com esse email",
                data: null,
            };
            return res.status(404).json(response);
        }
        const isPasswordValid: boolean = await comparePassword(password, userData.password)

        if (!isPasswordValid) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Credenciais invalidas",
                data: null,
            };
            return res.status(401).json(response);
        }
        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            role: userData.role
        }
        /*TODO: Adicionar role ao utilizador na bd (alter table)e no user type
        alter table  users
        add column role ENUM('client','prestador')
        
        */

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        const response: ResponseType<{ token: string }> = {
            status: "sucess",
            message: "Login bem sucedido",
            data: {
                token
            },
        };
        return res.status(200).json(response);
    },



    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deleteUserResponse: UserType | null = await usersModel.delete(id);

        if (!deleteUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<UserType> = {
            status: "sucess",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse,
        };
        return res.status(200).json(response);
    },
};
