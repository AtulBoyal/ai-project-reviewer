import path from "node:path";
import { buildRepositoryMetrics } from "../metrics/metrics.service.js";
import { buildStaticAnalysis } from "../static-analysis/analysis.service.js";
import { buildRepositoryEvidence } from "../evidence/evidence.service.js";

import type {
  RepositoryContent,
  RepositoryFile,
  RepositoryMetadata,
  RepositoryTree,
} from "../../types/repository.js";

import { progressService } from "../../progress/progress.service.js";

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function detectLanguages(
  files: RepositoryFile[],
): string[] {
  const languages = new Set<string>();

  for (const file of files) {
    switch (path.extname(file.name).toLowerCase()) {
      case ".ts":
      case ".tsx":
        languages.add("TypeScript");
        break;

      case ".js":
      case ".jsx":
        languages.add("JavaScript");
        break;

      case ".java":
        languages.add("Java");
        break;

      case ".py":
        languages.add("Python");
        break;

      case ".cpp":
      case ".cc":
      case ".cxx":
        languages.add("C++");
        break;

      case ".c":
        languages.add("C");
        break;

      case ".go":
        languages.add("Go");
        break;

      case ".rs":
        languages.add("Rust");
        break;

      case ".cs":
        languages.add("C#");
        break;

      case ".php":
        languages.add("PHP");
        break;
    }
  }

  return [...languages].sort();
}

function detectFrameworks(
  files: RepositoryFile[],
): string[] {
  const frameworks = new Set<string>();

  for (const file of files) {
    const content = file.content.toLowerCase();

    if (
      file.name === "package.json" ||
      file.name === "package-lock.json"
    ) {
      if (content.includes("\"react\""))
        frameworks.add("React");

      if (content.includes("\"next\""))
        frameworks.add("Next.js");

      if (content.includes("\"express\""))
        frameworks.add("Express");

      if (content.includes("\"vite\""))
        frameworks.add("Vite");

      if (content.includes("\"nestjs\""))
        frameworks.add("NestJS");

      if (content.includes("\"vue\""))
        frameworks.add("Vue");

      if (content.includes("\"angular\""))
        frameworks.add("Angular");
    }

    if (file.name === "pom.xml") {
      frameworks.add("Maven");
    }

    if (file.name === "requirements.txt") {
      frameworks.add("Python");
    }

    if (file.name === "Cargo.toml") {
      frameworks.add("Cargo");
    }

    if (file.name === "go.mod") {
      frameworks.add("Go Modules");
    }
  }

  return [...frameworks].sort();
}

export function buildRepositoryMetadata(
  repository: RepositoryContent,
  tree: RepositoryTree,
): RepositoryMetadata {
  const files = repository.files;

  const configurationFiles = files
    .map((file) => file.name)
    .filter((name) =>
      [
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "vite.config.ts",
        "vite.config.js",
        "next.config.js",
        "next.config.mjs",
        "Dockerfile",
        "docker-compose.yml",
        "requirements.txt",
        "pom.xml",
        "Cargo.toml",
        "go.mod",
      ].includes(name),
    )
    .sort();

  const repositoryName =
    path.basename(repository.rootPath);

  const metrics = buildRepositoryMetrics(
    repository,
    tree,
  );

  progressService.setStage(
    "STATIC_ANALYSIS",
  );

  const staticAnalysis = buildStaticAnalysis(repository.files);

  const evidence =
    buildRepositoryEvidence(
      repository.files,
    );

  return {
    repositoryName,

    totalFiles: repository.files.length,

    totalDirectories: unique(
      repository.files.map((file) =>
        path.dirname(file.relativePath),
      ),
    ).length,

    languages: detectLanguages(files),

    frameworks: detectFrameworks(files),

    configurationFiles,

    hasReadme: files.some(
      (file) =>
        file.name.toLowerCase() === "readme.md",
    ),

    hasDockerfile: files.some(
      (file) => file.name === "Dockerfile",
    ),

    hasPackageJson: files.some(
      (file) => file.name === "package.json",
    ),

    largestFiles: [...files]
      .sort((a, b) => b.size - a.size)
      .slice(0, 10),

    metrics,

    staticAnalysis,

    evidence, 

    repository,
  };
}