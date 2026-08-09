import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { rateLimitPlugin } from "./plugin";
import { sendError, sendSuccess } from "../../../utils/response";


export const app = fastify({
    logger: true,
});


app.get("/date", (req, res) => {
    sendSuccess(undefined, res, new Date().toLocaleString(), 200)
})
app.get("/", (req: FastifyRequest, res: FastifyReply) => {
    return sendSuccess(undefined, res, "Server is up", 200, { uptime: process.uptime() })
})

app.setErrorHandler((err: any, req: FastifyRequest, res: FastifyReply) => {
    return sendError(undefined, res, `Error occured: ${err.message}`, 500)
})




export default app;
