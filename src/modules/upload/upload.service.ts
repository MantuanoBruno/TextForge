import fs from "fs/promises";
import { analyzeText } from "../text-analysis/text-analysis.service";
import { extractTextFromFile } from "../files/extract-text";

export async function processTextFile(filePath: string) {
  const content = await extractTextFromFile(filePath);

  return analyzeText(content);
}
