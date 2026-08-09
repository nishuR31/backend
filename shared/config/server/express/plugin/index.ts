import type { Options as RateLimitOptions } from "express-rate-limit";
import type { Express } from "express";
import { Server } from "node:http";
import corsPluginExpress from "./cors";
import compressPluginExpress from "./compress";
import cookiePluginExpress from "./cookie";
import helmetPluginExpress from "./helmet";
import rateLimitPluginExpress from "./rateLimit";
import swaggerPluginExpress from "./swagger";
import websocketPluginExpress from "./ws";
import { CorsOptions } from "cors";
import { HelmetOptions } from "helmet";
import { SwaggerOptions } from "swagger-ui-express";
import { CompressionOptions } from "compression";
import { CookieParseOptions } from "cookie-parser";



export async function corsPlugin(app: Express, options?: CorsOptions) {
    await corsPluginExpress(app, options)
}
export async function helmetPlugin(app: Express, options?: HelmetOptions) {
    await helmetPluginExpress(app, options)
}
export async function swaggerPlugin(app: Express, options?: SwaggerOptions) {
    await swaggerPluginExpress(app, options)
}
export async function websocketPlugin(server: Server) {
    await websocketPluginExpress(server)
}
export async function compressPlugin(app: Express, options?: CompressionOptions) {
    await compressPluginExpress(app, options as CompressionOptions)
}
export async function cookiePlugin(app: Express, secret?: string | string[],
    options?: CookieParseOptions) {
    await cookiePluginExpress(app, secret, options)
}
export async function rateLimitPlugin(app: Express, options?: RateLimitOptions) {
    await rateLimitPluginExpress(app, options)
}
