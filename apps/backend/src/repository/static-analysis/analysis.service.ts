import type { RepositoryFile } from "../../types/repository.js";

import type { StaticAnalysis } from "./analysis.types.js";

import { buildDuplicateAnalysis } from "./duplicate-analysis.js";
import { buildFunctionAnalysis } from "./function-analysis.js";
import { buildLoggingAnalysis } from "./logging-analysis.js";
import { buildTestAnalysis } from "./test-analysis.js";
import { buildTypeScriptAnalysis } from "./typescript-analysis.js";

/**
 * Builds the complete static analysis for a repository.
 *
 * This service orchestrates all static analyzers and combines
 * their results into a single object consumed by the AI layer.
 */
export function buildStaticAnalysis(
  files: RepositoryFile[],
): StaticAnalysis {
  const functions =
    buildFunctionAnalysis(files);

  const typescript =
    buildTypeScriptAnalysis(files);

  const logging =
    buildLoggingAnalysis(files);

  const tests =
    buildTestAnalysis(files);

  const duplicates =
    buildDuplicateAnalysis(files);

  const totalWarnings =
    typescript.anyUsages +
    typescript.tsIgnoreCount +
    logging.debuggerCount +
    logging.processExitCount +
    duplicates.duplicateFileCount;

  let totalRecommendations = 0;

  if (functions.functionsOver100Lines > 0) {
    totalRecommendations++;
  }

  if (functions.functionsOver50Lines > 0) {
    totalRecommendations++;
  }

  if (typescript.anyUsages > 0) {
    totalRecommendations++;
  }

  if (typescript.tsIgnoreCount > 0) {
    totalRecommendations++;
  }

  if (logging.consoleLogCount > 10) {
    totalRecommendations++;
  }

  if (logging.debuggerCount > 0) {
    totalRecommendations++;
  }

  if (tests.testFiles === 0) {
    totalRecommendations++;
  }

  if (duplicates.duplicateFileCount > 0) {
    totalRecommendations++;
  }

  return {
    functions,
    typescript,
    logging,
    tests,
    duplicates,
    summary: {
      totalWarnings,
      totalRecommendations,
    },
  };
}