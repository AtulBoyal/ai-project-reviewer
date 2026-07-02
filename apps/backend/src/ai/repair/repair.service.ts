import { generateContent } from "../gemini/gemini.client.js";

import { buildRepairPrompt } from "./repair.prompt.js";

export async function repairResponse(
  invalidResponse: string,
  validationError: string,
): Promise<string> {
  const prompt =
    buildRepairPrompt({
      invalidResponse,
      validationError,
    });

  return generateContent(prompt);
}