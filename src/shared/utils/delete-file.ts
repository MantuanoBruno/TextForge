import fs from "fs/promises";

export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`failed to delete file: ${filePath}`);
  }
}
