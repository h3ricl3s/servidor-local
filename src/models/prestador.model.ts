import db from "../lib/db.js";
import type { prestadorDBType } from "../utils/types.js";

export const PrestadorModel = {
    async create(newPrestador: prestadorDBType) {
        try {
            const query = `INSERT INTO tabela_prestadores VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                newPrestador.id,
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.taxa_urgencia,
                newPrestador.minimo_desconto,
                newPrestador.percentagem_desconto,
                newPrestador.enabled,
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
            const query = `SELECT * FROM tabela_prestadores`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const rows = await db.execute(query, value);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestador: prestadorDBType) {
        try {
            const query = `UPDATE tabela_prestadores 
                        SET 
                            nif=?,
                            profissao=?,
                            taxa_urgencia=?,
                            minimo_desconto=?,
                            percentagem_desconto=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedPrestador.nif,
                updatedPrestador.profissao,
                updatedPrestador.taxa_urgencia,
                updatedPrestador.minimo_desconto,
                updatedPrestador.percentagem_desconto,
                updatedPrestador.enabled,
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
            const query = `DELETE FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const rows: any = await db.execute(query, value);

            return rows[0]?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
