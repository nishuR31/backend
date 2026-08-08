import jwt, { Secret } from "jsonwebtoken";

// Types
export interface JwtPayload {
    id?: string;
    email?: string;
    role?: string;
    iat?: number;
    exp?: number;
}

export interface TokenPair {
    accessToken?: string;
    refreshToken?: string;
}

// Token generation
export function generateTokenPair(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
): TokenPair {
    const accessToken = generateAccessToken(payload, secret, expiresIn);
    const refreshToken = generateRefreshToken(payload, secret, expiresIn);
    return { accessToken, refreshToken };
}

export function generateAccessToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
): string {
    return jwt.sign(payload, secret as Secret, { expiresIn } as jwt.SignOptions);
}

export function generateRefreshToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
): string {
    return jwt.sign(payload, secret as Secret, { expiresIn } as jwt.SignOptions);
}

export function generateToken(paylaod: JwtPayload, secret: string, expiresIn: string): string {
    return jwt.sign(paylaod, secret, { expiresIn } as jwt.SignOptions);
}

// Storage helpers (TTL in seconds)
export async function storeRefreshToken(
    userId: string,
    refreshToken: string,
    ttlSeconds: number = 7 * 24 * 60 * 60,
    redis?: any,
) {
    await redis?.setex(`refresh:${userId}`, ttlSeconds, refreshToken);
}

export async function storeToken(
    userId: string,
    token: string,
    ttlSeconds: number = 7 * 24 * 60 * 60,
    options: { mode: "access" | "refresh" },
    redis?: any,
) {
    const prefix = options.mode === "access" ? "access" : "refresh";
    await redis?.setex(`${prefix}:${userId}`, ttlSeconds, token);
}

// Blacklist handling
export async function blacklistToken(token: string, secret: string, redis?: any) {
    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload | null;
        if (!decoded?.exp) return;
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await redis?.setex(`blacklist:${token}`, ttl, "1");
    } catch {}
}

export async function blacklistTokens(token: string, secret: string, redis?: any) {
    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload | null;
        if (!decoded?.exp) return;
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await redis?.setex(`blacklist:${token}`, ttl, "1");
    } catch {}
}

export async function removeRefreshToken(userId: string, redis?: any) {
    await redis?.del(`refresh:${userId}`);
}

export async function removeAccessToken(userId: string, redis?: any) {
    await redis?.del(`access:${userId}`);
}

// Verification
export async function verifyAccessToken(
    token: string,
    secret: string,
    redis?: any,
): Promise<JwtPayload> {
    const isBlacklisted = await redis?.get(`blacklist:${token}`);
    if (isBlacklisted) throw new Error("Token has been revoked");
    return jwt.verify(token, secret) as JwtPayload;
}

export async function verifyRefreshToken(
    token: string,
    secret: string,
    redis?: any,
): Promise<JwtPayload> {
    const isBlacklisted = await redis?.get(`blacklist:${token}`);
    if (isBlacklisted) throw new Error("Token has been revoked");
    return jwt.verify(token, secret) as JwtPayload;
}

export async function getStoredRefreshToken(userId: string, redis?: any): Promise<string | null> {
    return redis?.get(`refresh:${userId}`) ?? null;
}
