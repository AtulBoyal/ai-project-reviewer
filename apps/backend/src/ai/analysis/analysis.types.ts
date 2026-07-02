import type { RepositoryMetadata } from "../../types/repository.js";
import type { EngineeringReport } from "../report/report.types.js";
import type { GenerationTrace } from "../trace/trace.types.js";

export interface AnalysisRequest {
  metadata: RepositoryMetadata;
}

export interface AnalysisResult {
  report: EngineeringReport;
  markdown: string;
  trace: GenerationTrace;
}