import mysqlClient, { graceFullShutdown as mysqlGraceFullShutdown } from "./mysql";
import neonDbClient, { graceFullShutdown as neonGraceFullShutdown } from "./neondb";
import {
    disconnectAllPrisma,
    graceFullShutdown as prismaGraceFullShutdown,
    createPrismaClient,
} from "./prismaClient";

export {
    mysqlClient,
    neonDbClient,
    mysqlGraceFullShutdown,
    neonGraceFullShutdown,
    disconnectAllPrisma,
    prismaGraceFullShutdown,
    createPrismaClient,
};
