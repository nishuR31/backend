import { memoryClient, memoryTimeClient } from "./memory";
import nodeRedisClient from "./nodeRedis";
import redisClient from "./redis";
import Cached from "./cache";
import upstashClient from "./upstash";

export default { memoryClient, Cached, memoryTimeClient, nodeRedisClient, redisClient, upstashClient };
export { memoryClient, memoryTimeClient, Cached, nodeRedisClient, redisClient, upstashClient };
