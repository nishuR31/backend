import rateLimit, { RateLimitOptions } from "@fastify/rate-limit";
import fp from "fastify-plugin";



export default fp(async (app, options: RateLimitOptions = {}) => {
    await app.register(rateLimit, options)

})
