import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { FunctionEvidence } from "./evidence.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

/**
 * Attempts to extract a function name from a line.
 */
function extractFunctionName(
  line: string,
): string {
  const trimmed = line.trim();

  let match =
    trimmed.match(
      /^export\s+default\s+function\s+([A-Za-z0-9_$]+)/,
    ) ??
    trimmed.match(
      /^export\s+function\s+([A-Za-z0-9_$]+)/,
    ) ??
    trimmed.match(
      /^async\s+function\s+([A-Za-z0-9_$]+)/,
    ) ??
    trimmed.match(
      /^function\s+([A-Za-z0-9_$]+)/,
    );

  if (match) {
    return match[1];
  }

  match =
    trimmed.match(
      /^const\s+([A-Za-z0-9_$]+)\s*=\s*/,
    ) ??
    trimmed.match(
      /^let\s+([A-Za-z0-9_$]+)\s*=\s*/,
    ) ??
    trimmed.match(
      /^var\s+([A-Za-z0-9_$]+)\s*=\s*/,
    );

  if (match) {
    return match[1];
  }

  return "anonymous";
}

/**
 * Determines whether a line probably starts a function.
 */
function isFunctionStart(
  line: string,
): boolean {
  const trimmed = line.trim();

  return (
    /^function\s+/.test(trimmed) ||
    /^export\s+function/.test(trimmed) ||
    /^export\s+default\s+function/.test(trimmed) ||
    /^async\s+function/.test(trimmed) ||
    /^const\s+\w+\s*=.*=>/.test(trimmed) ||
    /^let\s+\w+\s*=.*=>/.test(trimmed) ||
    /^var\s+\w+\s*=.*=>/.test(trimmed)
  );
}

/**
 * Extracts approximate function locations.
 */
export function buildFunctionEvidence(
  files: RepositoryFile[],
): FunctionEvidence[] {
  const evidence: FunctionEvidence[] = [];

  for (const file of files) {
    const extension = path
      .extname(file.relativePath)
      .toLowerCase();

    if (
      !SUPPORTED_EXTENSIONS.has(extension)
    ) {
      continue;
    }

    const lines =
      file.content.split(/\r?\n/);

    let insideFunction = false;

    let braceDepth = 0;

    let startLine = 0;

    let length = 0;

    let name = "anonymous";

    for (
      let index = 0;
      index < lines.length;
      index++
    ) {
      const line = lines[index];

      if (
        !insideFunction &&
        isFunctionStart(line)
      ) {
        insideFunction = true;

        startLine = index + 1;

        length = 1;

        name =
          extractFunctionName(line);

        braceDepth =
          (line.match(/\{/g)?.length ??
            0) -
          (line.match(/\}/g)?.length ??
            0);

        continue;
      }

      if (!insideFunction) {
        continue;
      }

      length++;

      braceDepth +=
        line.match(/\{/g)?.length ??
        0;

      braceDepth -=
        line.match(/\}/g)?.length ??
        0;

      if (braceDepth <= 0) {
        evidence.push({
          file: file.relativePath,

          line: startLine,

          name,

          length,
        });

        insideFunction = false;

        braceDepth = 0;

        length = 0;
      }
    }
  }

  return evidence.sort(
    (a, b) => b.length - a.length,
  );
}