import express from "express";
import cors from "cors";
import textAnalysisRoutes from "./modules/text-analysis/text-analysis.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/analyze/text", textAnalysisRoutes);

app.get("/", (req, res) => {
  return res.json({
    message: "API running",
  });
});

export default app;
