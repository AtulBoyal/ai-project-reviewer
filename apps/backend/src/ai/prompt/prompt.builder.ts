import type { AnalysisContext, ContextFile } from "../context/context.types.js";
import type { PromptSpec } from "./prompt.types.js";
import { SYSTEM_INSTRUCTION, ANALYSIS_TASK, REQUIRED_SCHEMA, REPORT_REQUIREMENTS } from "./prompt.constants.js";

function buildEvidenceSection(
  context: AnalysisContext,
): string {
  const lines: string[] = [];

  lines.push("## Repository Evidence");
  lines.push("");

  lines.push(
    `Large Functions: ${context.evidence.functions.length}`,
  );

  for (const fn of context.evidence.functions.slice(0, 10)) {
    lines.push(
      `- ${fn.file}:${fn.line} (${fn.length} LOC) ${fn.name}`,
    );
  }

  lines.push("");

  lines.push(
    `Logging Statements: ${context.evidence.logging.length}`,
  );

  for (const log of context.evidence.logging.slice(0, 10)) {
    lines.push(
      `- ${log.file}:${log.line} (${log.type})`,
    );
  }

  lines.push("");

  lines.push(
    `TypeScript Issues: ${context.evidence.typescript.length}`,
  );

  for (const issue of context.evidence.typescript.slice(0, 10)) {
    lines.push(
      `- ${issue.file}:${issue.line} (${issue.type})`,
    );
  }

  lines.push("");

  lines.push(
    `Engineering Notes: ${context.evidence.annotations.length}`,
  );

  for (const note of context.evidence.annotations.slice(0, 10)) {
    lines.push(
      `- ${note.file}:${note.line} (${note.type}) ${note.text}`,
    );
  }

  return lines.join("\n");
}

/**
 * Formats a list of strings into a bullet list.
 */
function formatList(items: string[]): string {
  if (items.length === 0) {
    return "- None";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

/**
 * Builds the repository summary section.
 */
function buildRepositorySection(context: AnalysisContext): string {
  return [
    "## Repository",
    "",
    `Name: ${context.repository.name}`,
    `Total Files: ${context.repository.totalFiles}`,
    `Total Directories: ${context.repository.totalDirectories}`,
  ].join("\n");
}

/**
 * Builds the technology section.
 */
function buildTechnologySection(context: AnalysisContext): string {
  return [
    "## Technology Stack",
    "",
    "Languages:",
    formatList(context.technologies.languages),
    "",
    "Frameworks:",
    formatList(context.technologies.frameworks),
  ].join("\n");
}

/**
 * Builds the project structure section.
 */
function buildStructureSection(context: AnalysisContext): string {
  return [
    "## Project Structure",
    "",
    "Configuration Files:",
    formatList(context.structure.configurationFiles),
    "",
    "Important Directories:",
    formatList(context.structure.importantDirectories),
  ].join("\n");
}

/**
 * Formats a single source file.
 */
function buildFileSection(file: ContextFile): string {
  return [
    "===== FILE =====",
    `Path: ${file.path}`,
    `Language: ${file.language}`,
    "",
    file.content.trim(),
    "===== END FILE =====",
  ].join("\n");
}

/**
 * Builds the complete user prompt.
 */
function buildUserPrompt(context: AnalysisContext): string {
  const sections: string[] = [];

  sections.push(ANALYSIS_TASK);

  sections.push(REPORT_REQUIREMENTS);

  sections.push(buildRepositorySection(context));

  sections.push(buildTechnologySection(context));

  sections.push(buildStructureSection(context));

  // sections.push(buildMetricsSection(context));

  // sections.push(buildStaticAnalysisSection(context));

  sections.push(buildEvidenceSection(context));

  sections.push(`
    ## Review Methodology

    Evaluate the repository in this order:

    1. Repository Metrics

    2. Static Analysis

    3. Repository Evidence

    4. Source Files

    If any information conflicts:

    Always trust the supplied repository data.

    Never infer missing features.

    Never guess architecture.

    Never invent technologies.

    If evidence is insufficient:

    State that explicitly.
  `);

  sections.push("## Important Files");

  sections.push(REQUIRED_SCHEMA);

  sections.push(`
    ## Strict Output Rules

    The JSON MUST exactly match REQUIRED_SCHEMA.

    Never rename fields.

    Never omit fields.

    Never replace objects with strings.

    Never replace arrays of objects with arrays of strings.

    Every nested object must exist.

    Every required array must exist.

    Empty arrays are allowed.

    All scores must be integers from 0 to 10.

    Return exactly one JSON object.

    Do not include explanations.

    Do not include markdown.

    Do not wrap JSON inside code fences.
  `);

  if (context.files.files.length === 0) {
    sections.push("No source files were selected for analysis.");
  } else {
    sections.push(
      context.files.files
        .map(buildFileSection)
        .join("\n\n"),
    );
  }

  sections.push(
    [
      "## Resume Review Guidelines",
      "",
      "Score conservatively.",
      "An average student project should score around 6–7.",
      "Well-designed academic projects around 7–8.",
      "Strong production-quality portfolio projects around 8–9.",
      "Reserve 10 only for truly exceptional engineering.",
      "",
      "Consider:",
      "",
      "- Architecture",
      "- Code Quality",
      "- Engineering Practices",
      "- Documentation",
      "- Testing",
      "- Complexity",
      "- Resume Value",
      "",
      "Do not inflate the score.",
    ].join("\n"),
  );

  sections.push(
    [
      "## Interview Question Guidelines",
      "",
      "Questions should be derived directly from repository decisions.",
      "",
      "Prioritize:",
      "",
      "- Architecture",
      "- TypeScript",
      "- Error Handling",
      "- Security",
      "- AI Pipeline",
      "- Prompt Engineering",
      "- Static Analysis",
      "- Design Trade-offs",
      "",
      "Avoid generic DSA questions.",
      "",
      "Each expected answer should explain the engineering reasoning rather than simply stating facts.",
    ].join("\n"),
  );

  sections.push(
    [
      "## Final Validation",
      "",
      "Before returning the JSON:",
      "",
      "✓ Validate every required field exists.",
      "",
      "✓ Validate nested objects exist.",
      "",
      "✓ Validate arrays contain the correct object type.",
      "",
      "✓ Validate evidence references are consistent.",
      "",
      "✓ Validate recommendations are supported by evidence.",
      "",
      "✓ Validate no unsupported claims exist.",
      "",
      "✓ Validate JSON syntax.",
      "",
      "Return exactly one JSON object.",
    ].join("\n"),
  );

  return sections.join("\n\n");
}

/**
 * Builds the prompt sent to the LLM.
 */
export function buildPrompt(
  context: AnalysisContext,
): PromptSpec {
  return {
    systemInstruction: SYSTEM_INSTRUCTION.trim(),
    userInstruction: buildUserPrompt(context).trim(),
    responseMimeType: "application/json",
  };
}