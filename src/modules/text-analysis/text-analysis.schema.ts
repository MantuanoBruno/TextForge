import { z } from "zod";

export const analyzeTextSchema = z.object({
  text: z.string().min(1, "Text cannot be empty").max(50000, "Text too large"),

  removeStopwords: z.boolean().optional(),
});
