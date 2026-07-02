import type { GenerationTrace } from "./trace.types.js";

interface TraceOptions {
  startedAt: number;
  prompt: string;
  response: string;
  repaired: boolean;
  repairAttempts: number;
  model: string;
}

export function buildGenerationTrace(
  options: TraceOptions,
): GenerationTrace {
  const finishedAt = Date.now();

  return {
    startedAt: new Date(
      options.startedAt,
    ).toISOString(),

    finishedAt: new Date(
      finishedAt,
    ).toISOString(),

    durationMs:
      finishedAt - options.startedAt,

    model: options.model,

    promptCharacters:
      options.prompt.length,

    responseCharacters:
      options.response.length,

    repaired: options.repaired,

    repairAttempts:
      options.repairAttempts,
  };
}