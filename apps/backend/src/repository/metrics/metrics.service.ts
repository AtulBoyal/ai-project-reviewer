import type {
  RepositoryContent,
  RepositoryTree,
} from "../../types/repository.js";

import type { RepositoryMetrics } from "./metrics.types.js";

import {
  buildAnnotationMetrics,
  buildDocumentationMetrics,
} from "./todos.js";

import {
  buildCodeMetrics,
  buildLanguageMetrics,
} from "./loc.js";

import { buildFileMetrics } from "./files.js";

import { buildDirectoryMetrics } from "./directories.js";

/**
 * Builds the complete repository metrics.
 *
 * This is the entry point for the Repository Metrics Engine.
 */
export function buildRepositoryMetrics(
  repository: RepositoryContent,
  tree: RepositoryTree,
): RepositoryMetrics {
  return {
    code: buildCodeMetrics(repository.files),

    languages: buildLanguageMetrics(
      repository.files,
    ),

    files: buildFileMetrics(
      repository.files,
    ),

    annotations: buildAnnotationMetrics(
      repository.files,
    ),

    documentation:
      buildDocumentationMetrics(
        repository.files,
      ),

    directories:
      buildDirectoryMetrics(tree),
  };
}