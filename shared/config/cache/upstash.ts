import { Redis } from "@upstash/redis";

interface UpstashClientOptions {
    url: string;
    token: string;
}

const upstashClient = ({ url, token }: UpstashClientOptions) => {
    if (!url) {
        throw new Error("Redis connectionString is missing or not found");
    }
    return new Redis({ url, token });
};
export default upstashClient;
