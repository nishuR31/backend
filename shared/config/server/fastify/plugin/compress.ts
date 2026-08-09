import compress, { FastifyCompressOptions } from "@fastify/compress";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance, options: FastifyCompressOptions = {}) => {
    await app.register(compress, options);
})
