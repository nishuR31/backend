import database from "../../shared/config/database";
import env from "./env";

const databaseUrl = env.DATABASE_URL!;
const prismaClient = database.createPrismaClient(databaseUrl);

database.prismaGraceFullShutdown(databaseUrl);

export default prismaClient;
