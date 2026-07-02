import type { RepositoryFile } from "../../types/repository.js";

import type {
  AnnotationMetrics,
  DocumentationMetrics,
} from "./metrics.types.js";

const README_PATTERN = /^readme(\..+)?$/i;

const LICENSE_PATTERN = /^license(\..+)?$/i;

const CHANGELOG_PATTERN = /^changelog(\..+)?$/i;

const CONTRIBUTING_PATTERN =
  /^contributing(\..+)?$/i;

/**
 * Counts occurrences of a keyword.
 */
function countKeyword(
  text: string,
  keyword: string,
): number {
  const regex = new RegExp(keyword, "gi");

  return text.match(regex)?.length ?? 0;
}

/**
 * Counts engineering annotations.
 */
export function buildAnnotationMetrics(
  files: RepositoryFile[],
): AnnotationMetrics {
  let todoCount = 0;

  let fixmeCount = 0;

  let hackCount = 0;

  let xxxCount = 0;

  for (const file of files) {
    todoCount += countKeyword(
      file.content,
      "\\bTODO\\b",
    );

    fixmeCount += countKeyword(
      file.content,
      "\\bFIXME\\b",
    );

    hackCount += countKeyword(
      file.content,
      "\\bHACK\\b",
    );

    xxxCount += countKeyword(
      file.content,
      "\\bXXX\\b",
    );
  }

  return {
    todoCount,
    fixmeCount,
    hackCount,
    xxxCount,
  };
}

/**
 * Detects important documentation files.
 */
export function buildDocumentationMetrics(
  files: RepositoryFile[],
): DocumentationMetrics {
  const readmeFiles: string[] = [];

  const licenseFiles: string[] = [];

  const changelogFiles: string[] = [];

  const contributingFiles: string[] = [];

  for (const file of files) {
    const name = file.name;

    if (README_PATTERN.test(name)) {
      readmeFiles.push(file.relativePath);
    }

    if (LICENSE_PATTERN.test(name)) {
      licenseFiles.push(file.relativePath);
    }

    if (CHANGELOG_PATTERN.test(name)) {
      changelogFiles.push(file.relativePath);
    }

    if (CONTRIBUTING_PATTERN.test(name)) {
      contributingFiles.push(file.relativePath);
    }
  }

  return {
    readmeFiles,
    changelogFiles,
    contributingFiles,
    licenseFiles,
  };
}