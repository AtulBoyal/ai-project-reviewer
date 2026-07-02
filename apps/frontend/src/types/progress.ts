export type AnalysisStage =
  | "IDLE"
  | "UPLOADING"
  | "EXTRACTING"
  | "READING_REPOSITORY"
  | "BUILDING_METADATA"
  | "STATIC_ANALYSIS"
  | "BUILDING_AI_CONTEXT"
  | "AI_REVIEW"
  | "VALIDATING_RESPONSE"
  | "GENERATING_MARKDOWN"
  | "COMPLETED"
  | "FAILED";

export interface AnalysisProgress {
  stage: AnalysisStage;
  message: string;
  percentage: number;
}