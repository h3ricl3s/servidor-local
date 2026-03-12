import { catalogoDeServicos } from "./servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType, type ResponseType } from "./utils/types.js"


const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
let prestadoresDeServico: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []

// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoDeServicos[i]!)
            return true
        }
    }
    return false
}

// fucnao para criar prestadores de servico
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja esta no array
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador ja existir, retorna uma mensagem de erro
            return {
                status: false,
                message: "Ja existe um prestador de servico com esse nome",
                data: null
            }
        }
    })

    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServico.push(novoPrestador)
    return {
        status: true,
        message: "Prestador de servico adicionado com sucesso",
        data: novoPrestador
    }
}

// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal
}


//funcao para selecionar prestador pelo nome
export function selecionarPrestador(nome: string) {
    let prestadorExiste = false
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nome) {
            prestadoresSelecionados.push(prestadoresDeServico[i]!)
            prestadorExiste = true
            break
        }
    }

    if (prestadorExiste) {
        return "O prestador foi selecionado"
    } else {
        return "o prestador não existe"
    }
}

//funcao para editar prestador de servico
export function editarPrestadorDeServico(nomePrestador: string, novosDadosPrestador: PrestadorType): ResponseType {

    const prestadorExistente = prestadoresDeServico.find(
        (prestador: PrestadorType) => prestador.nome === nomePrestador
    );

    if (!prestadorExistente) {
        return {
            status: false,
            message: `Prestador com nome ${nomePrestador} não existe`,
            data: null
        };
    }

    prestadorExistente.nome = novosDadosPrestador.nome;
    prestadorExistente.precoHora = novosDadosPrestador.precoHora;
    prestadorExistente.profissao = novosDadosPrestador.profissao;
    prestadorExistente.minimoParaDesconto = novosDadosPrestador.minimoParaDesconto;
    prestadorExistente.percentagemDesconto = novosDadosPrestador.percentagemDesconto;
    prestadorExistente.taxaUrgencia = novosDadosPrestador.taxaUrgencia;

    return {
        status: true,
        message: "Prestador de serviço editado com sucesso",
        data: prestadorExistente
    };
}

//funcao para apagar um prestador de servico
export function apagarPrestador(nomePrestador: string): ResponseType {

    let newArray: PrestadorType[] = []
    let prestadorExiste = false
    let prestador: PrestadorType | null = null

    if (nomePrestador === "") {
        return {
            status: false,
            message: `Nome não pode ser vazio`,
            data: null
        }
    }

    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome !== nomePrestador) {
            newArray.push(prestadoresDeServico[i]!)
        } else {
            prestadorExiste = true
            prestador = prestadoresDeServico[i]!
        }
    }

    // prestadoresDeServico = prestadoresDeServico.filter(
    //     (prestadorExistente: PrestadorType) => {
    //         return prestadorExistente.nome !== nomePrestador
    //     })

    if (prestadorExiste) {
        prestadoresDeServico = newArray

        return {
            status: true,
            message: "prestador de servico apagado com sucesso",
            data: prestador
        }
    }

    return {
        status: false,
        message: `Prestador com nome ${nomePrestador}  não existe`,
        data: null
    }

}