import {
  AppError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors";

function handlePrismaError(client: any, error: any, modelName: string, operation: string): never {
  if (error instanceof client.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new NotFoundError(`${modelName} required for ${operation} not found.`);
    }
    if (error.code === "P2002") {
      const field = error.meta?.target ? (error.meta.target as string[]).join(", ") : "";

      throw new ConflictError(
        `Conflict: A record with this unique field ${field} already exists.`,
      );
    }
    if (error.code === "P2023") {
      throw new NotFoundError(`Invalid ID format supplied for ${modelName}`);
    }
  }
  throw new InternalServerError(
    `[Prisma Failure]: Failed ${operation} ${modelName} due to server error.`,
  );
}

export default class BaseRepository<T = any> {
  // protected modelName: string;
  protected model: any;
  constructor(
    protected prisma: any,
    protected modelName: string) {
    if (!modelName || typeof modelName !== "string") {
      throw new AppError(
        `A ${modelName} model name(string) is required for BaseRepository. `,
      );
    }
    this.modelName = modelName;
    this.model = this.prisma[modelName];

    if (!this.model || typeof this.model.findUnique !== "function") {
      throw new NotFoundError(`${modelName} not found or is invalid in Prisma Client.`);
    }
  }
  async create(data: any, options: any = {}): Promise<T> {
    try {
      return await this.model.create({ data, ...options });
    } catch (error) {
      handlePrismaError(this.prisma, error, this.modelName, "creation");
    }
  }

  async createMany(data: any[], options: any = {}): Promise<boolean> {
    try {
      await this.model.createMany({ data, ...options })
      return true;
    }
    catch (error) {
      handlePrismaError(this.model, error, this.modelName, "creation many");
    }
  }

  async findById(userId: string, options: any = {}) {
    try {
      const record = await this.model.findUnique({
        where: { id: userId },
        ...options,
      });
      if (!record) {
        throw new NotFoundError(`${this.modelName} with ID ${userId} not found`);
      }
      return record;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      handlePrismaError(this.model, error, this.modelName, "fetching");
    }
  }
  async findOne(where: any, options: any = {}): Promise<T | null> {
    try {
      return await this.model.findFirst({ where, ...options });
    } catch (error) {
      handlePrismaError(this.model, error, this.modelName, "fetching one");
    }
  }

  async findByEmailOrUsername(identifier: string, options: any = {}): Promise<T | null> {
    try {
      return await this.model.findFirst({
        where: {
          OR: [
            { email: identifier },
            { username: identifier },
          ],
        },
        ...options,
      });
    } catch (error) {
      handlePrismaError(this.model, error, this.modelName, "fetching one by email or username");
    }
  }


  async findAll(options: any = {}): Promise<T[]> {
    try {
      return await this.model.findMany({ ...options });
    } catch (error) {
      handlePrismaError(this.model, error, this.modelName, "fetching all");
    }
  }

  async update(id: string, data: any, options: any = {}): Promise<T> {
    try {
      return await this.model.update({ where: { id }, data, ...options });
    } catch (error) {
      handlePrismaError(this.model, error, this.modelName, "updating");
    }
  }

  async updateMany(ids: string[], data: any, options: any = {}): Promise<boolean> {
    try {
      for (let id in ids) {
        await this.model.update({ where: { id }, data, ...options });
      }
      return true;
    }
    catch (error) {
      handlePrismaError(this.model, error, this.modelName, "updating many");
    }
  }

  async delete(id: string, options: any = {}): Promise<boolean> {
    try {
      await this.model.delete({ where: { id }, ...options });
      return true;
    } catch (error) {
      handlePrismaError(this.model, error, this.modelName, "deleting");
    }
  }

  async deleteAll(options: any = {}): Promise<boolean> {
    try {
      await this.model.deleteMany({ ...options });
      return true;
    }
    catch (error) { handlePrismaError(this.model, error, this.modelName, "deleteing all") }

  }
}
