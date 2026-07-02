import path from "node:path";

export const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",

  "dist",
  "build",
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",

  "coverage",

  "vendor",
  "target",
  "bin",
  "obj",

  ".cache",
  ".turbo",
  ".parcel-cache",

  ".idea",
  ".vscode",

  "out",
]);

export const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",

  ".java",
  ".kt",
  ".go",
  ".rs",
  ".cpp",
  ".cc",
  ".c",
  ".h",
  ".hpp",

  ".py",
  ".rb",
  ".php",

  ".swift",
  ".dart",

  ".vue",
  ".svelte",
  ".astro",

  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".xml",
  ".ini",
  ".conf",
  ".properties",

  ".graphql",
  ".proto",
  ".prisma",

  ".sql",

  ".css",
  ".scss",
  ".sass",

  ".html",

  ".md",
  ".txt",

  ".env",
  ".gitignore",
  ".gitattributes",
  ".dockerignore",

  ".lock",

  ".sh",
]);

export function isTextFile(
  fileName: string,
): boolean {
  const ext =
    path.extname(fileName).toLowerCase();

  return TEXT_EXTENSIONS.has(ext);
}