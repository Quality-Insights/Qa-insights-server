import fs from "fs";

export async function ensureExists(path: string) {
  const exists = fs.existsSync(path);
  if (!exists) {
    fs.mkdirSync(path, { recursive: true });
  }
}
