import rateLimit from "express-rate-limit";
import type { Options as RateLimitOptions } from "express-rate-limit";
import type { Express } from "express";

export default function rateLimitPlugin(
    app: Express,
    options?: RateLimitOptions,
) {
    app.use(rateLimit(options));
}