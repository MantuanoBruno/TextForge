import express from "express";
import cors from "cors";
import textAnalysisRoutes from "./modules/text-analysis/text-analysis.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import { errorHandler } from "./shared/middlewares/error-handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/analyze/text", textAnalysisRoutes);
app.use("/upload", uploadRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  return res.json({
    message: "API running",
  });
});

export default app;
