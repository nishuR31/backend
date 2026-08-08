import express, { type Express } from "express";
import { registerPlugins } from "./plugin";
import { sendError, sendSuccess } from "../../../utils/response";

const app: Express = express();

registerPlugins(app, {
    cors: true,
    helmet: true,
    cookie: true,
    rateLimit: true,
    compress: true,
    websocket: false,
    swagger: true,
});

app.get("/", (req: Express.Request, res: Express.Response) => {
    return sendSuccess("express", res, "Server up", 200, { uptime: process.uptime() })
})

app.use((err: any, req: Express.Request, res: Express.Response, next: any) => {
    return sendError("express", res, `Error occured: ${err.message}`, 500)
})

export default app;
