import cache, { Cached } from "../../shared/config/cache";
import env from "./env";

const connectionUrl1 = env.REDIS_URL1!;
const connectionUrl2 = env.REDIS_URL2!;

const redis1 = cache.redisClient({
    url: connectionUrl1,
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (time) => {
        return Math.min(time * 50, 2000);
    },
});

const redis2 = cache.redisClient({
    url: connectionUrl2,
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy: (time) => {
        return Math.min(time * 50, 2000);
    },
});
const cacheManager = new Cached("redis", redis1);

export default { redis1, redis2, cacheManager };
export { redis1, redis2, cacheManager };
