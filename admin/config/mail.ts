import mailer from "../../shared/config/mailer";
import env from "./env";

const host = env.MAIL_HOST;
const port = env.MAIL_PORT;
const user = env.MAIL_USER;
const pass = env.MAIL_PASS;

const transporter = mailer.transporter({ host, port: Number(port), secure: true, auth: { pass, user } })

export default transporter; 