export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDesconto?: number,
    percentagemDesconto?: number
}

interface ResponseType{
    status: boolean,
    message: string,
    data: ServicoType | null

}

export let catalogoServicos: ServicoType[] = [

    {
        nome: "servicoTeste1",
        precoHora: 12.0,
        categoria: "categoriaTeste1",
        minimoDesconto: 4.0,
        percentagemDesconto: 5.3
    },
    {
        nome: "servicoTeste2",
        precoHora: 8.0,
        categoria: "categoriaTeste2",
        minimoDesconto: 12.0,
        percentagemDesconto: 8.0
    },
    {
        nome: "servicoTeste3",
        precoHora: 18.0,
        categoria: "categoriaTeste3",
        minimoDesconto: 2.0,
        percentagemDesconto: 3.3

    }
]

// Adicionar - novo servico
export function adicionarServico(servico: ServicoType): ResponseType {
    if (!servico.nome || servico.precoHora <= 0) {

        return {
            status: false,
            message: "O nome do serviço precisa existir e o preço ser maior que 0",
            data: null
        }
    }

    for (const s of catalogoServicos) {
        if (s?.nome === servico.nome) {
            return {
                status: false,
                message: `O serviço com nome ${servico.nome} já existe`,
                data: null
            }

        }
    }

    catalogoServicos.push(servico);
    return {
        status: true,
        message: "serviço adicionado com sucesso!",
        data: servico
    }

}

// listar todos os servicos 
export function listarServicos():ServicoType[] {
    //TODO: inplementar fetch de servicos 
    
    return catalogoServicos
}

// apagar um novo servico
export function apagarServico (nome :string): boolean{
    //TUDO : implementar delete de servico 

    const novoCatalogoTemp: ServicoType[] = [] 
    
    for (let i = 0; i <catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos [i]?.nome !== nome ){
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
        
    }// devolve um novo catalogo sem o servico que foi  apagado 
    
    catalogoServicos = novoCatalogoTemp
    return true
}
// obter um servico pelo nome
export function obterservico( nome :string): ServicoType | null{ 
    for (let i =0; i < catalogoServicos.length; i++){
        if (catalogoServicos[i]?.nome === nome ){
            return catalogoServicos[i]!
        }
    }
    return null
}