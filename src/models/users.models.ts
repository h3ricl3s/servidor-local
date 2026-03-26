import db from "../lib/db.js";
import { formatDateDDMMYYYY} from "../utils/date.js";
import { hashpassword } from "../utils/password.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const usersModel = {
    async create(user: UserType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tabela_utilizadores (
                    id,
                    nome,
                    numero_identificacao,
                    data_nascimento,
                    email,
                    telefone,
                    pais,
                    localidade,
                    password,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user.id ?? generateUUID(),
                    user.nome,
                    user.numero_identificacao,
                    formatDateDDMMYYYY(user.data_nascimento),
                    user.email,
                    user.telefone,
                    user.pais,
                    user.localidade,
                    await hashpassword(user.password),
                    user.enabled,
                    new Date(),
                    new Date(),
                ],
            );
            console.log({ rows });
            return rows;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_utilizadores");
            return rows;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async get(id: string) {
        console.log("getUserById", id);

        try {
            const [rows] = await db.execute(
                `SELECT * FROM tabela_utilizadores 
        WHERE tabela_utilizadores.id = ?`,

                [id],
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },


    async update(id: string, updatedUser: UserType) {
        try {
            const query = `
        UPDATE tabela_utilizadores
        SET
            nome=?,
            numero_identificacao=?,
            data_nascimento=?,
            email=?,
            telefone=?,
            pais=?,
            localidade=?,
            password=?,
            enabled=?,
            updated_at=?
        WHERE id=?
        `

            const values = [
                updatedUser.nome,
                updatedUser.numero_identificacao,
                formatDateDDMMYYYY(updatedUser.data_nascimento),
                updatedUser.email,
                updatedUser.telefone,
                updatedUser.pais,
                updatedUser.localidade,
                await hashpassword(updatedUser.password), //não é correto atualizar a password desta forma, depois mudamos...
                updatedUser.enabled,
                new Date(),
                id
            ]

            const [rows] = await db.execute(query, values)
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tabela_utilizadores WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};
