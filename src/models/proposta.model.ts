import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { propostaDBType } from "../utils/types.js";

export const PropostaModel = {
    async create(newProposta: propostaDBType) {
        try {
            const query = `INSERT INTO tabela_proposta VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newProposta.id_prestacao_servico,
                newProposta.preco_hora,
                newProposta.horas_estimadas,
                newProposta.estado,
                newProposta.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tabela_proposta`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) ? rows : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_proposta WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedProposta: propostaDBType) {
        try {
            const query = `UPDATE tabela_proposta 
                        SET 
                            id_prestacao_servico=?,
                            preco_hora=?,
                            horas_estimadas=?,
                            estado=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedProposta.id_prestacao_servico,
                updatedProposta.preco_hora,
                updatedProposta.horas_estimadas,
                updatedProposta.estado,
                updatedProposta.enabled,
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
            const query = `DELETE FROM tabela_proposta WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByPrestacaoServico(idPrestacaoServico: string): Promise<propostaDBType[] | null> {
        try {
            const [rows] = await db.execute<propostaDBType[] & RowDataPacket[]>(`SELECT * FROM tabela_proposta WHERE id_prestacao_servico = ?`,
                
                [idPrestacaoServico]
            )
            if(Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
