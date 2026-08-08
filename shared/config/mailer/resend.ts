import { Resend } from "resend";

interface resendOptions {
    apiKey: string;
}

export const resendClient = ({ apiKey }: resendOptions) => new Resend(apiKey);
