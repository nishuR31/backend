import helmet, { HelmetOptions } from "helmet";
import { Express } from "express";

export default function helmetPlugin(app: Express, options?: HelmetOptions) {
    app.use(helmet(options))
};