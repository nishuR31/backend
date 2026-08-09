import websocket from "@fastify/websocket"
import { FastifyInstance } from "fastify";

import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
    await app.register(websocket);
});