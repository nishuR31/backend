import rateLimit from "@fastify/rate-limit";
import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(rateLimit, {
        global: true,
        max: 10,
        timeWindow: 60000,
    })
})
