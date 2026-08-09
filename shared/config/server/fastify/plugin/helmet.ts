import helmet, { FastifyHelmetOptions } from "@fastify/helmet";
import fp from "fastify-plugin";

export default fp(async (app, options: FastifyHelmetOptions = {}) => {
    await app.register(helmet, options);
})