import Tesseract from "tesseract.js";
import path from "path";
import { preprocessImage } from "./image-preprocessor";
import { deleteFile } from "../../shared/utils/delete-file";

export async function extractTextFromImage(imagePath: string) {
  const processedImagePath = path.join(
    "uploads",
    `processed-${Date.now()}.png`
  );
  try {
    await preprocessImage(imagePath, processedImagePath);

    const result = await Tesseract.recognize(
      imagePath,

      //idioma

      "por+eng",

      {
        logger: (info) => {
          console.log(info);
        },
      }
    );
    return result.data.text;
  } finally {
    await deleteFile(processedImagePath);
  }
}
