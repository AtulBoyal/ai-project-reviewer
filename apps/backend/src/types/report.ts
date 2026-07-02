import type {
  EngineeringReport,
} from "../../../backend/src/ai/report/report.types.js";

export interface AnalysisResponse {
  report: EngineeringReport;

  markdown: string;

  trace: {
    durationMs: number;

    repaired: boolean;

    repairAttempts: number;

    model: string;
  };
}