

export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ServicoType {
    id: string,
    nome: string,
    desconto: number,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: PrestadorType | ServicoType | null

}
export interface PrestadorType {
    id: string,
    nif: number,
    profissao: string,
    taxa_urgencia: number,
    minimo_desconto: number,
    percentagem_desconto: number,
    enabled: boolean,
    created_at: string,
    updated_at: string

}
export interface PrestadorType {
    nome: string,
    minimoParaDesconto: number,
    percentagemDesconto: number,
   taxaUrgencia: boolean;
}

export interface UserType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: number,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}