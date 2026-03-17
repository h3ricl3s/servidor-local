import { error } from "node:console";
import db from "./lib/db.js"
import type { ServicoDBType, ServicoType } from "./utils/types.js";

interface ResponseType {
    sucesso: boolean,
    mensage: string,
    data: servicoType | null,
}

interface servicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimodescontado: number,
    percentagendescontado: number,
}

export let catalogoDeServicos: servicoType[] = []
//adicionar un serviço novo//
export async function adicionarservico(servico: ServicoType) {
    try {
        console.log(servico)
        const [rows] = await db.execute(
            `INSERT INTO tabela_servicos
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [servico.id, servico.nome, servico.desconto, servico.categoria,
            servico.enabled, new Date, new Date]
        )
        console.log({ rows });
        return {
            status: true,
            message: 'Sucesso ao adicionar servico ',
            data: rows
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

// listar todos os serviços
export function listarServicos(): servicoType[] {
    //TODO: implementar fetch de servico
    return catalogoDeServicos
}
// apagar um servico           
export function apagarServico(nome: string): boolean {
    //TODO: implimentar delete de servico

    const novoCatalogoTemp: servicoType[] = []

    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome !== undefined && catalogoDeServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoDeServicos[i]!)
        }
    }// devolve um novo catalogo
    catalogoDeServicos = novoCatalogoTemp
    return true
}
export function obterServico(nome: string): servicoType | null {
    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === nome) {
            return catalogoDeServicos[i!]!
        }
    }
    return null
}


export async function addServicesToDB(newService: ServicoDBType) {
    console.log({ newService })

    try {

        const query = 'INSERT INTO tabela_servicos VALUES(?,?,?,?,?,?,?,)'

        const values = [
            null,
            newService.id,
            newService.nome,
            newService.descricao,
            newService.categoria,
            newService.enabled,
            new Date(),
            new Date()
        ]

        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getServiceByID(id: string) {
    try {
        const query = `SELECT * FROM tabela_servicos WHERE id = ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    } catch (error) {
        console.log(error)
        return null
    }

}
export async function getAllServices() {
    try {
        const query = 'SELECT * FROM tabela_servicos'

        const rows = await db.execute(query)
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error)
        return null
    }
}
//update de dados 
export async function updateService(id:string, updatedService : ServicoDBType) {
    try {
        const query = 
        'UPDATE tabela_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=? WHERE id=? ;'

        const values = [
updatedService.nome,
updatedService.descricao,
updatedService.categoria,
updatedService.enabled,
new Date(),
id
        ]
        const rows = await db.execute(query,values)

    } catch (error) {
        console.log(error)
        return null
    }
}
export async function deleteService(id:string) {
    try {
        const query = 
    'DELETE FROM tabela_servicos WHERE id =?'

}}