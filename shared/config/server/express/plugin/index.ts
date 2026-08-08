import type { Express } from "express";
import { Server } from "node:http";
import corsPluginExpress from "./cors";
import compressPluginExpress from "./compress";
import cookiePluginExpress from "./cookie";
import helmetPluginExpress from "./helmet";
import rateLimitPluginExpress from "./rateLimit";
import swaggerPluginExpress from "./swagger";
import websocketPluginExpress from "./ws";


interface Plugins {
    cors: boolean;
    swagger: boolean;
    websocket: boolean;
    helmet: boolean;
    cookie: boolean;
    rateLimit: boolean;
    compress: boolean;
}

export function corsPlugin(app: Express) {
    app.use(corsPluginExpress)
}
export function helmetPlugin(app: Express) {
    app.use(helmetPluginExpress)
}
export function swaggerPlugin(app: Express) {
    swaggerPluginExpress(app)
}

export function websocketPlugin(server: Server) {
    websocketPluginExpress(server)
}
export function compressPlugin(app: Express) {
    app.use(compressPluginExpress)
}
export function cookiePlugin(app: Express) {
    app.use(cookiePluginExpress)
}
export function rateLimitPlugin(app: Express) {
    app.use(rateLimitPluginExpress)
}

export function registerPlugins(
    app: Express,
    plugins: Plugins,
    server?: Server
) {
    plugins.cors && app.use(corsPluginExpress);
    plugins.helmet && app.use(helmetPluginExpress);
    plugins.cookie && app.use(cookiePluginExpress);
    plugins.rateLimit && app.use(rateLimitPluginExpress);
    plugins.compress && app.use(compressPluginExpress);
    plugins.websocket && websocketPluginExpress(server!);
    plugins.swagger && swaggerPluginExpress(app);

}