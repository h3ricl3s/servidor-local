import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { orcamentoDBType } from "../utils/types.js";

export const orcamentoModel = {
    async create(orcamento: orcamentoDBType): Promise<orcamentoDBType | null> {
        try {
            const query = `INSERT INTO tabela_orcamento VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.id_prestador,
                orcamento.enabled,
                new Date(),
                new Date(),
            ]

            const [rows] = await db.execute<orcamentoDBType & RowDataPacket[]>(query, values);
            return rows as orcamentoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<orcamentoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_orcamento`;
            const [rows] = await db.execute(query);

            return Array.isArray(rows) ? rows as orcamentoDBType[] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<orcamentoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_orcamento WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<orcamentoDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as orcamentoDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedOrcamento: orcamentoDBType): Promise<orcamentoDBType | null> {
        try {
            const query = `UPDATE tabela_orcamento 
                        SET 
                            total=?,
                            id_utilizador=?,
                            id_prestador=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.id_prestador,
                updatedOrcamento.enabled,
                new Date(),
                id,
            ];

            const [rows] = await db.execute<orcamentoDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async updateBudget(id: string, total: number): Promise<orcamentoDBType | null> {
        try {
            const rows: any = await db.execute(`
                UPDATE tabela_orcamento
                SET total = ?, updated_at = ?
                WHERE id = ?;
            `, [total, new Date(), id])

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_orcamento WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<orcamentoDBType & RowDataPacket[]>(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
