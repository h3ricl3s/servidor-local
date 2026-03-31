import type { Request, Response } from "express";
import { usersModel } from "../models/users.models.js";
import type { UserType } from "../utils/types.js";
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

        const createUserResponse = await usersModel.create(user);

        if (!createUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar utilizador",
                data: null,
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Utilizador criado com sucesso",
            data: createUserResponse,
        });
    },

    async getAll(_req: Request, res: Response) {
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

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: "error",
                message: "ID do utilizador e obrigatorio",
                data: null,
            });
        }

        const getUserResponse = await usersModel.get(id);

        if (!getUserResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: getUserResponse,
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserType = req.body;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: "error",
                message: "ID e obrigatorio",
                data: null,
            });
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null,
            });
        }

        const updateUserResponse = await usersModel.update(id, updatedUser);

        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse,
        });
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais invalidas",
                data: null,
            });
        }
        
        const userData = await usersModel.getByEmail(email as string)
        
        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "nao existe utilizador com esse email",
                data: null,
            });
        }
        const isPasswordValid = await comparePassword(password, userData.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais invalidas",
                data: null,
            });
        }  
        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome
        }
        
        const token  = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return res.status(200).json({
            status: "success",
            message: "Login bem sucedido",  
            data: {
                token   
            },
        });             
    },


    
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteUserResponse = await usersModel.delete(id);

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
    },
};
