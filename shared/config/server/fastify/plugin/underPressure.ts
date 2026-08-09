import underPressure, { FastifyUnderPressureOptions } from "@fastify/under-pressure";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance, options: FastifyUnderPressureOptions = {}) => {
    await app.register(underPressure, options);
});