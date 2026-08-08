import { Redis, type RedisOptions } from "ioredis";

type RedisClientOptions = {
    url: string;
} & RedisOptions;

const redisClient = ({ url, ...options }: RedisClientOptions) => {
    if (!url) {
        throw new Error("Redis connectionString is missing or not found");
    }
    return new Redis(url, {
        ...options,
    });
};

export default redisClient;
