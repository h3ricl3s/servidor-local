import { catalogoDeServicos } from "./servico.js"
import { type PedidoServicoType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimodescontado: number = 100
const percentagendescontado: number = 0.1
const servicosSelecionados: ServicoType[] = []

// funcao para selecionar servicos e horasEstimadas

export function seleccionarServicos(nome: string,) {
    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoDeServicos[i]!)

        }
        return true
    } return false
}


export function calcularOrcamentoi(pedido: PedidoServicoType,) {
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
    if (totalBruto >= minimodescontado) {
        totalFinal = totalFinal - (totalBruto * percentagendescontado)
    }
    return totalFinal

}