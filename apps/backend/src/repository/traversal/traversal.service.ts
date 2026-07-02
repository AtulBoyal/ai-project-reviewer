import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import type {
  RepositoryEntry,
  RepositoryTree,
} from "../../types/repository.js";

async function walkDirectory(
  rootPath: string,
  currentPath: string,
  files: RepositoryEntry[],
  directories: RepositoryEntry[],
): Promise<void> {
  const entries = await fs.readdir(currentPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const absolutePath = path.join(currentPath, entry.name);

    const relativePath = path.relative(
      rootPath,
      absolutePath,
    );

    const stats = await fs.stat(absolutePath);

    const repositoryEntry: RepositoryEntry = {
      id: crypto.randomUUID(),
      name: entry.name,
      relativePath,
      absolutePath,
      type: entry.isDirectory() ? "directory" : "file",
      size: stats.size,
    };

    if (entry.isDirectory()) {
      directories.push(repositoryEntry);

      await walkDirectory(
        rootPath,
        absolutePath,
        files,
        directories,
      );
    } else {
      files.push(repositoryEntry);
    }
  }
}

export async function traverseRepository(
  repositoryRoot: string,
): Promise<RepositoryTree> {
  const files: RepositoryEntry[] = [];
  const directories: RepositoryEntry[] = [];

  await walkDirectory(
    repositoryRoot,
    repositoryRoot,
    files,
    directories,
  );

  return {
    rootPath: repositoryRoot,
    files,
    directories,
    totalFiles: files.length,
    totalDirectories: directories.length,
  };
}