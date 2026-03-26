export interface orcamentoDBType {
    id?: number,
    total: number,
    id_utilizador: string,
    id_prestador: string,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface propostaDBType {
    id?: number,
    id_prestacao_servico: number,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface prestacaoServicoDBType {
    id?: number,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: string,
    id_orcamento: number,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface PedidoServicoType {
    cliente: string,
    descricao: string,
    horasEstimadas: number,
    urgente: boolean
}

export interface ServicoType {
    id?: string,
    nome: string,
    desconto?: number | string,
    precoHora: number,
    categoria: string,
    minimoParaDesconto?: number,
    percentagemDesconto?: number,
    enabled?: boolean,
    created_at?: string,
    updated_at?: string
}

export interface prestadorDBType {
    id?: string,
    nif: number,
    profissao: string,
    taxa_urgencia: number,
    minimo_desconto: number,
    percentagem_desconto: number,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface PrestadorType {
    id: string,
    nome: string,
    nif: number,
    profissao: string,
    precoHora: number,
    minimoParaDesconto: number,
    percentagemDesconto: number,
    taxaUrgencia: number,
    taxa_urgencia: number,
    minimo_desconto: number,
    percentagem_desconto: number,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: PrestadorType | ServicoType | null
}

export interface UserType {
    id?: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface ServicoDBType {
    id?: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}
