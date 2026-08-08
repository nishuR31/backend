export function sendSuccess(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Successfully executed!",
    statusCode: number,
    payload: Record<string, any> | string | number | boolean | null,
    details?: Record<string, any>,
) {
    if (res.sent) return res;
    if (type == "fastify") {
        return res.code(statusCode).send({
            success: true,
            message,
            payload,
            details,
        });
    } else if (type == "express") {
        return res.status(statusCode).send({
            success: true,
            message,
            payload,
            details,
        });
    }
}

export function sendError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Something Broke!",
    statusCode: number = 500,
    errors?: any,
) {
    if (res.sent) return res;
    if (type == "fastify") {
        return res.code(statusCode).send({
            success: false,
            message,
            errors,
        });
    } else if (type == "express") {
        return res.status(statusCode).send({
            success: false,
            message,
            errors,
        });
    }
}

export function notFoundError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Resource not found",
    statusCode: number = 404,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function conflictError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Resource already exists",
    statusCode: number = 409,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function badRequestError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Invalid request",
    statusCode: number = 400,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function unauthorizedError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Unauthorized access",
    statusCode: number = 401,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function forbiddenError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Forbidden",
    statusCode: number = 403,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function paymentRequiredError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Payment required",
    statusCode: number = 402,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function redirectionError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Redirecting to login page",
    statusCode: number = 302,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function rateLimitError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Rate limit exceeded",
    statusCode: number = 429,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function internalServerError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Internal server error",
    statusCode: number = 500,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}

export function methodNotAllowedError(
    type: "fastify" | "express" | undefined = "fastify",
    res: any,
    message: string = "Method not allowed",
    statusCode: number = 405,
    errors?: Record<string, any>,
) {
    return sendError(type, res, message, statusCode, errors);
}
