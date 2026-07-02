/**
 * Every major stage of repository analysis.
 *
 * The backend emits these stages so the frontend
 * can display real progress instead of fake timers.
 */
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

  /**
   * Human readable message.
   */
  message: string;

  /**
   * Percentage shown on UI.
   */
  percentage: number;

  /**
   * Last update time.
   */
  updatedAt: number;
}