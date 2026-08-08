import { createClient, type ClientOptions } from "redis";

interface NodeClientOptions {
    url: string;
    options?: ClientOptions;
}

const nodeRedisClient = ({ url, options }: NodeClientOptions) => {
    if (!url) {
        throw new Error("Redis connectionString is missing or not found");
    }
    return createClient({
        url,
        ...options,
    });
};

export default nodeRedisClient;
