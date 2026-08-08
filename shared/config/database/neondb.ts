import { Pool } from "@neondatabase/serverless";

interface NeonClientOptions {
    url: string;
    options?: typeof Pool;
}

const clients = new Map<string, Pool>();

const neonDbClient = ({ url, options }: NeonClientOptions) => {
    const existing = clients.get(url);
    if (existing) {
        return existing;
    }
    if (!url) {
        throw new Error("URL not found");
    }
    const pool = new Pool({
        connectionString: url,
        ...options,
    });
    clients.set(url, pool);
    return pool;
};
export default neonDbClient;

export async function graceFullShutdown() {
    await Promise.all([...clients.values()].map((pool) => pool.end()));
    clients.clear();
}
