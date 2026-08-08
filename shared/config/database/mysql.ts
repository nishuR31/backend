import mysql from "mysql2/promise";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

interface MysqlClientOptions {
    url: string;
    connectionLimit?: number;
    options?: typeof mysql;
}

const clients = new Map<string, mysql.Pool>();
const pools = new Map<string, mysql.Pool>();

const mysqlClient = ({ url, connectionLimit, options }: MysqlClientOptions) => {
    if (!url) {
        throw new Error("URL not found");
    }
    const existing = clients.get(url);
    if (existing) {
        return existing;
    }
    const pool = mysql.createPool({
        uri: url,
        connectionLimit: connectionLimit ?? 20,
        ...options,
    });
    return new PrismaMariaDb(pool);
};

export default mysqlClient;

export async function graceFullShutdown() {
    await Promise.all([...clients.values()].map((pool) => pool.end()));
    clients.clear();
}
