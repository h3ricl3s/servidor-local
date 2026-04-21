import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacao.route.js";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";  
import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./graphql/index.js";
import { expressMiddleware } from "@as-integrations/express5";

const app = express()
app.use(express.json())

dotenv.config();

app.use("/services", serviceRouter);
app.use("/users", usersRouter);
app.use("/prestadores", prestadorRouter);
app.use("/orcamentos", orcamentoRouter);
app.use("/propostas", propostaRouter);
app.use("/prestacao-servico", prestacaoServicoRouter);


app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const graphqlServer = new ApolloServer({
   typeDefs,
   resolvers
})
await graphqlServer.start()
app.use("/graphql",
    expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
        })
    })
)

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
