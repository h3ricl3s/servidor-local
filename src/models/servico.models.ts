import db from "../lib/db.js";
import { updateService } from "../servico.js";
import type { ServicoDBType } from "../utils/types.js";

export const ServicoModel = {
    async create(newService: ServicoDBType) {
        try {
            const query = `INSERT INTO tabela_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date(),
            ];

            const rows = await db.execute(query, values);

            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async getAll() {
        try {
            const query = `SELECT * FROM tabela_servicos`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const rows = await db.execute(query, value);

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
                            update_at=?
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

            const rows = await db.execute(query, values);

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

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

};