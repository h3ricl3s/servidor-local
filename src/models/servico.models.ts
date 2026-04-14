import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { getAllServices, updateService } from "../servico.js";
import { type PrestacaoServicoDetalhadoType, type prestacaoServicoDBType, type ServicoDBType, type ServicoDetalhadoType } from "../utils/types.js";
import { ca } from "date-fns/locale";

export const ServicoModel = {
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
    async getAllServiceDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
        SELECT DISTINCT
            s.id as id_servico
            s.nome as nome_servico
            s.descricao as descricao_servico
            c.designacao as designacao_categoria
            c.icone as icone_categoria
            e.id as id_empresa
            e.designacao as designacao_empresa
            e.icone as icone_empresa
            s.enabled
        FROM tabela_servicos s
        INNER JOIN tabela_categoria c ON c.id = s.id_categoria
        INNER JOIN tabela_prestacao_servico ps ON ps.id_servico = s.id
        INNER JOIN tabela_empresa e ON e.id = ps.id_empresa
        WHERE s.enabled = true
        LIMIT ? OFFSET ?
        `

            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }

    }

}