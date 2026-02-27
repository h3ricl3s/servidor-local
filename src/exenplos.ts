import express from "express";

const app = express();

interface AlunosType {
    nome: string;
    endereco: string;
    contato?: string | null;
}

const alunos: Array<AlunosType> = [
    {
        nome: "Tiago",
        endereco: "Rua A",
        contato: "123456789"
    },
]

let horasTrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let desconto: number = 10;


let variavel: string = "variavel";
desconto === taxaUrgencia && desconto > taxaUrgencia ?
    taxaUrgencia += desconto : taxaUrgencia -= desconto;



function calcularTotal() {
    let total: number = 10;
    total = (horasTrabalhadas * precoHora) + taxaUrgencia - desconto;
    return total
}
function meuNome(nome: string) {
    return "Ola " + nome
}

function orcamento(precoHora: number, horasTrabalhadas: number, taxaUrgencia: number, desconto: number) {
    let total: number = 0;
    total = (horasTrabalhadas * precoHora) + taxaUrgencia - desconto;
    return total
}

const aEnviar = orcamento(15, 19, 10, 5)

const nome = meuNome("Tiago")

console.log(nome) // Ola Tiago
console.log(aEnviar) // 290

const valorAReceber = calcularTotal()

console.log("valor a receber: ", valorAReceber)

app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});



app.listen(8080, () => {
    console.log("Server running on port 8080");
});


interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

const pedodoServico: PedidoServico = {
    cliente: "Tiago",
    descricao: "Serviço de TI",
    horasEstimadas: 10,
    urgente: true
}

const existeCantina: boolean = true;
const cantinaTemCafe = false;
const existeEscComCAfe = true;

if (!existeCantina) { // ! = nao, existeCAntina (true ou false) 
    if (cantinaTemCafe) {
        console.log("toma cafe")
    } else {
        console.log("traze cantina nha cafe ")
    }
} else if (existeEscComCAfe) {
    console.log("toma cafe")
}

function pedirOrcamento() {
    if (!prestador_servico.ativo) {
        console.log("Prestador não está ativo")
        return res.status(400).send("prestador inativo")
    }

    if (!servico.valido) {
        return res.status(404).send("serico ka eh valido")
    }

    if (!pedodoServico.nome) {
        console.log("nome do servico eh obrigatorio")
        return res.status(400).send("nome do servico eh obrigatorio")
    }

    if (idade) {
        console.log("pode beber")
    } else {
        console.log("nao pode beber")
    }

    // ciclos
    // for, while, do ... while
    let iterador: number = 0
    const pedidosServico = [{ servioA }, { servicoB }, { servicoC }]

    while (iterador === pedidosServico.length) {
        iterador++
    }

    do {
        servico = pedidosServico[iterador]
        iterador++
    } while (iterador === pedidosServico.length)

    for (let i = 0; i < pedidosServico.length; i++) {
        servico = pedidosServico[i]
    }
}

interface ServicoType {
    nome: string,
    precoHora: number
}

let catalogoServicos: ServicoType[] = []