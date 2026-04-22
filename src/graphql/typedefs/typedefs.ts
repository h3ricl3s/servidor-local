
import { gql } from "graphql-tag";
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

export const typeDefs = gql`
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
    };
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
    };
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
    };
    type Orcamento {
        id: ID!,
        total: Float!,
        id_utilizador: Utilizador,
        id_prestador: Prestador,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    };
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
    };
    type Prestador {
        id: ID!,
        id_prestador: string,
        id_prestacao_servico: string,
        preco_hora: Float,
        horas_estimadas: Int,
        estado: string,
        owner: string,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    };
    type Servico {
        id: ID!,
        nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
};
type Categoria {
    id: ID!,
    nome: String!,
    descricao: String!,
    enabled: Boolean,
    created_at: String,
    updated_at: String

type Query {
    getAllUsers: [Utilizador]
    getUsersById(id: ID!): Utilizador
    getAllServices: [Servico]
    getServicoById(id: ID!): Servico

}
 type Mutation {
    createUtilizador(nome: String!, numero_identificacao: String!, data_nascimento: String!, email: String!, telefone: String!, pais: String!, localidade: String, password: String, role: Role, enabled: Boolean): Utilizador
    updateUtilizador(id: ID!, nome: String!, numero_identificacao: String!, data_nascimento: String!, email: String!, telefone: String!, pais: String!, localidade: String, password: String, role: Role, enabled: Boolean): Utilizador
    deleteUtilizador(id: ID!): Utilizador
    createServico(nome: String!, descricao: String!, categoria: String!, enabled: Boolean): Servico
    updateServico(id: ID!, nome: String!, descricao: String!, categoria: String!, enabled: Boolean): Servico
    deleteServico(id: ID!): Servico
}
}`;