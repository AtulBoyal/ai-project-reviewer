import path from "node:path";

import {
  IGNORED_DIRECTORIES,
  IGNORED_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
} from "../../constants/repository.js";

import type {
  FilteredRepository,
  IgnoredRepositoryFile,
  RepositoryEntry,
  RepositoryTree,
} from "../../types/repository.js";

import { RepositoryTooLargeError } from "../errors/RepositoryTooLargeError.js";
import { MAX_ANALYZABLE_SIZE } from "../../constants/upload.js";

const ignoredDirectories = new Set(IGNORED_DIRECTORIES);
const ignoredExtensions = new Set(
  IGNORED_EXTENSIONS.map((ext) => ext.toLowerCase()),
);

function getIgnoreReason(
  file: RepositoryEntry,
): IgnoredRepositoryFile["reason"] | null {
  const segments = file.relativePath.split(path.sep);

  if (segments.some((segment) => ignoredDirectories.has(segment))) {
    return "directory";
  }

  const extension = path.extname(file.name).toLowerCase();

  if (ignoredExtensions.has(extension)) {
    return "extension";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "size";
  }

  return null;
}

export function filterRepository(
  repository: RepositoryTree,
): FilteredRepository {
  const files: RepositoryEntry[] = [];
  const ignoredFiles: IgnoredRepositoryFile[] = [];

  let analyzableSize = 0;

  for (const file of repository.files) {
    const reason = getIgnoreReason(file);

    if (reason) {
      ignoredFiles.push({
        ...file,
        reason,
      });

      continue;
    }

    files.push(file);

    analyzableSize += file.size;
  }

  if (analyzableSize > MAX_ANALYZABLE_SIZE) {
    throw new RepositoryTooLargeError(
      analyzableSize,
      MAX_ANALYZABLE_SIZE,
    );
  }

  return {
    rootPath: repository.rootPath,
    files,
    ignoredFiles,
  };
}