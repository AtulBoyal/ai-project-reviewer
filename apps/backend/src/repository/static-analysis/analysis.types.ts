/**
 * Statistics about functions discovered in the repository.
 */
export interface FunctionAnalysis {
  totalFunctions: number;

  averageFunctionLength: number;

  longestFunctionLines: number;

  functionsOver50Lines: number;

  functionsOver100Lines: number;
}

/**
 * TypeScript-specific statistics.
 */
export interface TypeScriptAnalysis {
  anyUsages: number;

  unknownUsages: number;

  typeAssertions: number;

  tsIgnoreCount: number;

  eslintDisableCount: number;
}

/**
 * Logging and debugging statements.
 */
export interface LoggingAnalysis {
  consoleLogCount: number;

  consoleErrorCount: number;

  consoleWarnCount: number;

  debuggerCount: number;

  processExitCount: number;
}

/**
 * Test coverage statistics.
 */
export interface TestAnalysis {
  sourceFiles: number;

  testFiles: number;

  testCoverageRatio: number;

  hasJest: boolean;

  hasVitest: boolean;
}

export interface DuplicateFile {
  fileName: string;

  occurrences: number;
}

/**
 * Duplicate filename statistics.
 */
export interface DuplicateAnalysis {
  duplicateFiles: DuplicateFile[];

  duplicateFileCount: number;
}

/**
 * Overall static analysis summary.
 */
export interface StaticAnalysisSummary {
  totalWarnings: number;

  totalRecommendations: number;
}

/**
 * Complete static analysis report.
 *
 * Contains objective engineering facts extracted
 * directly from the repository.
 */
export interface StaticAnalysis {
  functions: FunctionAnalysis;

  typescript: TypeScriptAnalysis;

  logging: LoggingAnalysis;

  tests: TestAnalysis;

  duplicates: DuplicateAnalysis;

  summary: StaticAnalysisSummary;
}