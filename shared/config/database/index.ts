import mysqlClient, { graceFullShutdown as mysqlGraceFullShutdown } from "./mysql";
import neonDbClient, { graceFullShutdown as neonGraceFullShutdown } from "./neondb";
import {
    disconnectAllPrisma,
    graceFullShutdown as prismaGraceFullShutdown,
    createPrismaClient,
} from "./prismaClient";

export default {
    mysqlClient,
    neonDbClient,
    mysqlGraceFullShutdown,
    neonGraceFullShutdown,
    disconnectAllPrisma,
    prismaGraceFullShutdown,
    createPrismaClient,
};
export {
    mysqlClient,
    neonDbClient,
    mysqlGraceFullShutdown,
    neonGraceFullShutdown,
    disconnectAllPrisma,
    prismaGraceFullShutdown,
    createPrismaClient,
};
