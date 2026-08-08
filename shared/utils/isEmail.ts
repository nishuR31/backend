import z from "zod";

export function isEmail(identifier: string): { value: string; type: string } {
    identifier = identifier.trim().toLocaleLowerCase();
    return z.string().email().safeParse(identifier).success
        ? { value: identifier, type: "email" }
        : { value: identifier, type: "username" };
}
