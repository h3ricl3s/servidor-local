import express, { type Request, type Response } from "express";
import { adicionarservico, listarServicos, apagarServico, obterServico } from "./servico.js";
import { calcularOrcamentoi, criarPrestadoresDeServicos, editarPrestadorDeServico, seleccionarServicos, selecionarPrestador } from "./orcamento.js";

const app = express();
app.use(express.json())

app.get("/hello", (req: Request, res: Response) => {
    console.log("hello world");
    res.send("hello wrold")
});
//rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const servico = req.body

    console.log(servico)

    const AddServicoResponse = adicionarservico(servico)
    res.json(AddServicoResponse)
})


//rota para listar todos os serviços
app.get("/listar-servico", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})


//rota para apagar umm servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Name do servico eh obrigatorio"
        })
    }
})

app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body

    const selecionarServicoResponse = seleccionarServicos(nome as string)
    res.json(selecionarServicoResponse)
})


// rota para calcular orcamento
app.post("/calcular-orcamento",(req: Request,res:Response)=>{
    const { pedido} =req.body

    const calcularOrca = calcularOrcamentoi(pedido)

    res.json(calcularOrca)
})

//rota para selecionar prestadores
app.post("/criar-prestador",(req:Request,res:Response)=>{
    //pegar o corpo de requisicao com os dados do novo prestador
    const { nome } = req.body
    const criarPrestadorResponse = criarPrestadoresDeServicos (nome)

res.json(criarPrestadorResponse)
})

//rota para editar prestador
app.put("/editar-prestador", (req: Request, res: Response) => {
    const {nomeDoPrestador, novosDadosDoPrestador} = req.body

    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)
    res.json(editarPrestadorResponse)
})

app.listen(8080, () => {
  console.log("Server running on port 8080")
})

app.listen(8080, () => {
    console.log("servidor running on port 8080");
});

