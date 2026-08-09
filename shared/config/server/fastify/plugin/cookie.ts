import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance, options: FastifyCookieOptions = {}) => {
    await app.register(cookie, options);
})
