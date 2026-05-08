import fs from "fs/promises";

export async function extractTxtText(filePath: string) {
  return fs.readFile(filePath, "utf-8");
}
