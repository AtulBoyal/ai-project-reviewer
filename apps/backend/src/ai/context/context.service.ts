import path from "node:path";

import type {
  RepositoryFile,
  RepositoryMetadata,
} from "../../types/repository.js";

import type {
  AnalysisContext,
  ContextFile,
} from "./context.types.js";

const FILE_PRIORITY: ReadonlyArray<string> = [
  "README.md",
  "package.json",
  "Dockerfile",
  "docker-compose.yml",
  "tsconfig.json",
  "vite.config.ts",
  "next.config.js",
  "next.config.mjs",
  "requirements.txt",
  "pom.xml",
];

const EXCLUDED_FILES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "LICENSE",
  "CHANGELOG.md",
]);

function getFilePriority(fileName: string): number {
  const index = FILE_PRIORITY.indexOf(fileName);

  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function isExcludedFile(fileName: string): boolean {
  return EXCLUDED_FILES.has(fileName);
}

function compareFiles(
  first: RepositoryFile,
  second: RepositoryFile,
): number {
  const priorityDifference =
    getFilePriority(first.name) -
    getFilePriority(second.name);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return first.relativePath.localeCompare(
    second.relativePath,
  );
}

function getLanguage(filePath: string): string {
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

    case ".py":
      return "Python";

    case ".java":
      return "Java";

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

function toContextFile(file: RepositoryFile): ContextFile {
  return {
    path: file.relativePath,
    language: getLanguage(file.relativePath),
    content: file.content,
  };
}

function getImportantDirectories(
  files: RepositoryFile[],
): string[] {
  const directories = new Set<string>();

  for (const file of files) {
    const directory = path.dirname(file.relativePath);

    if (directory !== ".") {
      directories.add(directory);
    }
  }

  return [...directories].sort();
}

export function buildAnalysisContext(
  metadata: RepositoryMetadata,
): AnalysisContext {
  const repository = {
    name: metadata.repositoryName,
    totalFiles: metadata.totalFiles,
    totalDirectories: metadata.totalDirectories,
  };

  const technologies = {
    languages: [...metadata.languages],
    frameworks: [...metadata.frameworks],
  };

  const structure = {
    configurationFiles: [
      ...metadata.configurationFiles,
    ],
    importantDirectories: getImportantDirectories(
      metadata.repository.files,
    ),
  };

  const files = {
    files: [...metadata.repository.files]
      .filter(
        (file) => !isExcludedFile(file.name),
      )
      .sort(compareFiles)
      .map(toContextFile),
  };

  const metrics = metadata.metrics;

  const staticAnalysis =
    metadata.staticAnalysis;

  const evidence = metadata.evidence;

  return {
    repository,
    technologies,
    structure,

    metrics,
    staticAnalysis,
    evidence,
    files,
  };
}