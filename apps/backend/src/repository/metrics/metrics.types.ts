import type { RepositoryFile } from "../../types/repository.js";

/**
 * Statistics for a particular programming language.
 */
export interface LanguageMetrics {
  language: string;
  files: number;
  linesOfCode: number;
}

/**
 * Summary statistics about repository files.
 */
export interface FileMetrics {
  totalFiles: number;
  totalSizeBytes: number;
  averageFileSizeBytes: number;
  largestFiles: RepositoryFile[];
  smallestFiles: RepositoryFile[];
  largestFile?: RepositoryFile;
  smallestFile?: RepositoryFile;
}

/**
 * Counts of engineering annotations.
 */
export interface AnnotationMetrics {
  todoCount: number;
  fixmeCount: number;
  hackCount: number;
  xxxCount: number;
}

/**
 * Statistics related to repository structure.
 */
export interface DirectoryMetrics {
  totalDirectories: number;
  emptyDirectories: string[];
  deepestDirectory: string;
  maximumDepth: number;
  averageDepth: number;
  largestDirectory: string;
  largestDirectoryFileCount: number;
}

/**
 * Repository documentation files.
 */
export interface DocumentationMetrics {
  readmeFiles: string[];
  changelogFiles: string[];
  contributingFiles: string[];
  licenseFiles: string[];
}

/**
 * Repository code metrics.
 */
export interface CodeMetrics {
  totalLinesOfCode: number;

  sourceLinesOfCode: number;

  blankLines: number;

  commentLines: number;
}

/**
 * Complete repository metrics.
 *
 * This object contains only objective, measurable facts.
 * AI interpretation happens later.
 */
export interface RepositoryMetrics {
  languages: LanguageMetrics[];

  files: FileMetrics;

  annotations: AnnotationMetrics;

  directories: DirectoryMetrics;

  documentation: DocumentationMetrics;

  code: CodeMetrics;
}