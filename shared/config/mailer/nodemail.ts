import mailer from "nodemailer";

interface NodemailerOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
}

export const transporter = ({ host, port, secure, auth }: NodemailerOptions) =>
    new mailer({
        host: host,
        port: Number(port),
        secure: secure,
        auth: {
            user: auth.user,
            pass: auth.pass,
        },
    });
