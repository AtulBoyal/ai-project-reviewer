import path from "node:path";

import type { RepositoryTree } from "../../types/repository.js";

import type { DirectoryMetrics } from "./metrics.types.js";

/**
 * Computes directory depth relative to repository root.
 */
function getDepth(relativePath: string): number {
  if (
    relativePath === "." ||
    relativePath.length === 0
  ) {
    return 0;
  }

  return relativePath.split(path.sep).length;
}

export function buildDirectoryMetrics(
  tree: RepositoryTree,
): DirectoryMetrics {
  let deepestDirectory = ".";

  let maximumDepth = 0;

  let totalDepth = 0;

  const directoryFileCount = new Map<
    string,
    number
  >();

  for (const directory of tree.directories) {
    const depth = getDepth(
      directory.relativePath,
    );

    totalDepth += depth;

    if (depth > maximumDepth) {
      maximumDepth = depth;
      deepestDirectory =
        directory.relativePath;
    }

    directoryFileCount.set(
      directory.relativePath,
      0,
    );
  }

  for (const file of tree.files) {
    const directory = path.dirname(
      file.relativePath,
    );

    directoryFileCount.set(
      directory,
      (directoryFileCount.get(
        directory,
      ) ?? 0) + 1,
    );
  }

  const emptyDirectories: string[] = [];

  let largestDirectory = ".";

  let largestDirectoryFileCount = 0;

  for (const [
    directory,
    count,
  ] of directoryFileCount.entries()) {
    if (count === 0) {
      emptyDirectories.push(directory);
    }

    if (count > largestDirectoryFileCount) {
      largestDirectoryFileCount = count;
      largestDirectory = directory;
    }
  }

  const averageDepth =
    tree.directories.length === 0
      ? 0
      : Number(
          (
            totalDepth /
            tree.directories.length
          ).toFixed(2),
        );

  return {
    totalDirectories:
      tree.totalDirectories,

    emptyDirectories,

    deepestDirectory,

    maximumDepth,

    averageDepth,

    largestDirectory,

    largestDirectoryFileCount,
  };
}