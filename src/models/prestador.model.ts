import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { prestadorDBType } from "../utils/types.js";

export const PrestadorModel = {
    async create(newPrestador: prestadorDBType): Promise<prestadorDBType | null> {
        try {
            const query = `
                INSERT INTO tabela_prestadores (
                    id,
                    nif,
                    profissao,
                    taxa_urgencia,
                    minimo_desconto,
                    percentagem_desconto,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                newPrestador.id ?? crypto.randomUUID(),
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.taxa_urgencia,
                newPrestador.minimo_desconto,
                newPrestador.percentagem_desconto,
                newPrestador.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute<prestadorDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<prestadorDBType[] | null> {
        try {
            const query = `SELECT * FROM tabela_prestadores`;

            const [rows] = await db.execute<prestadorDBType[] & RowDataPacket[]>(query);

            return Array.isArray(rows) ? rows as prestadorDBType[] : [];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<prestadorDBType | null> {
        try {
            const query = `SELECT * FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<prestadorDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) ? rows[0] as prestadorDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedPrestador: prestadorDBType): Promise<prestadorDBType | null> {
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

            const [rows] = await db.execute<prestadorDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<prestadorDBType | null> {
        try {
            const query = `DELETE FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<prestadorDBType & RowDataPacket[]>(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
