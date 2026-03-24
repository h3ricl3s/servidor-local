
-- ================================
-- TABELA PRESTADORES
-- ================================
CREATE TABLE tabela_prestadores (
    id VARCHAR(255) PRIMARY KEY,
    nif INT NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    taxa_urgencia DECIMAL(10,3),
    minimo_desconto DECIMAL(10,3),
    percentagem_desconto DECIMAL(10,3),
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- ================================
-- TABELA UTILIZADORES
-- ================================
CREATE TABLE tabela_utilizadores (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    numero VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(13),
    pais VARCHAR(100) NOT NULL,
    localidade VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- ================================
-- TABELA SERVIÇOS
-- ================================
CREATE TABLE tabela_servicos (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    desconto VARCHAR(50),
    categoria VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- ================================
-- TABELA ORÇAMENTO
-- ================================
CREATE TABLE tabela_orcamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DOUBLE NOT NULL,
    id_utilizador VARCHAR(255) NOT NULL,
    id_prestador VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    
    CONSTRAINT fk_orcamento_utilizador
    FOREIGN KEY (id_utilizador)
    REFERENCES tabela_utilizadores(id),

    CONSTRAINT fk_orcamento_prestador
    FOREIGN KEY (id_prestador)
    REFERENCES tabela_prestadores(id)
);

-- ================================
-- TABELA PRESTAÇÃO DE SERVIÇOS
-- ================================
CREATE TABLE tabela_prestacao_servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designacao VARCHAR(255) NOT NULL,
    subtotal DOUBLE NOT NULL,
    horas_estimadas INT NOT NULL,
    id_prestador VARCHAR(255) NOT NULL,
    id_servico VARCHAR(255) NOT NULL,
    preco_hora DOUBLE NOT NULL,
    estado ENUM('pendente','em progresso','completo','cancelado') NOT NULL,
    id_orcamento INT NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,

    CONSTRAINT fk_prestador_servico
    FOREIGN KEY (id_prestador)
    REFERENCES tabela_prestadores(id),

    CONSTRAINT fk_servico_referencia
    FOREIGN KEY (id_servico)
    REFERENCES tabela_servicos(id),

    CONSTRAINT fk_orcamento_referencia
    FOREIGN KEY (id_orcamento)
    REFERENCES tabela_orcamento(id)
);

-- ================================
-- TABELA PROPOSTA
-- ================================
CREATE TABLE tabela_proposta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_prestacao_servico INT NOT NULL,
    preco_hora DOUBLE NOT NULL,
    horas_estimadas INT NOT NULL,
    estado ENUM('pendente','em progresso','completo','cancelado'),
    enabled BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME,

    CONSTRAINT fk_proposta_prestacao
    FOREIGN KEY (id_prestacao_servico)
    REFERENCES tabela_prestacao_servicos(id)
);
ALTER TABLE tabela_prestacao_servicos
ADD CONSTRAINT fk_prestadores_prestacao_proposta_servico
FOREIGN KEY (id_prestadores)
REFERENCES tabela_prestadores(id),

ADD CONSTRAINT fk_servicos_prestacao_servico
FOREIGN KEY (id_servico)
REFERENCES tabela_servicos(id);

