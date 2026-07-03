import { Router } from "express";

import { upload } from "../http/multer.js";
import { analyzeUploadedRepository } from "../application/repository-analysis.service.js";
import { RepositoryTooLargeError } from "../repository/errors/RepositoryTooLargeError.js";
import { progressService } from "../progress/progress.service.js";
import { logger } from "../logger/logger.service.js";
import multer from "multer";

const router = Router();

router.post(
  "/analyze",
  upload.single("repository"),
  async (req, res) => {
    progressService.startNewAnalysis();

    await logger.startSession();

    await logger.info(
      "Repository analysis started",
    );
    
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No ZIP file uploaded.",
        });
      }

      const result = await analyzeUploadedRepository(
        req.file.path,
      );

      return res.status(200).json({
        success: true,
        report: result.report,
        markdown: result.markdown,
      });
    } catch (error) {
      console.error("========== ANALYZE ERROR ==========");
      console.error(error);
      console.error("===================================");

      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            message:
              "Repository ZIP is too large. Maximum allowed size is 50 MB.",
          });
        }

        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      if (
        error instanceof RepositoryTooLargeError
      ) {
        return res.status(413).json({
          success: false,

          error: "REPOSITORY_TOO_LARGE",

          message:
            "Repository exceeds the maximum supported analyzable source code size.",

          analyzableSizeMB: Number(
            (error.size / 1024 / 1024).toFixed(1),
          ),

          limitMB: Number(
            (error.limit / 1024 / 1024).toFixed(0),
          ),
        });
      }

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal server error.",
      });
    }
  },
);

export default router;