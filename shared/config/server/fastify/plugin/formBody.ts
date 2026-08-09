import formbody, { FastifyFormbodyOptions } from "@fastify/formbody"

import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance, options: FastifyFormbodyOptions = {}) => {
    await app.register(formbody, options);
})