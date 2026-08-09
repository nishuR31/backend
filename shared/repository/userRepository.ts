import BaseRepository from "./baseRepository";

export default class UserRepository extends BaseRepository {
  constructor(prisma: any, modelName: string) {
    super(prisma, modelName);
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.findOne({ email });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<any> {
    return this.update(userId, { refreshToken });
  }

  async updateLastLogin(userId: string): Promise<any> {
    return this.update(userId, { lastLogin: new Date() });
  }

  async updateTotpSecret(
    userId: string,
    totpSecret: string | null,
    isTotpEnabled: boolean,
  ): Promise<any> {
    return this.update(userId, { totpSecret, isTotpEnabled });
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<any> {
    return this.update(userId, { avatarUrl });
  }

  async deactivateUser(userId: string): Promise<any> {
    return this.update(userId, { isActive: false });
  }

  async activateUser(userId: string): Promise<any> {
    return this.update(userId, { isActive: true });
  }
}
