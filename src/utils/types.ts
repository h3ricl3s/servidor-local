    
    
    export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
} 

    export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDesconto?: number,
    percentagemDesconto?: number
}

    export interface ResponseType{
    status: boolean,
    message: string,
    data: PrestadorType | ServicoType | null

}
export interface PrestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

}