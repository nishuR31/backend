import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const env = {
    DATABASE_URL: process.env.DATABASE_URL || "",
    REDIS_URL1: process.env.REDIS_URL1 || "",
    REDIS_URL2: process.env.REDIS_URL2 || "",
    MAIL_HOST: process.env.MAIL_HOST || "",
    MAIL_PORT: process.env.MAIL_PORT || "",
    MAIL_USER: process.env.MAIL_USER || "",
    MAIL_PASS: process.env.MAIL_PASS || "",
};

export default env;
