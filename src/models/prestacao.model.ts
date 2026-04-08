import { get } from "node:http";
import db from "../lib/db.js";
import type { prestacaoServicoDBType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";

export const PrestacaoModel = {
    async create(newPrestacaoServico: prestacaoServicoDBType) {
        try {
            const query = `INSERT INTO tabela_prestacao_servicos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                newPrestacaoServico.designacao,
                newPrestacaoServico.subtotal,
                newPrestacaoServico.horas_estimadas,
                newPrestacaoServico.id_prestador,
                newPrestacaoServico.id_servico,
                newPrestacaoServico.preco_hora,
                newPrestacaoServico.estado,
                newPrestacaoServico.id_orcamento,
                newPrestacaoServico.enabled,
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
            const query = `SELECT * FROM tabela_prestacao_servicos`;

            const [rows] = await db.execute(query);

            return Array.isArray(rows) ? rows : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tabela_prestacao_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestacaoServico: prestacaoServicoDBType) {
        try {
            const query = `UPDATE tabela_prestacao_servicos 
                        SET 
                            designacao=?,
                            subtotal=?,
                            horas_estimadas=?,
                            id_prestador=?,
                            id_servico=?,
                            preco_hora=?,
                            estado=?,
                            id_orcamento=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;

            const values = [
                updatedPrestacaoServico.designacao,
                updatedPrestacaoServico.subtotal,
                updatedPrestacaoServico.horas_estimadas,
                updatedPrestacaoServico.id_prestador,
                updatedPrestacaoServico.id_servico,
                updatedPrestacaoServico.preco_hora,
                updatedPrestacaoServico.estado,
                updatedPrestacaoServico.id_orcamento,
                updatedPrestacaoServico.enabled,
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
            const query = `DELETE FROM tabela_prestacao_servicos WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByIdOrcamento(idOrcamento: string): Promise<prestacaoServicoDBType | null> {
    try {
        const [rows] = await db.execute<prestacaoServicoDBType[] & RowDataPacket[]>(`SELECT * 
            FROM tabela_prestacao_servicos WHERE id_orcamento = ?`,
            
            [idOrcamento]
        )
        if (Array.isArray(rows) && rows.length > 0) return null
        return Array.isArray(rows) ? rows[0] as prestacaoServicoDBType : null
        } catch (err) {
            console.log(err)
            return null
    }
}
}

