import { empresaModel } from "../../models/empresa.model.js"
import type { empresaDBType } from "../../utils/types.js";

export const empresaResolver = {
    Query: {
        getAllEmpresa: async () => {
            return await empresaModel.getAll();
        },
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await empresaModel.get(args.id)
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: empresaDBType }) => {
            return await empresaModel.create(args.empresa)
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: empresaDBType}) => {
            return await empresaModel.update(args.id, args.empresa)
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await empresaModel.delete(args.id)
        }
    },
    // relacionamento 
    Empresa: {
        prestador: async (parent: empresaDBType) => {
            return await empresaModel.get(parent.id as any);
        },
        empresa: async (parent: empresaDBType) => {
            return await empresaModel.get(parent.id as any);
        }
    }
}