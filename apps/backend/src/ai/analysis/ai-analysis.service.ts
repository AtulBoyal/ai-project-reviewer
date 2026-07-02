import { ZodError } from "zod";
import { buildAnalysisContext } from "../context/context.service.js";
import { generateContent } from "../gemini/gemini.client.js";
import { cleanJson } from "../parser/json-cleaner.js";
import { parseJson } from "../parser/json-parser.js";
import { validateEngineeringReport } from "../parser/schema-validator.js";
import { buildPrompt } from "../prompt/prompt.builder.js";
import { repairResponse } from "../repair/repair.service.js";
import { buildMarkdown } from "../report/markdown.service.js";
import { buildGenerationTrace } from "../trace/trace.service.js";
import { progressService } from "../../progress/progress.service.js";
import { env } from "../../config/env.js";
import { logger } from "../../logger/logger.service.js";

import type {
  AnalysisRequest,
  AnalysisResult,
} from "./analysis.types.js";

export async function analyzeRepository(
  request: AnalysisRequest,
): Promise<AnalysisResult> {
  try {
    const startedAt = Date.now();

    let repaired = false;
    
    let repairAttempts = 0;

    progressService.setStage(
      "BUILDING_AI_CONTEXT",
    );    

    await logger.info(
      "Building AI context",
    );
    
    // Step 1
    const context = buildAnalysisContext(
      request.metadata,
    );

    await logger.info(
      "AI context built",
    );
    
    // Step 2
    const prompt = buildPrompt(context);

    progressService.setStage(
      "AI_REVIEW",
    );

    await logger.prompt(
      prompt.userInstruction,
    );

    await logger.info(
      "Sending prompt to Gemini",
    );
    
    // Step 3
    const rawResponse =
    await generateContent(prompt);

    await logger.geminiResponse(
      rawResponse,
    );

    await logger.info(
      "Gemini response received",
    );
    
    let finalResponse = rawResponse;

    const cleaned =
      cleanJson(rawResponse);

    const parsed =
      parseJson(cleaned);

    progressService.setStage(
      "VALIDATING_RESPONSE",
    );

    let report;

    try {
      report =
        validateEngineeringReport(
          parsed,
        );
      
      await logger.validatedReport(
        report,
      );

      await logger.info(
        "Engineering report validated",
      );
    } catch (validationError) {
      console.warn(
        "Engineering report validation failed. Attempting repair...",
      );

      await logger.warn(
        "Engineering report validation failed. Repairing response.",
      );

      const repairedResponse =
        await repairResponse(
          cleaned,
          validationError instanceof ZodError
            ? JSON.stringify(
                validationError.flatten(),
                null,
                2,
              )
            : validationError instanceof Error
              ? validationError.message
              : "Unknown validation error"
        );
      
      await logger.info(
        "Repair completed successfully",
      );

      const repairedCleaned =
        cleanJson(repairedResponse);

      const repairedParsed =
        parseJson(repairedCleaned);

      report =
        validateEngineeringReport(
          repairedParsed,
        );

      finalResponse = repairedResponse;

      repaired = true;

      repairAttempts = 1;
    }

    progressService.setStage(
      "GENERATING_MARKDOWN",
    );

    const markdown =
      buildMarkdown(report);

    await logger.markdown(
      markdown,
    );

    await logger.info(
      "Markdown generated",
    );

    const trace =
      buildGenerationTrace({
        startedAt,

        prompt:
          prompt.userInstruction,

        response: finalResponse,

        repaired,

        repairAttempts,

        model:
          env.GEMINI_MODEL,
      });

    progressService.setStage(
      "COMPLETED",
    );

    return {
      report,
      markdown,
      trace,
    };
  } catch (error) {
    console.error(
      "========== ANALYZE ERROR ==========",
    );
    
    await logger.error(
      "Repository analysis failed",
      error,
    );

    console.error(error);
    console.error(
      "===================================",
    );

    progressService.setStage(
      "FAILED",
    );

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Failed to analyze repository.",
    );
  }
}