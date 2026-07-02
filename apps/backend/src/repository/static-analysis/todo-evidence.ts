import type { RepositoryFile } from "../../types/repository.js";

import type { AnnotationEvidence } from "../evidence/evidence.types.js";

interface Pattern {
  type: AnnotationEvidence["type"];
  regex: RegExp;
}

const PATTERNS: Pattern[] = [
  {
    type: "TODO",
    regex: /\bTODO\b/i,
  },
  {
    type: "FIXME",
    regex: /\bFIXME\b/i,
  },
  {
    type: "HACK",
    regex: /\bHACK\b/i,
  },
  {
    type: "XXX",
    regex: /\bXXX\b/i,
  },
];

function getSeverity(
  type: AnnotationEvidence["type"],
): AnnotationEvidence["severity"] {
  switch (type) {
    case "FIXME":
      return "High";

    case "HACK":
      return "High";

    case "TODO":
      return "Medium";

    case "XXX":
      return "Low";
  }
}

/**
 * Extracts engineering annotations from the repository.
 *
 * Examples:
 *
 * // TODO: Refactor this
 * // FIXME: Handle null values
 * // HACK: Temporary workaround
 */
export function buildAnnotationEvidence(
  files: RepositoryFile[],
): AnnotationEvidence[] {
  const evidence: AnnotationEvidence[] = [];

  for (const file of files) {
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
          text: line.trim(),
          severity: getSeverity(pattern.type),
        });

        break;
      }
    }
  }

  return evidence;
}