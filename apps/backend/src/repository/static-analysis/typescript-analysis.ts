import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { TypeScriptAnalysis } from "./analysis.types.js";

const SUPPORTED_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
]);

interface Counters {
  anyUsages: number;
  unknownUsages: number;
  typeAssertions: number;
  tsIgnoreCount: number;
  eslintDisableCount: number;
}

function countMatches(
  text: string,
  regex: RegExp,
): number {
  return text.match(regex)?.length ?? 0;
}

export function buildTypeScriptAnalysis(
  files: RepositoryFile[],
): TypeScriptAnalysis {
  const counters: Counters = {
    anyUsages: 0,
    unknownUsages: 0,
    typeAssertions: 0,
    tsIgnoreCount: 0,
    eslintDisableCount: 0,
  };

  for (const file of files) {
    const extension = path.extname(
      file.relativePath,
    ).toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      continue;
    }

    const content = file.content;

    counters.anyUsages += countMatches(
      content,
      /\bany\b/g,
    );

    counters.unknownUsages += countMatches(
      content,
      /\bunknown\b/g,
    );

    counters.typeAssertions += countMatches(
      content,
      /\bas\s+[A-Za-z0-9_<>{}\[\]|,& ]+/g,
    );

    counters.tsIgnoreCount += countMatches(
      content,
      /@ts-ignore/g,
    );

    counters.eslintDisableCount += countMatches(
      content,
      /eslint-disable/g,
    );
  }

  return {
    anyUsages: counters.anyUsages,
    unknownUsages: counters.unknownUsages,
    typeAssertions: counters.typeAssertions,
    tsIgnoreCount: counters.tsIgnoreCount,
    eslintDisableCount:
      counters.eslintDisableCount,
  };
}