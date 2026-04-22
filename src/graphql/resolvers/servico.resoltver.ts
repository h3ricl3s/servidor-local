
import { ServicoModel } from "../../models/servico.models.js";
import type { PropostaType, UserType } from "../../utils/types.js";

export const servicoResolver = {
    Query: {
        getAllUsers: async () => {
            return await ServicoModel.getAll();
        },
        getUsersById: async (_: any, args: { id: string }) => {
            return await ServicoModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { proposta: PropostaType }) => {
            return await ServicoModel.create(args.proposta as any);
        },
        updateUser: async (_: any, args: { id: string, proposta: PropostaType }) => {
            return await ServicoModel.update(args.id, args.proposta as any);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await ServicoModel.delete(args.id);
        }
    },
    User: {
        prestador: async (parent: UserType) => {
            return await ServicoModel.get(parent.id!);
        },
        empresa: async (parent: UserType) => {
            return await ServicoModel.get(parent.id!);
        }
    }
}