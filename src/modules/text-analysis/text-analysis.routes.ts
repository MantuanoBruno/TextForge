import { Router } from "express";
import { analyzeTextController } from "./text-analysis.controller";

const router = Router();

router.post("/", analyzeTextController);

export default router;
