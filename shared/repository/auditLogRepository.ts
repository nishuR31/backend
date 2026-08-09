import BaseRepository from "./baseRepository";



export interface AuditLogEntry {
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  details?: Record<string, unknown>;
}

export default class AuditLogRepository extends BaseRepository {

  constructor(prisma: any, modelName: string) {
    super(prisma, modelName);
  }

  async logAction(entry: AuditLogEntry): Promise<any> {
    return this.create({
      action: entry.action,
      entity: entry.entity,
      entityId: entry.entityId,
      userId: entry.userId,
      details: entry.details || {},
    });
  }

  async findByEntity(entity: string, entityId: string): Promise<any[]> {
    return this.findAll({
      where: { entity, entityId },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  async findByUser(userId: string): Promise<any[]> {
    return this.findAll({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
