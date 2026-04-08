import db from "../lib/db.js";
import { updateService } from "../servico.js";
import type { ServicoDBType } from "../utils/types.js";

export const PrestacaoServicoModel = {
    async create(newService: ServicoDBType) {
        try {
            const query = `
                INSERT INTO tabela_servicos (
                    id,
                    nome,
                    descricao,
                    categoria,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                newService.id ?? crypto.randomUUID(),
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date(),
            ];

            const [result] = await db.execute(query, values);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async getAll() {
        try {
            const query = `SELECT * FROM tabela_servicos`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) ? rows : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedService: ServicoDBType) {
        try {
            const query = `UPDATE tabela_servicos 
                        SET 
                            nome=?,
                            descricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedService.nome,
                updatedService.descricao,
                updatedService.categoria,
                updatedService.enabled,
                new Date(),
                id,
            ];

            const [rows] = await db.execute(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

};
