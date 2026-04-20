import e from "express"

export enum Role {
    CLIENTE = "client",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}

export enum EstadoProposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}
export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_ANDAMENTO = "em_andamento",
    CANCELADO = "cancelado"
}

export enum TipoPrestador {
    PARTICULAR = "particular",
    EMPRESA = "empresa"
}

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
    id: number,
    id_prestador: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    owner?: string,
    enabled: boolean,
    created_at?: string,
    updated_at?: string
}

export interface prestacaoServicoDBType {
    id: number,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: EstadoPrestacaoServico,
    id_orcamento: number,
    id_utilizador: string,
    id_empresa: string,
    tipo_prestador: TipoPrestador,
    urgente: boolean,
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
    id: string,
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
    role: Role,
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



export interface PrestacaoServicoDetalhadoType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean,
}

export interface ResponseType<T> {
    status: "sucess" | "error",
    message: string,
    data: T | null
}

export interface ServicoDetalhadoType {
    id_servico: string,
    nome_servico: string,
    descricao_servico: string,
    designacao_categoria: string,
    icone_categoria: string,
    id_empresa: string,
    designacao_empresa: string,
    icone_empresa: string,
    enabled: boolean
}
export interface CategoriaType {
    id: string,
    designacao: string,
    icone: string,
    created_at: string,
    updated_at: string
}

export interface empresaDBType {
    id: string,
    designacao: string,
    descricao: string,
    nif: string,
    icone: string,
    id_utilizador: string,
    localidade: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestadorDetalhadoType {
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


export interface PrestacaoServicoByCategoriaType {
    id_prestacao_servico: string,
    nome_servico: string,
    nome_categoria: string,
    icone_categoria: string,
    data_pedido: string,
    urgente: boolean,
}


