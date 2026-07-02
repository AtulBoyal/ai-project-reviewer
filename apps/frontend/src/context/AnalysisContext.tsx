import { createContext } from "react";

import type { AnalyzeRepositoryResponse } from "../types/report";

export interface AnalysisContextValue {
  loading: boolean;

  error: string;

  result: AnalyzeRepositoryResponse | null;

  analyze(file: File): Promise<void>;

  reset(): void;
}

export const AnalysisContext =
  createContext<AnalysisContextValue | null>(
    null,
  );