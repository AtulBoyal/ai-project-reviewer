/**
 * Cleans common LLM formatting issues before JSON parsing.
 */
export function cleanJson(
  response: string,
): string {
  let cleaned = response.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "");
  }

  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "");
  }

  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/```$/, "");
  }

  return cleaned.trim();
}