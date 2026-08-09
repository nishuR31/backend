import swagger, { FastifySwaggerOptions } from "@fastify/swagger";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance, options: any | FastifySwaggerOptions = {}) => {
    await app.register(swagger, options);
});