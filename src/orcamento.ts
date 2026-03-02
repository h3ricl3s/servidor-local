import { catalogoDeServicos } from "./servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimodescontado: number = 100
const percentagendescontado: number = 0.1


const servicosSelecionados: ServicoType[] = []
const prestadoresDeServicos: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []


// funcao para selecionar servicos e horasEstimadas

export function seleccionarServicos(nome: string,) {
    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoDeServicos[i]!)
            return true
        }

    } return false
}


// funcao para criar prestadores de servico
export function criarPrestadoresDeServicos(novoPrestador:PrestadorType){

    // verificar se o prestador ja esta no array 
    prestadoresDeServicos.map((prestadorExistente:PrestadorType) =>{
        if (prestadorExistente.nome === novoPrestador.nome){
            // se o prestador ja existir, retorna  uma messagem de erro
            return{
                status: false,
                message: "Ja existe um prestador de servico com esse nome",
            }
        }
    })
    // se o prestador nao existir, adicionamos o novo prestador 
prestadoresDeServicos.push(novoPrestador )
return{
    status: true,
    message:"prestador adicionado com sucesso",
    data:novoPrestador
}

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