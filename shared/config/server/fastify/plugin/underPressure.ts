import underPressure from "@fastify/under-pressure";
import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(underPressure, {
        maxEventLoopDelay: 2000,
        maxHeapUsedBytes: 1024 * 1024 * 512,
        maxRssBytes: 1024 * 1024 * 400,
        maxEventLoopUtilization: 0.9,
    });
});