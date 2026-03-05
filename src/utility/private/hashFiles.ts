import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export function getFiles(dir: string): Array<string> {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }
    return [fullPath];
  });
}

function hashFiles(files: Array<string>): string {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(readFileSync(file));
  }
  return hash.digest("hex");
}

export default hashFiles;
