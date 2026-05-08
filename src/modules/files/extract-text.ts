import path from "path";
import { extractTxtText } from "./txt-extractor";
import { extractDocxText } from "./docx-extractor";
import { extractPdfText } from "./pdf-extractor";
import { extractTextFromImage } from "../ocr/ocr.service";

export async function extractTextFromFile(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".txt":
      return extractTxtText(filePath);

    case ".pdf":
      return extractPdfText(filePath);

    case ".docx":
      return extractDocxText(filePath);

    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".webp":
    case ".bpm":
    case ".tiff":
      return extractTextFromImage(filePath);

    default:
      throw new Error("Unsupported file type");
  }
}
