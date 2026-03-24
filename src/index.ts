import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";

const app = express();
app.use(express.json());

app.use("/services", serviceRouter);

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});