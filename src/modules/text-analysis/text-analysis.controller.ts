import { Request, Response } from "express";
import { analyzeText } from "./text-analysis.service";

export function analyzeTextController(req: Request, res: Response) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  const result = analyzeText(text);

  return res.json(result);
}
