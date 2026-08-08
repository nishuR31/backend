import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { registerPlugins } from "./plugin";
import { sendError, sendSuccess } from "../../../utils/response";


export const app = fastify({
    logger: true,
});
await registerPlugins(app);

app.get("/", (req: FastifyRequest, res: FastifyReply) => {
    return sendSuccess(undefined, res, "Server is up", 200, { uptime: process.uptime() })
})

app.setErrorHandler((err: any, req: FastifyRequest, res: FastifyReply) => {
    return sendError(undefined, res, `Error occured: ${err.message}`, 500)
})

export default app;
