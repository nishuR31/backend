import sensible, { FastifySensibleOptions } from "@fastify/sensible"
import fp from "fastify-plugin";

export default fp(async (app, options: FastifySensibleOptions = {}) => {
    await app.register(sensible, options);
})  