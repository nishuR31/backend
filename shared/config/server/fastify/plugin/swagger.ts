import swagger from "@fastify/swagger";
import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(swagger, {
        openapi: {
            info: {
                title: "Test Swagger",
                description: "Testing Swagger API",
                version: "1.0.0",
            },

            externalDocs: {
                url: "https://swagger.io",
                description: "For more information, go to swagger.io",
            },

            consumes: ["application/json"],
            produces: ["application/json"],

            tags: [
                {
                    name: "user",
                    description: "User-related endpoints",
                },
            ],
        },
    });
});