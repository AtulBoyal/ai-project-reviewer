import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "RepoInsight-AI Backend",
  });
});

export default router;