import type { RepairRequest } from "./repair.types.js";

import type { PromptSpec } from "../prompt/prompt.types.js";

export function buildRepairPrompt(
  request: RepairRequest,
): PromptSpec {
  return {
    systemInstruction: `
        You repair invalid JSON.

        Return ONLY corrected JSON.

        Never explain anything.

        Do not add markdown.

        Do not omit required fields.
        `.trim(),

    userInstruction: `
        The previous response failed schema validation.

        Validation Error

        ${request.validationError}

        Previous JSON

        ${request.invalidResponse}

        Return corrected JSON only.
        `.trim(),

    responseMimeType: "application/json",
  };
}