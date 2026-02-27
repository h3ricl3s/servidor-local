    
    
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
    data: ServicoType | null

}
