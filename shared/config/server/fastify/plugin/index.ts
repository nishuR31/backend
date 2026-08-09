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
import { RateLimitOptions } from "@fastify/rate-limit";
import { FastifySensibleOptions } from "@fastify/sensible";
import { FastifyCookieOptions } from "@fastify/cookie";
import { FastifyHelmetOptions } from "@fastify/helmet";
import { FastifyUnderPressureOptions } from "@fastify/under-pressure";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifySwaggerOptions } from "@fastify/swagger";
import { FastifyFormbodyOptions } from "@fastify/formbody";
import { FastifyCorsOptions } from "@fastify/cors";
import { FastifyCompressOptions } from "@fastify/compress";

export async function corsPlugin(app: FastifyInstance, options: FastifyCorsOptions) {
    await corsPluginFastify(app, options)
}
export async function formBodyPlugin(app: FastifyInstance, options: FastifyFormbodyOptions) {
    await formBodyPluginFastify(app, options)
}
export async function swaggerPlugin(app: FastifyInstance, options: FastifySwaggerOptions) {
    await swaggerPluginFastify(app, options)
}
export async function swaggerUiPlugin(app: FastifyInstance, options: FastifySwaggerUiOptions) {
    await swaggerUiPluginFastify(app, options)
}
export async function underPressurePlugin(app: FastifyInstance, options: FastifyUnderPressureOptions) {
    await underPressurePluginFastify(app, options)
}
export async function websocketPlugin(app: FastifyInstance) {
    await websocketPluginFastify(app)
}
export async function helmetPlugin(app: FastifyInstance, options: FastifyHelmetOptions) {
    await helmetPluginFastify(app, options)
}
export async function cookiePlugin(app: FastifyInstance, options: FastifyCookieOptions) {
    await cookiePluginFastify(app, options)
}
export async function sensiblePlugin(app: FastifyInstance, options: FastifySensibleOptions) {
    await sensiblePluginFastify(app, options)
}
export async function rateLimitPlugin(app: FastifyInstance, options: RateLimitOptions) {
    await rateLimitPluginFastify(app, options)
}
export async function compressPlugin(app: FastifyInstance, options: FastifyCompressOptions) {
    await compressPluginFastify(app, options)
}
