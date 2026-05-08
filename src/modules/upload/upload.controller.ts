import { Request, Response } from "express";
import { processTextFile } from "./upload.service";
import { deleteFile } from "../../shared/utils/delete-file";

export async function uploadTextFileController(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({
      error: "File is required",
    });
  }

  try {
    const result = await processTextFile(req.file.path);

    return res.json(result);
  } finally {
    await deleteFile(req.file.path);
  }
}
