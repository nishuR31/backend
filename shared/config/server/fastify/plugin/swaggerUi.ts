import swaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(swaggerUi, {
        routePrefix: "/docs",

        uiConfig: {
            docExpansion: "list",
            filter: true,
            persistAuthorization: false,
            deepLinking: true,
            displayRequestDuration: true,
        },

        theme: {
            title: "Backend API Documentation",
        },
    });
});