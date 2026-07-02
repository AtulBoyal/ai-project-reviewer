import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { FunctionAnalysis } from "./analysis.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
]);

/**
 * Very lightweight heuristic that determines whether
 * a line looks like a function declaration.
 */
function looksLikeFunction(line: string): boolean {
  const trimmed = line.trim();

  return (
    /^function\s+\w+/.test(trimmed) ||
    /^\w+\s*\([^)]*\)\s*\{?$/.test(trimmed) ||
    /^\w+\s*=\s*\([^)]*\)\s*=>/.test(trimmed) ||
    /^\w+\s*:\s*\([^)]*\)\s*=>/.test(trimmed) ||
    /^export\s+function/.test(trimmed) ||
    /^export\s+default\s+function/.test(trimmed) ||
    /^async\s+function/.test(trimmed)
  );
}

/**
 * Computes the approximate size of a function by tracking braces.
 */
function measureFunctions(
  content: string,
): number[] {
  const lines = content.split(/\r?\n/);

  const lengths: number[] = [];

  let insideFunction = false;

  let braceDepth = 0;

  let currentLength = 0;

  for (const line of lines) {
    if (!insideFunction && looksLikeFunction(line)) {
      insideFunction = true;
      currentLength = 1;

      braceDepth =
        (line.match(/\{/g)?.length ?? 0) -
        (line.match(/\}/g)?.length ?? 0);

      continue;
    }

    if (!insideFunction) {
      continue;
    }

    currentLength++;

    braceDepth +=
      (line.match(/\{/g)?.length ?? 0);

    braceDepth -=
      (line.match(/\}/g)?.length ?? 0);

    if (braceDepth <= 0) {
      lengths.push(currentLength);

      insideFunction = false;

      currentLength = 0;

      braceDepth = 0;
    }
  }

  return lengths;
}

/**
 * Performs repository-wide function analysis.
 */
export function buildFunctionAnalysis(
  files: RepositoryFile[],
): FunctionAnalysis {
  const functionLengths: number[] = [];

  for (const file of files) {
    const extension = path.extname(
      file.relativePath,
    );

    if (
      !SUPPORTED_EXTENSIONS.has(
        extension.toLowerCase(),
      )
    ) {
      continue;
    }

    functionLengths.push(
      ...measureFunctions(file.content),
    );
  }

  const totalFunctions =
    functionLengths.length;

  const longestFunctionLines =
    functionLengths.length === 0
      ? 0
      : Math.max(...functionLengths);

  const averageFunctionLength =
    functionLengths.length === 0
      ? 0
      : Number(
          (
            functionLengths.reduce(
              (sum, value) => sum + value,
              0,
            ) / functionLengths.length
          ).toFixed(1),
        );

  const functionsOver50Lines =
    functionLengths.filter(
      (length) => length > 50,
    ).length;

  const functionsOver100Lines =
    functionLengths.filter(
      (length) => length > 100,
    ).length;

  return {
    totalFunctions,
    averageFunctionLength,
    longestFunctionLines,
    functionsOver50Lines,
    functionsOver100Lines,
  };
}