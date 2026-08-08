import { sendError } from "./response";

export default function asyncHandler(fn: any) {
    return (req: any, res: any) => {
        Promise.resolve(fn(req, res)).catch((err: Error) => {
            sendError(undefined, res, err.message, 500, err);
        });
    };
}

export async function handler(fn: any): Promise<any> {
    try {
        return await fn();
    } catch (err: any) {
        throw new Error(err.message);
    }
}
