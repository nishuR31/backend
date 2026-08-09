import swaggerUi, { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance, options: FastifySwaggerUiOptions = {}) => {
    await app.register(swaggerUi, options);
});