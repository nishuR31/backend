import formbody from "@fastify/formbody"

import fp from "fastify-plugin";

export default fp(async (app) => {
    await app.register(formbody, {
        bodyLimit: 1_048_576,

    });
})