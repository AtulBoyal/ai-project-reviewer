import {
  ANALYSIS_PROGRESS,
} from "./progress.constants.js";

import type {
  AnalysisProgress,
  AnalysisStage,
} from "./progress.types.js";

/**
 * Tracks the current repository analysis stage.
 *
 * Version 1 stores progress in memory.
 * Later versions can publish updates using
 * Server-Sent Events without changing callers.
 */
class ProgressService { 
  private progress: AnalysisProgress = {
    ...ANALYSIS_PROGRESS.IDLE,
    updatedAt: Date.now(),
  };

  setStage(
    stage: AnalysisStage,
  ): void {
    this.progress = {
      ...ANALYSIS_PROGRESS[stage],
      updatedAt: Date.now(),
    };
  }

  getProgress(): AnalysisProgress {
    return this.progress;
  }

  reset(): void {
    this.progress = {
      ...ANALYSIS_PROGRESS.IDLE,
      updatedAt: Date.now(),
    };
  }
}

export const progressService =
  new ProgressService();