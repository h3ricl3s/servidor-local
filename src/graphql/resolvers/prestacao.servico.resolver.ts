import { PrestacaoServicoModel } from "../../models/prestacao.servico.model.js"
import { PrestadorModel } from "../../models/prestador.model.js";
import type { prestacaoServicoDBType } from "../../utils/types.js";

export const prestacaoServicoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },
        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.get(args.id)
        }
    },
    Mutation: {
        createPrestacaoServico: async (_: any, args: { prestacaoServico: prestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.create(args.prestacaoServico)
        },
        updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: prestacaoServicoDBType}) => {
            return await PrestacaoServicoModel.update(args.id, args.prestacaoServico)
        },
        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.delete(args.id)
        }
    },
    PrestacaoServico: {
        prestador: async (parent: prestacaoServicoDBType) => {
            return await PrestadorModel.get(parent.id as any);
        },
        empresa: async (parent: prestacaoServicoDBType) => {
            return await PrestadorModel.get(parent.id as any);
        }
    }
}