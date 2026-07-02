import path from "node:path";

import type { RepositoryFile } from "../../types/repository.js";
import type {
  CodeMetrics,
  LanguageMetrics,
} from "./metrics.types.js";

interface LineStatistics {
  total: number;
  blank: number;
  comment: number;
  source: number;
}

const COMMENT_PREFIXES = [
  "//",
  "#",
  "--",
  ";",
  "%",
  "*",
];

/**
 * Detects the language from a file extension.
 */
function detectLanguage(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".ts":
      return "TypeScript";

    case ".tsx":
      return "TypeScript React";

    case ".js":
      return "JavaScript";

    case ".jsx":
      return "JavaScript React";

    case ".java":
      return "Java";

    case ".py":
      return "Python";

    case ".cpp":
    case ".cc":
    case ".cxx":
      return "C++";

    case ".c":
      return "C";

    case ".cs":
      return "C#";

    case ".go":
      return "Go";

    case ".rs":
      return "Rust";

    case ".php":
      return "PHP";

    case ".rb":
      return "Ruby";

    case ".swift":
      return "Swift";

    case ".kt":
      return "Kotlin";

    case ".html":
      return "HTML";

    case ".css":
      return "CSS";

    case ".scss":
      return "SCSS";

    case ".json":
      return "JSON";

    case ".md":
      return "Markdown";

    case ".xml":
      return "XML";

    case ".yaml":
    case ".yml":
      return "YAML";

    case ".sql":
      return "SQL";

    case ".sh":
      return "Shell";

    default:
      return "Text";
  }
}

/**
 * Counts line statistics for a single file.
 */
function analyzeFile(content: string): LineStatistics {
  const lines = content.split(/\r?\n/);

  let blank = 0;
  let comment = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.length === 0) {
      blank++;
      continue;
    }

    if (
      COMMENT_PREFIXES.some((prefix) =>
        line.startsWith(prefix),
      )
    ) {
      comment++;
    }
  }

  const total = lines.length;

  return {
    total,
    blank,
    comment,
    source: total - blank - comment,
  };
}

/**
 * Builds language statistics.
 */
export function buildLanguageMetrics(
  files: RepositoryFile[],
): LanguageMetrics[] {
  const metrics = new Map<
    string,
    LanguageMetrics
  >();

  for (const file of files) {
    const language = detectLanguage(
      file.relativePath,
    );

    const stats = analyzeFile(file.content);

    const existing = metrics.get(language);

    if (existing) {
      existing.files += 1;
      existing.linesOfCode += stats.total;
    } else {
      metrics.set(language, {
        language,
        files: 1,
        linesOfCode: stats.total,
      });
    }
  }

  return [...metrics.values()].sort(
    (a, b) => b.linesOfCode - a.linesOfCode,
  );
}

/**
 * Computes repository-wide line statistics.
 */
export function buildCodeMetrics(
  files: RepositoryFile[],
): CodeMetrics {
  let totalLinesOfCode = 0;
  let blankLines = 0;
  let commentLines = 0;
  let sourceLinesOfCode = 0;

  for (const file of files) {
    const stats = analyzeFile(file.content);

    totalLinesOfCode += stats.total;
    blankLines += stats.blank;
    commentLines += stats.comment;
    sourceLinesOfCode += stats.source;
  }

  return {
    totalLinesOfCode,
    sourceLinesOfCode,
    blankLines,
    commentLines,
  };
}