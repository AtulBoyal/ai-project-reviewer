import { z } from "zod";

const evidenceReferenceSchema = z.object({
  file: z.string(),
  line: z.number().optional(),
  description: z.string(),
});

const findingSchema = z.object({
  title: z.string(),
  description: z.string(),
  evidence: z.array(evidenceReferenceSchema),
});

const improvementSchema = z.object({
  title: z.string(),
  priority: z.enum([
    "High",
    "Medium",
    "Low",
  ]),
  category: z.string(),
  problem: z.string(),
  recommendation: z.string(),
  expectedImpact: z.string(),
  evidence: z.array(
    evidenceReferenceSchema,
  ),
});

export const engineeringReportSchema =
  z.object({
    summary: z.object({
      purpose: z.string(),
      description: z.string(),
    }),

    technologyStack: z.object({
      languages: z.array(z.string()),
      frameworks: z.array(z.string()),
      databases: z.array(z.string()),
      tools: z.array(z.string()),
      infrastructure: z.array(
        z.string(),
      ),
    }),

    architecture: z.object({
      summary: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      scalability: z.string(),
      maintainability: z.string(),
    }),

    folderStructure: z.object({
      score: z.number(),
      positives: z.array(z.string()),
      negatives: z.array(z.string()),
      recommendations: z.array(
        z.string(),
      ),
    }),

    codeQuality: z.object({
      score: z.number(),
      positives: z.array(z.string()),
      negatives: z.array(z.string()),
      recommendations: z.array(
        z.string(),
      ),
    }),

    strengths: z.array(
      findingSchema,
    ),

    weaknesses: z.array(
      findingSchema,
    ),

    improvements: z.array(
      improvementSchema,
    ),

    resumeFeedback: z.object({
      score: z.number(),
      summary: z.string(),
      strengths: z.array(z.string()),
      improvements: z.array(
        z.string(),
      ),
      bestResumeBullets: z.array(
        z.string(),
      ),
    }),

    interviewQuestions: z.array(
      z.object({
        question: z.string(),
        difficulty: z.enum([
          "Easy",
          "Medium",
          "Hard",
        ]),
        category: z.string(),
        reason: z.string(),
        expectedAnswer:
          z.string(),
      }),
    ),
  });

export type EngineeringReportSchema =
  z.infer<
    typeof engineeringReportSchema
  >;