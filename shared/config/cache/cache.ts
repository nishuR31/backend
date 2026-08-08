import Redis from "ioredis";
import { memoryClient, memoryTimeClient } from "./memory";
import nodeRedisClient from "./nodeRedis";
import redisClient from "./redis";
import upstashClient from "./upstash";

type CachedClientTypes = "redis" | "nodeRedis" | "upstash" | "memory";

export default class Cached {
    private client:
        Redis | typeof upstashClient | typeof nodeRedisClient | typeof memoryClient | any;

    constructor(
        provider: CachedClientTypes = "redis",
        client: any | undefined = null,
        url?: string,
        options?: any,
        token?: string,
    ) {
        if (client) {
            this.client = client;
        }
        else {
            if (provider) {
                switch (provider) {
                    case "redis":
                        this.client = redisClient({
                            url: url!,
                            ...options,
                        });
                        break;
                    case "nodeRedis":
                        this.client = nodeRedisClient({
                            url: url!,
                            ...options,
                        });
                        break;
                    case "upstash":
                        this.client = upstashClient({
                            url: url!,
                            token: token!,
                        });
                        break;
                    case "memory":
                        this.client = memoryClient();
                        break;
                }
            }
        }
    }
    async get(key: string) {
        if (this.client instanceof Map) {
            const storedTime = memoryTimeClient().get(key);
            if (storedTime) {
                if (Date.now() >= storedTime) {
                    this.client.delete(key);
                    memoryTimeClient().delete(key);
                    return null;
                }
            }
            return JSON.parse(this.client.get(key));
        }
        return await JSON.parse(this.client.get(key));
    }

    async set(key: string, value: any, ttl?: number) {
        value = JSON.stringify(value);
        if (this.client instanceof Map) {
            this.client.set(key, value);
            if (ttl) {
                memoryTimeClient().set(key, Date.now() + ttl);
            }
            return "OK";
        }
        if (ttl) {
            await this.client.set(key, value, ttl);
            return "OK";
        }
        await this.client.set(key, value);
        return "OK";
    }

    async setex(key: string, value: any, ttl: number) {
        value = JSON.stringify(value);
        await this.set(key, value, ttl!);
        return "OK";
    }

    async del(key: string) {
        if (this.client instanceof Map) {
            this.client.delete(key);
            memoryTimeClient().delete(key);
            return "DEL";
        }
        await this.client.del(key);
        return "DEL";
    }

    async flushall() {
        if (this.client instanceof Map) {
            this.client.clear();
            memoryTimeClient().clear();
            return "FLUSH";
        }
        await this.client.flushall();
        return "FLUSH";
    }

    async connect() {
        if (this.client instanceof Map) {
            return "CONNECTED In-Memory";
        }
        await this.client.connect();
        return "CONNECTED";
    }

    async disconnect() {
        if (this.client instanceof Map) {
            this.client = null;
            return "DISCONNECTED In-Memory";
        }
        await this.client.disconnect();
        return "DISCONNECTED";
    }

    async ping() {
        if (this.client instanceof Map) {
            return "PONG";
        }
        return await this.client.ping();
    }

    async info() {
        if (this.client instanceof Map) {
            return "In-Memory Cache";
        }
        return await this.client.info();
    }
}
