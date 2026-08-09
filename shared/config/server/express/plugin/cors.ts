import cors, { CorsOptions } from "cors";
import { Express } from "express";
export default function corsPlugin(app: Express, options?: CorsOptions) {
    app.use(cors(options))
};