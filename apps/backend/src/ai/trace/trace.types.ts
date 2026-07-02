export interface GenerationTrace {
  startedAt: string;

  finishedAt: string;

  durationMs: number;

  model: string;

  promptCharacters: number;

  responseCharacters: number;

  repaired: boolean;

  repairAttempts: number;
}