import path from "node:path";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Servidor Local",
            description: "Plataforma de gestao de servicos de um servidor local.",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "dev",
            },
        ],
    },
    apis: [
        path.join(process.cwd(), "src/docs/schemas/*.yaml"),
        path.join(process.cwd(), "src/docs/paths/*.yaml"),
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
