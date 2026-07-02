import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";

import type {
  DuplicateAnalysis,
  DuplicateFile,
} from "./analysis.types.js";

/**
 * Detects duplicate filenames inside a repository.
 *
 * Example:
 *  src/api/index.ts
 *  src/web/index.ts
 *
 * counts as a duplicate filename.
 */
export function buildDuplicateAnalysis(
  files: RepositoryFile[],
): DuplicateAnalysis {
  const counts = new Map<string, number>();

  for (const file of files) {
    const fileName = path.basename(file.relativePath);

    counts.set(
      fileName,
      (counts.get(fileName) ?? 0) + 1,
    );
  }

  const duplicateFiles: DuplicateFile[] = [];

  for (const [fileName, count] of counts) {
    if (count > 1) {
      duplicateFiles.push({fileName, occurrences: count});
    }
  }

  duplicateFiles.sort((a,b) => a.fileName.localeCompare(b.fileName),);

  return {
    duplicateFiles,
    duplicateFileCount: duplicateFiles.length,
  };
}