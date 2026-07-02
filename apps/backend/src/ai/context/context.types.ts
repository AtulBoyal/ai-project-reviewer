import type { RepositoryEvidence } from "../../repository/evidence/evidence.types.js";
import type { RepositoryMetrics } from "../../repository/metrics/metrics.types.js";
import type { StaticAnalysis } from "../../repository/static-analysis/analysis.types.js";

export interface AnalysisContext {
  repository: RepositoryContext;
  technologies: TechnologyContext;
  structure: StructureContext;
  metrics: RepositoryMetrics;
  staticAnalysis: StaticAnalysis;
  evidence: RepositoryEvidence;
  files: FileContext;
}

export interface RepositoryContext {
  name: string;
  totalFiles: number;
  totalDirectories: number;
}

export interface TechnologyContext {
  languages: string[];
  frameworks: string[];
}

export interface StructureContext {
  configurationFiles: string[];
  importantDirectories: string[];
}

export interface ContextFile {
    path: string;
    language: string;
    content: string;
}

export interface FileContext {
  files: ContextFile[];
}
