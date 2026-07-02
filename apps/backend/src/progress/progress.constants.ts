import type {
  AnalysisProgress,
  AnalysisStage,
} from "./progress.types.js";

export const ANALYSIS_PROGRESS: Record<
  AnalysisStage,
  AnalysisProgress
> = {
  IDLE: {
    stage: "IDLE",
    message: "Waiting...",
    percentage: 0,
    updatedAt: Date.now(),
  },

  UPLOADING: {
    stage: "UPLOADING",
    message: "Uploading repository...",
    percentage: 5,
    updatedAt: Date.now(),
  },

  EXTRACTING: {
    stage: "EXTRACTING",
    message: "Extracting ZIP archive...",
    percentage: 15,
    updatedAt: Date.now(),
  },

  READING_REPOSITORY: {
    stage: "READING_REPOSITORY",
    message: "Reading repository...",
    percentage: 30,
    updatedAt: Date.now(),
  },

  BUILDING_METADATA: {
    stage: "BUILDING_METADATA",
    message: "Building repository metadata...",
    percentage: 45,
    updatedAt: Date.now(),
  },

  STATIC_ANALYSIS: {
    stage: "STATIC_ANALYSIS",
    message: "Running static analysis...",
    percentage: 60,
    updatedAt: Date.now(),
  },

  BUILDING_AI_CONTEXT: {
    stage: "BUILDING_AI_CONTEXT",
    message: "Preparing AI context...",
    percentage: 70,
    updatedAt: Date.now(),
  },

  AI_REVIEW: {
    stage: "AI_REVIEW",
    message:
      "AI is reviewing your repository. This is usually the longest step.",
    percentage: 80,
    updatedAt: Date.now(),
  },

  VALIDATING_RESPONSE: {
    stage: "VALIDATING_RESPONSE",
    message: "Validating AI response...",
    percentage: 90,
    updatedAt: Date.now(),
  },

  GENERATING_MARKDOWN: {
    stage: "GENERATING_MARKDOWN",
    message: "Generating engineering report...",
    percentage: 96,
    updatedAt: Date.now(),
  },

  COMPLETED: {
    stage: "COMPLETED",
    message: "Analysis completed.",
    percentage: 100,
    updatedAt: Date.now(),
  },

  FAILED: {
    stage: "FAILED",
    message: "Analysis failed.",
    percentage: 100,
    updatedAt: Date.now(),
  },
};