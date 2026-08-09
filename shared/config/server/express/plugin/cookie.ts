import cookieParser from "cookie-parser";
import type { Express } from "express";
import type { CookieParseOptions } from "cookie-parser";

export default function cookiePlugin(
    app: Express,
    secret?: string | string[],
    options?: CookieParseOptions,
) {
    app.use(cookieParser(secret, options));
}