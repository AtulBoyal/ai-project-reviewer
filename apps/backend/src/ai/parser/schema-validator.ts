import { ZodError } from "zod";

import { engineeringReportSchema } from "../report/report.schema.js";

import type { EngineeringReport } from "../report/report.types.js";

/**
 * Validates EngineeringReport.
 */
export function validateEngineeringReport(
  data: unknown,
): EngineeringReport {
  try {
    return engineeringReportSchema.parse(
      data,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }

    throw error;
  }
}