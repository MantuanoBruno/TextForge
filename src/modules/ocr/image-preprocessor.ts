import sharp from "sharp";

export async function preprocessImage(inputPath: string, outputPath: string) {
  await sharp(inputPath)
    .resize({
      width: 2000,
    })
    .grayscale()
    .normalize()
    .sharpen()
    .toFile(outputPath);

  return outputPath;
}
