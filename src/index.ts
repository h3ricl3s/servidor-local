import express, { type Request, type Response } from "express";

import { adicionarservico, listarServicos, apagarServico, obterServico } from "./servico.js";

import { calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, selecionarServicos } from "./orcamento.js";

import { getUserByid, getUsers, createUser } from "./users.js";

import { type PrestadorType, type UserType } from "./utils/types.js";

const app = express();
app.use(express.json())

//teste
app.get("/hello", (req: Request, res: Response) => {
    console.log("hello world");
    res.send("hello world")
});


// adicionar serviço
app.post("/adicionar-servico", async (req: Request, res: Response) => {

    const servico = req.body

    if(!servico){
        res.status(400).json(
            {
                status: false,
                message: "Erro ao adicionar serviço",
                data:null
            }
        )
    }

    const AddServicoResponse = await adicionarservico(servico)

    res.json(AddServicoResponse)
})


// listar serviços
app.get("/listar-servico", (req: Request, res: Response) => {

    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})


// apagar serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {

    const { nome } = req.query

    if (!nome) {
        return res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }

    const apagarServicoResponse = apagarServico(nome as string)

    res.json(apagarServicoResponse)

})


// obter serviço
app.get("/obter-servico", (req: Request, res: Response) => {

    const { nome } = req.query

    if (!nome) {
        return res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }

    const obterServicoResponse = obterServico(nome as string)

    res.json(obterServicoResponse)

})


// selecionar serviço
app.post("/selecionar-servico", (req: Request, res: Response) => {

    const { nome } = req.body

    const selecionarServicoResponse = selecionarServicos(nome)

    res.json(selecionarServicoResponse)

})


// calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {

    const { pedido } = req.body

    const calcularOrca = calcularOrcamento(pedido)

    res.json(calcularOrca)

})


// criar prestador
app.post("/criar-prestador", async (req: Request, res: Response) => {
    const novoPrestador: PrestadorType = req.body
    if (!novoPrestador) {
        res.status(400).json(
            {
                status: "error",
                message: "Dados do prestadores invalidos",
                date: null
            }
        )
    }

    const criarPrestadorResponse = await criarPrestadoresDeServico(novoPrestador)

    res.json(criarPrestadorResponse)

})


// editar prestador
app.put("/editar-prestador", (req: Request, res: Response) => {

    const { nomeDoPrestador, novosDadosDoPrestador } = req.body

    const editarPrestadorResponse = editarPrestadorDeServico(
        nomeDoPrestador,
        novosDadosDoPrestador
    )

    res.json(editarPrestadorResponse)

})


// listar utilizadores
app.get("/get-users", async (req: Request, res: Response) => {

    const getUsersResponse = await getUsers()

    res.json(getUsersResponse)

})


// obter utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {

    const { id } = req.query

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "Id eh obrigatorio",
            data: null
        })
    }

    const getUserByidResponse = await getUserByid(id as string)

    if (!getUserByidResponse) {
        return res.status(404).json({
            status: "erro",
            message: "Utilizador nao encontrado",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Utilizador encontrado",
        data: getUserByidResponse
    })

})


// criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {

    const user: UserType = req.body

    if (!user) {
        return res.status(400).json({
            status: "erro",
            message: "Dados do utilizador invalido",
            data: null
        })
    }

    console.log(user)

    const createUserResponse = await createUser(user)

    res.json(createUserResponse)

})


app.listen(8080, () => {
    console.log("Servidor running on port 8080");
});