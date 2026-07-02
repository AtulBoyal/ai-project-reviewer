/**
 * Safely parses LLM JSON responses.
 */
export function parseJson(
  response: string,
): unknown {
  try {
    return JSON.parse(response);
  } catch {
    throw new Error(
      "Gemini returned invalid JSON.",
    );
  }
}