import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterservico } from "./servico.js";


const app = express()
app.use(express.json())

app.get("/hello", (req: Request, res: Response) => {
    res.json("Hello Word!");
})
// rota para adicionar um servico novo 
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    console.log(novoServico);

    const resposta = adicionarServico(novoServico)
    res.json(resposta)
})
// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})


//rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    }else{
        res.json({
            menssage: "Nome do servico eh obrigatorio"
        })
    }
})
// rota para obter servico pelo nome 
app.get("/obter-servico",(req: Request,res: Response)=>{
    const {nome} =req.query

    if ( nome) {
        const obterServicoResponse = obterservico(nome as string)

        res.json (obterServicoResponse)
    }else{
        res.json({
            menssage: "Nome do servico do obrigatorio "
        })
    }
})


app.listen(8080, () => {
    console.log("server running on port 8080");
})