
import { gql } from "graphql-tag";
     enum Role {
        CLIENTE = "client",
        ADMIN = "admin",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"
    }
    enum EstadoProposta {
        PENDENTE = "pendente",
        ACEITE = "aceite",
        CANCELADO = "cancelado"
    }
    enum EstadoPrestacaoServico {
        PENDENTE = "pendente",
        FINALIZADO = "finalizado",
        EM_ANDAMENTO = "em_andamento",
        CANCELADO = "cancelado"
    }
    enum TipoPrestador {
        PARTICULAR = "particular",
        EMPRESA = "empresa"
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
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Proposta {
        id: ID!,
        id_prestador: String!,
        id_prestacao_servico: String!,
        preco_hora: Float!,
        horas_estimadas: Float!,
        estado: String!,
        owner: String,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type PrestacaoServico {
        id: ID!,
        designacao: String!,
        subtotal: Float!,
        horas_estimadas: Float!,
        id_prestador: String!,
        id_servico: String!,
        preco_hora: Float!,
        estado: String!,
        id_orcamento: String!,
        id_utilizador: String!,
        id_empresa: String!,
        tipo_prestador: String!,
        urgente: boolean,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Orcamento {
        id: ID!,
        total: Float!,
        id_utilizador: String!,
        id_prestador: String!,
        enabled: boolean,
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
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Prestador {
        id: ID!,
        nif: Int!,
        profissao: String!,
        taxa_urgencia: Float!,
        minimo_desconto: Float!,
        percentagem_desconto: Float!,
        enabled: boolean,
        created_at: String,
        updated_at: String
    };
    type Servico {
        id: ID!,
        nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: boolean,
        created_at: String,
        updated_at: String
};
type Categoria {
    id: ID!,
    nome: String!,
    descricao: String!,
    enabled: boolean,
    created_at: String,
    updated_at: String
}`;