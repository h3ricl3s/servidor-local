import { orcamentoModel } from "../../models/orcamento.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import type { orcamentoDBType } from "../../utils/types.js";

export const orcamentoResolver = {
    Query: {
        getAllOrcamentos: async () => {
            return await orcamentoModel.getAll();
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await orcamentoModel.get(args.id);
        }
    },
    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: orcamentoDBType }) => {
            return await orcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: orcamentoDBType }) => {
            return await orcamentoModel.update(args.id, args.orcamento);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await orcamentoModel.delete(args.id);
        }
    },
    Orcamento: {
        prestador: async (parent: orcamentoDBType) => {
            return await PrestadorModel.get(parent.id as any);
        },
        empresa: async (parent: orcamentoDBType) => {
            return await PrestadorModel.get(parent.id as any);
        }
    }
}