import db from "./lib/db.js";
import type { ServicoDBType, ServicoType } from "./utils/types.js";

interface ServicoCatalogoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimodescontado: number;
    percentagendescontado: number;
}

export let catalogoDeServicos: ServicoCatalogoType[] = [];

export async function adicionarservico(servico: ServicoType) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tabela_servicos (
                id,
                nome,
                descricao,
                categoria,
                enabled,
                created_at,
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                servico.id ?? crypto.randomUUID(),
                servico.nome,
                String(servico.desconto ?? ""),
                servico.categoria,
                servico.enabled ?? true,
                new Date(),
                new Date(),
            ]
        );

        return {
            status: true,
            message: "Sucesso ao adicionar servico",
            data: rows,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function listarServicos(): ServicoCatalogoType[] {
    return catalogoDeServicos;
}

export function apagarServico(nome: string): boolean {
    catalogoDeServicos = catalogoDeServicos.filter((servico) => servico.nome !== nome);
    return true;
}

export function obterServico(nome: string): ServicoCatalogoType | null {
    return catalogoDeServicos.find((servico) => servico.nome === nome) ?? null;
}

export async function addServicesToDB(newService: ServicoDBType) {
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

        const [rows] = await db.execute(query, values);
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getServiceByID(id: string) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM tabela_servicos WHERE id = ?",
            [id]
        );

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAllServices() {
    try {
        const [rows] = await db.execute("SELECT * FROM tabela_servicos");
        return Array.isArray(rows) ? rows : [];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateService(id: string, updatedService: ServicoDBType) {
    try {
        const [rows] = await db.execute(
            `UPDATE tabela_servicos
             SET nome = ?, descricao = ?, categoria = ?, enabled = ?, updated_at = ?
             WHERE id = ?`,
            [
                updatedService.nome,
                updatedService.descricao,
                updatedService.categoria,
                updatedService.enabled,
                new Date(),
                id,
            ]
        );

        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteService(id: string) {
    try {
        const [rows]: any = await db.execute(
            "DELETE FROM tabela_servicos WHERE id = ?",
            [id]
        );

        return rows?.affectedRows === 0 ? null : rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}
