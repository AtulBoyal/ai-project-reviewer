import { GoogleGenAI } from "@google/genai";

import { env } from "../../config/env.js";
import type { PromptSpec } from "../prompt/prompt.types.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, ms),
  );
}

/**
 * Generates raw JSON text from Gemini.
 *
 * Automatically retries temporary Gemini failures
 * such as HTTP 503 (high demand).
 */
export async function generateContent(
  prompt: PromptSpec,
): Promise<string> {
  let lastError: unknown;

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {
    try {
      console.log(
        `Gemini request (attempt ${attempt}/${MAX_RETRIES})`,
      );

      const response =
        await client.models.generateContent({
          model: env.GEMINI_MODEL,
          contents: prompt.userInstruction,
          config: {
            systemInstruction:
              prompt.systemInstruction,
            responseMimeType:
              prompt.responseMimeType,
          },
        });

      const text = response.text;

      console.log(
        "\n========== GEMINI RESPONSE ==========\n",
      );
      console.log(text);
      console.log(
        "\n=====================================\n",
      );

      if (!text) {
        throw new Error(
          "Gemini returned an empty response.",
        );
      }

      return text.trim();
    } catch (error) {
      lastError = error;

      console.error(
        `Gemini attempt ${attempt} failed:`,
        error,
      );

      const status =
        (error as { status?: number }).status;

      const retryable =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      if (
        !retryable ||
        attempt === MAX_RETRIES
      ) {
        break;
      }

      const delay = attempt * 2000;

      console.log(
        `Retrying in ${delay / 1000} seconds...`,
      );

      await sleep(delay);
    }
  }

  console.error(
    "Gemini generation failed permanently:",
    lastError,
  );

  throw new Error(
    "Gemini is temporarily unavailable. Please try again in a few moments.",
  );
}