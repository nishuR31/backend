import swaggerJSDoc, {
    type Options as SwaggerJSDocOptions,
} from "swagger-jsdoc";
import swaggerUi, {
    type SwaggerUiOptions,
} from "swagger-ui-express";
import type { Express, Request, Response } from "express";

export interface SwaggerOptions {
    swagger?: SwaggerJSDocOptions;
    ui?: SwaggerUiOptions;
    routePrefix?: string;
    jsonRoute?: string;
}

export default function swaggerPlugin(
    app: Express,
    options: SwaggerOptions = {},
) {
    const {
        swagger = {},
        ui = {},
        routePrefix = "/docs",
        jsonRoute = "/api-docs.json",
    } = options;

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

            ...swagger.definition,
        },

        apis: [
            "./src/features/**/*.ts",
            ...(swagger.apis ?? []),
        ],

        ...swagger,
    });

    app.use(
        routePrefix,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, ui),
    );

    app.get(
        jsonRoute,
        (_req: Request, res: Response) => {
            res.json(swaggerSpec);
        },
    );
}