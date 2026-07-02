import type {
  EngineeringReport,
  Finding,
  Improvement,
  InterviewQuestion,
} from "./report.types.js";

/**
 * Formats a bullet list.
 */
function formatBulletList(items: string[]): string {
  if (items.length === 0) {
    return "- None";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

/**
 * Formats findings (strengths / weaknesses).
 */
function formatFindings(
  findings: Finding[],
): string {
  if (findings.length === 0) {
    return "- None";
  }

  return findings
    .map((finding) => {
      const evidence =
        finding.evidence.length === 0
          ? ""
          : [
              "",
              "**Evidence**",
              ...finding.evidence.map(
                (item) =>
                  `- ${item.file}${
                    item.line
                      ? `:${item.line}`
                      : ""
                  } — ${item.description}`,
              ),
            ].join("\n");

      return [
        `### ${finding.title}`,
        "",
        finding.description,
        evidence,
      ].join("\n");
    })
    .join("\n\n");
}

/**
 * Formats improvements.
 */
function formatImprovements(
  improvements: Improvement[],
): string {
  if (improvements.length === 0) {
    return "- No improvement suggestions.";
  }

  return improvements
    .map((item) => {
      const evidence =
        item.evidence.length === 0
          ? ""
          : [
              "",
              "**Evidence**",
              ...item.evidence.map(
                (e) =>
                  `- ${e.file}${
                    e.line
                      ? `:${e.line}`
                      : ""
                  } — ${e.description}`,
              ),
            ].join("\n");

      return [
        `## ${item.title}`,
        "",
        `**Priority:** ${item.priority}`,
        `**Category:** ${item.category}`,
        "",
        "### Problem",
        item.problem,
        "",
        "### Recommendation",
        item.recommendation,
        "",
        "### Expected Impact",
        item.expectedImpact,
        evidence,
      ].join("\n");
    })
    .join("\n\n");
}

/**
 * Formats interview questions.
 */
function formatInterviewQuestions(
  questions: InterviewQuestion[],
): string {
  if (questions.length === 0) {
    return "- None";
  }

  return questions
    .map(
      (question, index) => `
## ${index + 1}. ${question.question}

**Difficulty:** ${question.difficulty}

**Category:** ${question.category}

### Why

${question.reason}

### Expected Answer

${question.expectedAnswer}
`.trim(),
    )
    .join("\n\n");
}

/**
 * Builds markdown report.
 */
export function buildMarkdown(
  report: EngineeringReport,
): string {
  return [
    "# AI Project Review",

    "---",

    "## Project Summary",

    `**Purpose:** ${report.summary.purpose}`,

    "",

    report.summary.description,

    "---",

    "## Technology Stack",

    "### Languages",

    formatBulletList(
      report.technologyStack.languages,
    ),

    "",

    "### Frameworks",

    formatBulletList(
      report.technologyStack.frameworks,
    ),

    "",

    "### Databases",

    formatBulletList(
      report.technologyStack.databases,
    ),

    "",

    "### Tools",

    formatBulletList(
      report.technologyStack.tools,
    ),

    "",

    "### Infrastructure",

    formatBulletList(
      report.technologyStack
        .infrastructure,
    ),

    "---",

    "## Architecture",

    report.architecture.summary,

    "",

    "### Strengths",

    formatBulletList(
      report.architecture.strengths,
    ),

    "",

    "### Weaknesses",

    formatBulletList(
      report.architecture.weaknesses,
    ),

    "",

    "### Scalability",

    report.architecture.scalability,

    "",

    "### Maintainability",

    report.architecture
      .maintainability,

    "---",

    "## Folder Structure",

    `**Score:** ${report.folderStructure.score}/10`,

    "",

    "### Positives",

    formatBulletList(
      report.folderStructure
        .positives,
    ),

    "",

    "### Negatives",

    formatBulletList(
      report.folderStructure
        .negatives,
    ),

    "",

    "### Recommendations",

    formatBulletList(
      report.folderStructure
        .recommendations,
    ),

    "---",

    "## Code Quality",

    `**Score:** ${report.codeQuality.score}/10`,

    "",

    "### Positives",

    formatBulletList(
      report.codeQuality.positives,
    ),

    "",

    "### Negatives",

    formatBulletList(
      report.codeQuality.negatives,
    ),

    "",

    "### Recommendations",

    formatBulletList(
      report.codeQuality
        .recommendations,
    ),

    "---",

    "## Strengths",

    formatFindings(
      report.strengths,
    ),

    "---",

    "## Weaknesses",

    formatFindings(
      report.weaknesses,
    ),

    "---",

    "## Improvement Suggestions",

    formatImprovements(
      report.improvements,
    ),

    "---",

    "## Resume Feedback",

    `**Score:** ${report.resumeFeedback.score}/10`,

    "",

    report.resumeFeedback.summary,

    "",

    "### Strengths",

    formatBulletList(
      report.resumeFeedback
        .strengths,
    ),

    "",

    "### Improvements",

    formatBulletList(
      report.resumeFeedback
        .improvements,
    ),

    "",

    "### Best Resume Bullet Points",

    formatBulletList(
      report.resumeFeedback
        .bestResumeBullets,
    ),

    "---",

    "## Interview Questions",

    formatInterviewQuestions(
      report.interviewQuestions,
    ),
  ].join("\n\n");
}