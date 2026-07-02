import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { LoggingEvidence } from "./evidence.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

interface Pattern {
  type: LoggingEvidence["type"];
  regex: RegExp;
}

const PATTERNS: Pattern[] = [
  {
    type: "console.log",
    regex: /\bconsole\.log\s*\(/,
  },
  {
    type: "console.error",
    regex: /\bconsole\.error\s*\(/,
  },
  {
    type: "console.warn",
    regex: /\bconsole\.warn\s*\(/,
  },
  {
    type: "debugger",
    regex: /\bdebugger\b/,
  },
  {
    type: "process.exit",
    regex: /\bprocess\.exit\s*\(/,
  },
];

/**
 * Extracts logging/debugging statements with their locations.
 */
export function buildLoggingEvidence(
  files: RepositoryFile[],
): LoggingEvidence[] {
  const evidence: LoggingEvidence[] = [];

  for (const file of files) {
    const extension = path
      .extname(file.relativePath)
      .toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      continue;
    }

    const lines = file.content.split(/\r?\n/);

    for (
      let index = 0;
      index < lines.length;
      index++
    ) {
      const line = lines[index];

      for (const pattern of PATTERNS) {
        if (!pattern.regex.test(line)) {
          continue;
        }

        evidence.push({
          file: file.relativePath,
          line: index + 1,
          type: pattern.type,
        });
      }
    }
  }

  return evidence;
}