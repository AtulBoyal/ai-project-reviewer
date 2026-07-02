import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { TypeScriptEvidence } from "./evidence.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
]);

interface Pattern {
  type: TypeScriptEvidence["type"];
  regex: RegExp;
}

const PATTERNS: Pattern[] = [
  {
    type: "any",
    regex: /\bany\b/,
  },
  {
    type: "unknown",
    regex: /\bunknown\b/,
  },
  {
    type: "ts-ignore",
    regex: /@ts-ignore/,
  },
  {
    type: "eslint-disable",
    regex: /eslint-disable/,
  },
  {
    type: "type-assertion",
    regex: /\bas\s+[A-Za-z0-9_<>{}\[\]|,& ]+/,
  },
];

/**
 * Extracts TypeScript-specific evidence from the repository.
 */
export function buildTypeScriptEvidence(
  files: RepositoryFile[],
): TypeScriptEvidence[] {
  const evidence: TypeScriptEvidence[] = [];

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