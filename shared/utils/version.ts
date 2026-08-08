import fs from "node:fs";

const currentVersion = (path: string) => JSON.parse(fs.readFileSync(path, "utf-8")).version;

export default currentVersion;
