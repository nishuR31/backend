// prisma.ts

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const clients = new Map<string, PrismaClient>();
const pools = new Map<string, Pool>();

export function createPrismaClient(databaseUrl: string): PrismaClient {
    const existing = clients.get(databaseUrl);

    if (existing) {
        return existing;
    }

    const pool = new Pool({
        connectionString: databaseUrl,

        max: 20,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 10_000,
    });

    const adapter = new PrismaPg(pool);

    const prismaClient = new PrismaClient({
        adapter,

        log:
            process.env.NODE_ENV === "development"
                ? ["query", "warn", "error"]
                : ["error"],
    });

    clients.set(databaseUrl, prismaClient);
    pools.set(databaseUrl, pool);

    return prismaClient;
}

export async function graceFullShutdown(databaseUrl: string) {
    const prisma = clients.get(databaseUrl);
    const pool = pools.get(databaseUrl);

    if (prisma) {
        await prisma.$disconnect();
        clients.delete(databaseUrl);
    }

    if (pool) {
        await pool.end();
        pools.delete(databaseUrl);
    }
}

export async function disconnectAllPrisma() {
    await Promise.all(
        [...clients.values()].map((client) => client.$disconnect())
    );

    await Promise.all(
        [...pools.values()].map((pool) => pool.end())
    );

    clients.clear();
    pools.clear();
}