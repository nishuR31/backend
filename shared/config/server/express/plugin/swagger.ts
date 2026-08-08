import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Backend API",
            description: "Backend API documentation",
            version: "1.0.0",
        },

        tags: [
            {
                name: "user",
                description: "User-related endpoints",
            },
        ],

        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },

    apis: [
        "./src/features/**/*.ts",
    ],
});

export default function swagger(app: Express) {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec),
    );
    app.get("/api-docs.json", (req: Express.Request, res: any) => {
        res.send(swaggerSpec);
    })
}