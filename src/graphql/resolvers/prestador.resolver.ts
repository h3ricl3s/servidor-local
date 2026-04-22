import { PrestadorModel } from "../../models/prestador.model.js"
import type { PrestadorType } from "../../utils/types.js";

export const prestadorResolver = {
    Query: {
        getAllPrestador: async () => {
            return await PrestadorModel.getAll();
        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await PrestadorModel.get(args.id)
        }
    },
    Mutation: {
        createPrestacaoServico: async (_: any, args: { prestacaoServico: PrestadorType }) => {
            return await PrestadorModel.create(args.prestacaoServico)
        },
        updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: PrestadorType}) => {
            return await PrestadorModel.update(args.id, args.prestacaoServico)
        },
        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id)
        }
    },
    Prestador: {
        servicos: async (parent: PrestadorType) => {
            return await PrestadorModel.get(parent.id!);
        },
        empresa: async (parent: PrestadorType) => {
            return await PrestadorModel.get(parent.id!);
        }
    }
}