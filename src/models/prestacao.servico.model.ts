import { get } from "node:http";
import db from "../lib/db.js";
import type { prestacaoServicoDBType, PrestacaoServicoDetalhadoType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";

export const PrestacaoModel = {
    async create(newPrestacaoServico: prestacaoServicoDBType): Promise<prestacaoServicoDBType | null> {
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

            const [rows] = await db.execute<prestacaoServicoDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<prestacaoServicoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_prestacao_servicos`;

            const [rows] = await db.execute<prestacaoServicoDBType[] & RowDataPacket[]>(query);

            return Array.isArray(rows) ? rows as prestacaoServicoDBType[] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<prestacaoServicoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_prestacao_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<prestacaoServicoDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as prestacaoServicoDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestacaoServico: prestacaoServicoDBType): Promise<prestacaoServicoDBType | null> {
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

            const [rows] = await db.execute<prestacaoServicoDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<prestacaoServicoDBType | null> {
        try {
            const query = `DELETE FROM tabela_prestacao_servicos WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<prestacaoServicoDBType & RowDataPacket[]>(query, value);
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
    },
    async getAllPrestacaoServicoDetalhada(limits: number, offset: number): Promise<PrestacaoServicoDetalhadoType[] | null> {
        try {
            const query = `
                SELECT
                    ps.id as id_prestacao_servico,
                    ps.designacao as descricao,
                    u.nome as nome_utilizador,
                    u.email as email_utilizador,
                    s.nome as nome_servico,
                    ps.created_at as data_pedido,
                    ps.urgente
                    FROM tabela_prrestacao_servico ps
                    INNER JOIN tabela_utilizadores u ON ps.id_utilizador = u.id
                    INNER JOIN tabela_servicos s ON ps.id_servico = s.id
                    ORDER BY ps.created_at DESC
                    LIMIT ? OFFSET ?
            `

            const [rows] = await db.execute<PrestacaoServicoDetalhadoType[] & RowDataPacket[]>(
                query,
                [
                    limits.toString(),
                    offset.toString()
                ]
            );

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoDetalhadoType[] : null

        } catch (err) {
            console.log(err);
            return null
        }
    }
}

