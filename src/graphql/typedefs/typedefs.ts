
import { gql } from "graphql-tag"
     

export const typeDefs = gql`

    enum Role {
        CLIENTE,
        ADMIN,
        PRESTADOR,
        EMPRESA 
    }
    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADO
    }
    enum EstadoPrestacaoServico {
        PENDENTE,
        FINALIZADO,
        EM_ANDAMENTO,
        CANCELADO
    }
    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }


    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Proposta {
        id: ID!,
        id_prestador: Prestador,
        id_prestacao_servico: PrestacaoServico,
        preco_hora: Float!,
        horas_estimadas: Int,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type PrestacaoServico {
        id: ID!,
        designacao: String!,
        subtotal: Float!,
        horas_estimadas: Int,
        id_prestador: Prestador,
        id_servico: Servico,
        preco_hora: Float!,
        estado: EstadoPrestacaoServico,
        id_orcamento: Orcamento,
        id_utilizador: Utilizador,
        id_empresa: Empresa,
        tipo_prestador: TipoPrestador,
        urgente: Boolean,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Orcamento {
        id: ID!,
        total: Float!,
        id_utilizador: Utilizador,
        id_prestador: Prestador,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Empresa {
        id: ID!,
        designacao: String!,
        descricao: String!,
        nif: String!,
        icone: String!,
        id_utilizador: String!,
        localidade: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Prestador {
        id: ID!,
        id_prestador: String,
        id_prestacao_servico: String,
        preco_hora: Float,
        horas_estimadas: Int,
        estado: String,
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Servico {
        id: ID!,
        nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }
    type Categoria {
        id: ID!,
        nome: String!,
        descricao: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

type Query {
    getAllUsers: [Utilizador]
    getUsersById(id: ID!): Utilizador
    getAllServices: [Servico]
    getServicoById(id: ID!): Servico
    getAllCategorias: [Categoria]
    getCategoriaById(id: ID!): Categoria
    getAllEmpresa: [Empresa]
    getEmpresaById(id: ID!): Empresa
    getAllPrestador: [Prestador]
    getPrestadorById(id: ID!): Prestador
    getAllOrcamentos: [Orcamento]
    getOrcamentoById(id: ID!): Orcamento
    getAllPrestacaoServico: [PrestacaoServico]
    getPrestacaoServicoById(id: ID!): PrestacaoServico
    getAllProposta: [Proposta]
    getPropostaById(id: ID!): Proposta

}
 type Mutation {
    createUser(
    nome: String!,
    numero_identificacao: String!,
    data_nascimento: String!,
    email: String!,
    telefone: String!,
    pais: String!,
    localidade: String,
    password: String,
    role: Role,
    enabled: Boolean
    ):Utilizador
    
    updateUser(
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: Boolean
        ): Utilizador
    deleteUser(id: ID!): Utilizador
    createServico(
        nome: String!, 
        descricao: String!, 
        categoria: String!, 
        enabled: Boolean
        ):Servico
    updateServico(
        id: ID!, 
        nome: String!, 
        descricao: String!, 
        categoria: String!, 
        enabled: Boolean
        ):  Servico
    deleteServico(id: ID!): Servico
    createCategoria(
        nome: String!, 
        descricao: String!, 
        enabled: Boolean
        ):Categoria
    updateCategoria(
        id: ID!, 
        nome: String!, 
        descricao: String!, 
        enabled: Boolean
        ): Categoria
    deleteCategoria(id: ID!): Categoria
    createEmpresa(
        designacao: String!, 
        descricao: String!, 
        nif: String!, 
        icone: String!, 
        id_utilizador: String!, 
        localidade: String!, 
        enabled: Boolean
        ):Empresa
    updateEmpresa(
        id: ID!, 
        designacao: String!, 
        descricao: String!, 
        nif: String!, 
        icone: String!, 
        id_utilizador: String!, 
        localidade: String!, 
        enabled: Boolean
        ):Empresa
    deleteEmpresa(id: ID!): Empresa
    createPrestador(
        id_prestador: String, 
        id_prestacao_servico: String, 
        preco_hora: Float, 
        horas_estimadas: Int, 
        estado: String, 
        owner: String, 
        enabled: Boolean
        ):Prestador
    updatePrestador(
        id: ID!, 
        id_prestador: String, 
        id_prestacao_servico: String, 
        preco_hora: Float, 
        horas_estimadas: Int, 
        estado: String, 
        owner: String, 
        enabled: Boolean
        ): Prestador
    deletePrestador(id: ID!): Prestador
    createOrcamento(
        total: Float!, 
        id_utilizador: ID!, 
        id_prestador: ID!, 
        enabled: Boolean
        ): Orcamento
    updateOrcamento(
        id: ID!, 
        total: Float!, 
        id_utilizador: ID!, 
        id_prestador: ID!, 
        enabled: Boolean
        ): Orcamento
    deleteOrcamento(id: ID!): Orcamento
    createPrestacaoServico(
        designacao: String!, 
        subtotal: Float!, 
        horas_estimadas: Int!, 
        id_prestador: ID!, 
        id_servico: ID!, 
        preco_hora: Float!, 
        estado: String!, 
        id_orcamento: ID!, 
        id_utilizador: ID!, 
        id_empresa: ID!, 
        tipo_prestador: String!, 
        urgente: Boolean!, 
        enabled: Boolean!
        ): PrestacaoServico
    updatePrestacaoServico(
        id: ID!, 
        designacao: String!, 
        subtotal: Float!, 
        horas_estimadas: Int!, 
        id_prestador: ID!, 
        id_servico: ID!, 
        preco_hora: Float!, 
        estado: String!, 
        id_orcamento: ID!, 
        id_utilizador: ID!, 
        id_empresa: ID!, 
        tipo_prestador: String!, 
        urgente: Boolean!, 
        enabled: Boolean!
        ): PrestacaoServico
    deletePrestacaoServico(id: ID!): PrestacaoServico
    createProposta(
        id_prestador: ID!, 
        id_prestacao_servico: ID!, 
        preco_hora: Float!, 
        horas_estimadas: Int!, 
        estado: String!, 
        owner: String!, 
        enabled: Boolean!
        ): Proposta

    updateProposta(
        id: ID!, 
        id_prestador: ID!, 
        id_prestacao_servico: ID!, 
        preco_hora: Float!, 
        horas_estimadas: Int!, 
        estado: String!, 
        owner: String!, 
        enabled: Boolean!
        ): Proposta
    deleteProposta(id: ID!): Proposta
    }

`