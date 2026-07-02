import path from "node:path";
import os from "node:os";

import { processRepository } from "../repository/repository-processor.service.js";
import { progressService } from "../progress/progress.service.js";
import { analyzeRepository } from "../ai/analysis/ai-analysis.service.js";

import type { AnalysisResult } from "../ai/analysis/analysis.types.js";

export async function analyzeUploadedRepository(
  zipFilePath: string,
): Promise<AnalysisResult> {
  progressService.setStage("EXTRACTING");

  const extractionDirectory = path.join(
    os.tmpdir(),
    `repository-${Date.now()}`,
  );

  progressService.setStage(
    "READING_REPOSITORY",
  );

  const metadata = await processRepository(
    zipFilePath,
    extractionDirectory,
  );

  const result = await analyzeRepository({
    metadata,
  });

  progressService.setStage("COMPLETED");

  return result;
}