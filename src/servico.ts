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
export function adicionarservico(servico: servicoType): ResponseType {
    if (!servico.nome || servico.precoHora <= 0) {
        return {
            sucesso: false,
            mensage: "nome invalido ou preço por hora deve ser maior que 0",
            data: null
        }
    }

    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === servico.nome) {
            return {
                sucesso: false,
                mensage: "serviço ja existe no catálogo",
                data: null,
            }
        }
    }
    catalogoDeServicos.push(servico)
    return {
        sucesso: true,
        mensage: "servico adicinado com sucesso",
        data: servico,
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