import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type { TestAnalysis } from "./analysis.types.js";

const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".java",
  ".py",
  ".go",
  ".rs",
  ".cpp",
  ".c",
  ".cs",
]);

function isSourceFile(file: RepositoryFile): boolean {
  const extension = path.extname(
    file.relativePath,
  ).toLowerCase();

  return SOURCE_EXTENSIONS.has(extension);
}

function isTestFile(file: RepositoryFile): boolean {
  const normalized =
    file.relativePath.toLowerCase();

  return (
    normalized.includes("__tests__") ||
    normalized.endsWith(".test.ts") ||
    normalized.endsWith(".test.tsx") ||
    normalized.endsWith(".test.js") ||
    normalized.endsWith(".test.jsx") ||
    normalized.endsWith(".spec.ts") ||
    normalized.endsWith(".spec.tsx") ||
    normalized.endsWith(".spec.js") ||
    normalized.endsWith(".spec.jsx")
  );
}

export function buildTestAnalysis(
  files: RepositoryFile[],
): TestAnalysis {
  let sourceFiles = 0;

  let testFiles = 0;

  let hasJest = false;

  let hasVitest = false;

  for (const file of files) {
    if (isSourceFile(file)) {
      sourceFiles++;
    }

    if (isTestFile(file)) {
      testFiles++;
    }

    if (
      file.name === "package.json" &&
      file.content.includes("jest")
    ) {
      hasJest = true;
    }

    if (
      file.name === "package.json" &&
      file.content.includes("vitest")
    ) {
      hasVitest = true;
    }
  }

  const testCoverageRatio =
    sourceFiles === 0
      ? 0
      : Number(
          (
            (testFiles / sourceFiles) *
            100
          ).toFixed(1),
        );

  return {
    sourceFiles,
    testFiles,
    testCoverageRatio,
    hasJest,
    hasVitest,
  };
}