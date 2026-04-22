import type { RowDataPacket } from "mysql2";
import type { CategoriaType } from "../utils/types.js";
import db from "../lib/db.js";



export const categoriaModel = {
    async create(newCategoria: CategoriaType): Promise<CategoriaType | null> {
        try {
            const query = `
            INSERT INTO tabela_categoria (
                designacao,
                descricao,
                nif,
                icone,
                id_utilizador,
                localidade,
                enabled,
                created_at,
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

            const values = [
                newCategoria.designacao,
                newCategoria.descricao,
                newCategoria.icone,
                newCategoria.id_utilizador,
                newCategoria.localidade,
                newCategoria.enabled,
                new Date(),
                new Date(),
            ]

            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<CategoriaType | null> {
        try {
            const query = `
            SELECT 
                tabela_categoria.id,
                tabela_categoria.designacao,
                tabela_categoria.descricao,
                tabela_categoria.nif,
                tabela_categoria.icone,
                tabela_categoria.id_utilizador,
                tabela_categoria.localidade,
                tabela_categoria.enabled,
                tabela_categoria.created_at,
                tabela_categoria.updated_at
            FROM tabela_categoria
            WHERE id = ?
            `

            const value = [id];

            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CategoriaType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<CategoriaType[] | null> {
        try {
            const query = `
            SELECT 
                tabela_categoria.id,
                tabela_categoria.designacao,
                tabela_categoria.descricao,
                tabela_categoria.nif,
                tabela_categoria.icone,
                tabela_categoria.id_utilizador,
                tabela_categoria.localidade,
                tabela_categoria.enabled,
                tabela_categoria.created_at,
                tabela_categoria.updated_at
            FROM tabela_categoria
            `

            const [rows] = await db.execute<CategoriaType[] & RowDataPacket[]>(query);
            return Array.isArray(rows) && rows.length > 0 ? rows as CategoriaType[] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedCategoria: CategoriaType): Promise<CategoriaType | null> {
        try {
            const query = `
            UPDATE tabela_categoria
            SET 
                designacao = COALESCE(?, designacao),
                descricao = COALESCE(?, descricao),
                icone = COALESCE(?, icone),
                updated_at = ?
            WHERE id = ?
            `

            const values = [
                updatedCategoria.designacao,
                updatedCategoria.icone,
                new Date(),
                id,
            ]

            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<CategoriaType | null> {
        try {
            const query = `
            DELETE FROM tabela_categoria
            WHERE id = ?
            `

            const value = [id];

            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CategoriaType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
}
