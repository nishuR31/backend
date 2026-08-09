import compression, { CompressionOptions } from "compression";
import { Express } from "express";

export default function compressPlugin(app: Express, options: CompressionOptions) {
    app.use(compression(options))
};