import cors, { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance, options: FastifyCorsOptions = {}) => {
    await app.register(cors, options);
});