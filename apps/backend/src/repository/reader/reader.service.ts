import fs from "node:fs/promises";

import {
  MAX_FILE_CONTENT_CHARS,
} from "../../constants/repository.js";

import type {
  FilteredRepository,
  RepositoryContent,
  RepositoryFile,
} from "../../types/repository.js";

async function readRepositoryFile(
  file: FilteredRepository["files"][number],
): Promise<RepositoryFile> {
  const rawContent = await fs.readFile(
    file.absolutePath,
    "utf8",
  );

  const truncated =
    rawContent.length > MAX_FILE_CONTENT_CHARS;

  const content = truncated
    ? rawContent.slice(0, MAX_FILE_CONTENT_CHARS)
    : rawContent;

  return {
    ...file,
    content,
    size: file.size,
    truncated,
  };
}

export async function readRepository(
  repository: FilteredRepository,
): Promise<RepositoryContent> {
  const files: RepositoryFile[] = await Promise.all(
    repository.files.map(readRepositoryFile),
  );

  return {
    rootPath: repository.rootPath,
    files,
  };
}