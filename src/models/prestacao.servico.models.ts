import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { updateService } from "../servico.js";
import { type PrestacaoServicoDetalhadoType, type prestacaoServicoDBType, type ServicoDBType } from "../utils/types.js";
import { ca } from "date-fns/locale";

export const PrestacaoServicoModel = {
    async create(newService: ServicoDBType): Promise<ServicoDBType | null> {
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

            const [result] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async getAll(): Promise<ServicoDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_servicos`;

            const [rows] = await db.execute<ServicoDBType[] & RowDataPacket[]>(query);

            return Array.isArray(rows) ? rows : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string): Promise<ServicoDBType | null> {
        try {
            const query = `SELECT * FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByIdOrcamento(idOrcamento: string): Promise<prestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<prestacaoServicoDBType[] & RowDataPacket[]>(`
                SELECT * FROM tbl_prestacao_servico
                WHERE tbl_prestacao_servico.id_orcamento = ?
                `, [idOrcamento])

            if (Array.isArray(rows) && rows.length === 0) return null

            return Array.isArray(rows) ? rows[0] as prestacaoServicoDBType : null

        } catch (error) {
            console.log(error);
            return null

        }
    },

    async update(id: string, updatedService: ServicoDBType): Promise<ServicoDBType | null> {
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

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<ServicoDBType | null> {
        try {
            const query = `DELETE FROM tabela_servicos WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<ServicoDBType & RowDataPacket[]>(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
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