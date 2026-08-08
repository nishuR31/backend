import corsPluginFastify from "./cors";
import compressPluginFastify from "./compress";
import cookiePluginFastify from "./cookie";
import formBodyPluginFastify from "./formBody";
import helmetPluginFastify from "./helmet";
import rateLimitPluginFastify from "./rateLimit";
import sensiblePluginFastify from "./sensible";
import swaggerPluginFastify from "./swagger";
import swaggerUiPluginFastify from "./swaggerUi";
import underPressurePluginFastify from "./underPressure";
import websocketPluginFastify from "./websocket";
import type { FastifyInstance } from "fastify";

type Plugins = {
    cors?: boolean;
    formBody?: boolean;
    swagger?: boolean;
    swaggerUi?: boolean;
    underPressure?: boolean;
    websocket?: boolean;
    helmet?: boolean;
    cookie?: boolean;
    sensible?: boolean;
    rateLimit?: boolean;
    compress?: boolean;
}


export async function corsPlugin(app: FastifyInstance) {
    await app.register(corsPluginFastify)
}
export async function formBodyPlugin(app: FastifyInstance) {
    await app.register(formBodyPluginFastify)
}
export async function swaggerPlugin(app: FastifyInstance) {
    await app.register(swaggerPluginFastify)
}
export async function swaggerUiPlugin(app: FastifyInstance) {
    await app.register(swaggerUiPluginFastify)
}
export async function underPressurePlugin(app: FastifyInstance) {
    await app.register(underPressurePluginFastify)
}
export async function websocketPlugin(app: FastifyInstance) {
    await app.register(websocketPluginFastify)
}
export async function helmetPlugin(app: FastifyInstance) {
    await app.register(helmetPluginFastify)
}
export async function cookiePlugin(app: FastifyInstance) {
    await app.register(cookiePluginFastify)
}
export async function sensiblePlugin(app: FastifyInstance) {
    await app.register(sensiblePluginFastify)
}
export async function rateLimitPlugin(app: FastifyInstance) {
    await app.register(rateLimitPluginFastify)
}
export async function compressPlugin(app: FastifyInstance) {
    await app.register(compressPluginFastify)
}



export async function registerPlugins(app: FastifyInstance,
    plugins: Plugins = {}) {
    plugins.cors && await app.register(corsPluginFastify);
    plugins.formBody && await app.register(formBodyPluginFastify);
    plugins.swagger && await app.register(swaggerPluginFastify);
    plugins.swaggerUi && await app.register(swaggerUiPluginFastify);
    plugins.underPressure && await app.register(underPressurePluginFastify);
    plugins.websocket && await app.register(websocketPluginFastify);
    plugins.helmet && await app.register(helmetPluginFastify);
    plugins.cookie && await app.register(cookiePluginFastify);
    plugins.sensible && await app.register(sensiblePluginFastify);
    plugins.rateLimit && await app.register(rateLimitPluginFastify);
    plugins.compress && await app.register(compressPluginFastify);
}