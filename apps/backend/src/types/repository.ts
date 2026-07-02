import type { RepositoryEvidence } from "../repository/evidence/evidence.types.js";
import type { RepositoryMetrics } from "../repository/metrics/metrics.types.js";
import type { StaticAnalysis } from "../repository/static-analysis/analysis.types.js";

export type RepositoryEntryType = "file" | "directory";

export interface RepositoryEntry {
  id: string;
  name: string;
  relativePath: string;
  absolutePath: string;
  type: RepositoryEntryType;
  size: number;
}

export interface RepositoryTree {
  rootPath: string;
  files: RepositoryEntry[];
  directories: RepositoryEntry[];
  totalFiles: number;
  totalDirectories: number;
}

export interface RepositoryFile extends RepositoryEntry {
  content: string;
  size: number;
  truncated: boolean;
}

export interface IgnoredRepositoryFile extends RepositoryEntry {
  reason: "directory" | "extension" | "size";
}

export interface FilteredRepository {
  rootPath: string;
  files: RepositoryEntry[];
  ignoredFiles: IgnoredRepositoryFile[];
}

export interface RepositoryFile extends RepositoryEntry {
  content: string;
  size: number;
}

export interface RepositoryContent {
  rootPath: string;
  files: RepositoryFile[];
}

export interface RepositoryMetadata {
  repositoryName: string;

  totalFiles: number;
  totalDirectories: number;

  languages: string[];
  frameworks: string[];

  configurationFiles: string[];

  hasReadme: boolean;
  hasDockerfile: boolean;
  hasPackageJson: boolean;

  largestFiles: RepositoryFile[];

  metrics: RepositoryMetrics;

  staticAnalysis: StaticAnalysis;

  evidence: RepositoryEvidence;

  repository: RepositoryContent;
}
