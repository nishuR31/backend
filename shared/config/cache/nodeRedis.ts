import { createClient, type SetOptions } from "redis";

type NodeClientOptions = {
    url: string;
} & SetOptions;


const nodeRedisClient = ({ url, ...options }: NodeClientOptions) => {
    if (!url) {
        throw new Error("Redis connectionString is missing or not found");
    }
    return createClient({
        url,
        ...options,
    });
};

export default nodeRedisClient;
