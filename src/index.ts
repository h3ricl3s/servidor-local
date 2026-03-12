import express, { type Request, type Response } from "express";
import { adicionarservico, listarServicos, apagarServico, obterServico } from "./servico.js";
import { calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, selecionarServicos, selecionarPrestador } from "./orcamento.js";
import { getUserByid, getUsers } from "./users.js";

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

    const selecionarServicoResponse = selecionarServicos(nome as string)
    res.json(selecionarServicoResponse)
})


// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrca = calcularOrcamento(pedido)

    res.json(calcularOrca)
})

//rota para selecionar prestadores
app.post("/criar-prestador", (req: Request, res: Response) => {
    //pegar o corpo de requisicao com os dados do novo prestador
    const { nome } = req.body
    const criarPrestadorResponse = criarPrestadoresDeServico(nome)

    res.json(criarPrestadorResponse)
})

//rota para editar prestador
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador, novosDadosDoPrestador } = req.body

    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)
    res.json(editarPrestadorResponse)
})


//selecionar todos os utilizadores presentes na base de dados 
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()

    res.json(getUsersResponse);
})
// selecionar um utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query

    if (id) {
        const getUserByidResponse = await getUserByid(id as string)

        if (!getUserByidResponse) {
            res.status(404).json({
                status: "erro",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        res.status(200).json({
            status: "success",
            menssage: "utilizador encontrado",
            data: getUserByidResponse
        })

    }
})




app.listen(8080, () => {
    console.log("servidor running on port 8080");
});


