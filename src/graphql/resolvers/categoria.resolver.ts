import { categoriaModel } from "../../models/categoria.model.js"
import type { CategoriaType } from "../../utils/types.js";

export const categoriaResolver = {
    Query: {
        getAllEmpresa: async () => {
            return await categoriaModel.getAll();
        },
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await categoriaModel.get(args.id)
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: CategoriaType }) => {
            return await categoriaModel.create(args.empresa)
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: CategoriaType}) => {
            return await categoriaModel.update(args.id, args.empresa)
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await categoriaModel.delete(args.id)
        }
    },
    Categoria: {
        prestador: async (parent: CategoriaType) => {
            return await categoriaModel.get(parent.id as any);
        },
        empresa: async (parent: CategoriaType) => {
            return await categoriaModel.get(parent.id as any);
        }
    }
}