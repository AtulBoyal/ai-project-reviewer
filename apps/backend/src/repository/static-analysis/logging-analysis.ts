import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { LoggingAnalysis } from "./analysis.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

interface Counters {
  consoleLogCount: number;
  consoleErrorCount: number;
  consoleWarnCount: number;
  debuggerCount: number;
  processExitCount: number;
}

/**
 * Counts regex matches inside text.
 */
function countMatches(
  text: string,
  regex: RegExp,
): number {
  return text.match(regex)?.length ?? 0;
}

/**
 * Performs repository-wide logging analysis.
 */
export function buildLoggingAnalysis(
  files: RepositoryFile[],
): LoggingAnalysis {
  const counters: Counters = {
    consoleLogCount: 0,
    consoleErrorCount: 0,
    consoleWarnCount: 0,
    debuggerCount: 0,
    processExitCount: 0,
  };

  for (const file of files) {
    const extension = path.extname(
      file.relativePath,
    ).toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      continue;
    }

    const content = file.content;

    counters.consoleLogCount += countMatches(
      content,
      /\bconsole\.log\s*\(/g,
    );

    counters.consoleErrorCount += countMatches(
      content,
      /\bconsole\.error\s*\(/g,
    );

    counters.consoleWarnCount += countMatches(
      content,
      /\bconsole\.warn\s*\(/g,
    );

    counters.debuggerCount += countMatches(
      content,
      /\bdebugger\b/g,
    );

    counters.processExitCount += countMatches(
      content,
      /\bprocess\.exit\s*\(/g,
    );
  }

  return {
    consoleLogCount: counters.consoleLogCount,
    consoleErrorCount: counters.consoleErrorCount,
    consoleWarnCount: counters.consoleWarnCount,
    debuggerCount: counters.debuggerCount,
    processExitCount: counters.processExitCount,
  };
}