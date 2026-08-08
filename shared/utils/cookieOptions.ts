interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    framework?: "fastify" | "express" | undefined;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    type: "access" | "refresh";
    maxAge?: number;
    domain?: string;
}

export default function createCookieOptions({
    httpOnly = true,
    secure = true,
    sameSite = "lax",
    path = "/",
    domain,
    type = "access",
    framework = "fastify",
}: CookieOptions) {
    return {
        httpOnly,
        secure,
        sameSite,
        path,
        maxAge:
            type === "access"
                ? 60 * 60 * 24 * 7 * (framework == "fastify" ? 1000 : 1)
                : 60 * 60 * 24 * 15 * (framework == "fastify" ? 1000 : 1),
        domain,
    };
}

export function setAuthCookies(
    res: any,
    accessToken: string,
    refreshToken: string,
    framework: "fastify" | "express" | undefined = "fastify",
) {
    if (framework == "fastify") {
        res.setCookie(
            "accessToken",
            accessToken,
            createCookieOptions({ type: "access", framework }),
        );
        res.setCookie(
            "refreshToken",
            refreshToken,
            createCookieOptions({ type: "refresh", framework }),
        );
    } else if (framework == "express") {
        res.cookie("accessToken", accessToken, createCookieOptions({ type: "access", framework }));
        res.cookie(
            "refreshToken",
            refreshToken,
            createCookieOptions({ type: "refresh", framework }),
        );
    }
}
