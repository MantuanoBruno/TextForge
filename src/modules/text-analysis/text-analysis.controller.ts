import { Request, Response } from "express";

import { analyzeText } from "./text-analysis.service";
import { analyzeTextSchema } from "./text-analysis.schema";

export function analyzeTextController(req: Request, res: Response) {
  const validation = analyzeTextSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.flatten(),
    });
  }

  const { text, removeStopwords } = validation.data;

  const result = analyzeText(text);

  return res.json(result);
}
