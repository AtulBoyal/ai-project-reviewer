import { Router } from "express";

import { progressService } from "../progress/progress.service.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(progressService.getProgress());
});

export default router;