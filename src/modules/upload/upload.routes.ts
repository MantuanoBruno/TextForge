import { Router } from "express";
import { upload } from "./upload.middleware";
import { uploadTextFileController } from "./upload.controller";

const router = Router();

router.post("/", upload.single("file"), uploadTextFileController);

export default router;
