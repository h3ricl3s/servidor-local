class Prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number




    constructor(nomeDoPrestador: string,
        precoHoraPrestador: number,
        profissaoPrestador: string,
        minimoParaDescontoPrestador: number,
        percentagemDescontoPrestador: number,
        taxaUrgenciaPrestador: number
    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraPrestador
        this.profissao = profissaoPrestador
        this.minimoParaDesconto = minimoParaDescontoPrestador
        this.percentagemDesconto = percentagemDescontoPrestador
        this.taxaUrgencia = taxaUrgenciaPrestador
    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }
    alterarNome(novoNome: string){
        this.nome = novoNome
    }
}
const prestador1 = new Prestador("Tiago",
    100,
    "Desenvolvidor de software",
    1000,
    0.1,
    0.3,)


console.log(prestador1.precoHora)//preco hora do prestador, 100

prestador1.alterarPrecoHora(150)

console.log(prestador1.precoHora)//preco hora do prestador, 150
