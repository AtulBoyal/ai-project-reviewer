import type { RepositoryFile } from "../../types/repository.js";
import type { FileMetrics } from "./metrics.types.js";

/**
 * Sorts files from largest to smallest.
 */
function sortBySize(
  first: RepositoryFile,
  second: RepositoryFile,
): number {
  return second.size - first.size;
}

/**
 * Computes repository file statistics.
 */
export function buildFileMetrics(
  files: RepositoryFile[],
): FileMetrics {
  const totalFiles = files.length;

  const totalSizeBytes = files.reduce(
    (sum, file) => sum + file.size,
    0,
  );

  const averageFileSizeBytes =
    totalFiles === 0
      ? 0
      : Math.round(totalSizeBytes / totalFiles);

  const sortedFiles = [...files].sort(sortBySize);

  const largestFiles = sortedFiles.slice(0, 10);

  const smallestFiles = [...sortedFiles]
  .reverse()
  .slice(0, 10);

  const largestFile = sortedFiles[0];

  const smallestFile =
  sortedFiles[sortedFiles.length - 1];

  return {
    totalFiles,
    totalSizeBytes,
    averageFileSizeBytes,
    largestFiles,
    smallestFiles,
    largestFile,
    smallestFile,
  };
}