
import { PrestadorModel } from "../../models/prestador.model.js";
import { PropostaModel } from "../../models/proposta.model.js";
import type { PropostaType, UserType } from "../../utils/types.js";

export const propostaResolver = {
    Query: {
        getAllUsers: async () => {
            return await PropostaModel.getAll();
        },
        getUsersById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { proposta: PropostaType }) => {
            return await PropostaModel.create(args.proposta as any);
        },
        updateUser: async (_: any, args: { id: string, proposta: PropostaType }) => {
            return await PropostaModel.update(args.id, args.proposta as any);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id);
        }
    },
    User: {
        prestador: async (parent: UserType) => {
            return await PrestadorModel.get(parent.id!);
        },
        empresa: async (parent: UserType) => {
            return await PropostaModel.get(parent.id!);
        }
    }
}