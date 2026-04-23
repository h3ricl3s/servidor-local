
import { empresaModel } from "../../models/empresa.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { usersModel } from "../../models/users.models.js";
import type { UserType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllUsers: async () => {
            return await usersModel.getAll();
        },
        getUsersById: async (_: any, args: { id: string }) => {
            return await usersModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { user: UserType }) => {
            return await usersModel.create(args.user);
        },
        updateUser: async (_: any, args: { id: string, user: UserType }) => {
            return await usersModel.update(args.id, args.user);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await usersModel.delete(args.id);
        }
    },
    // relacionamento 
    User: {
        empresa: async (parent: UserType) => {
            return await empresaModel.get(parent.id!);
        },
        prestador: async (parent: UserType) => {
            return await PrestadorModel.get(parent.id!);
        }
    }
}