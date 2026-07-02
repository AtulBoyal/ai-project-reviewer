export interface AnalyzeRepositoryResponse {
  report: EngineeringReport;
  markdown: string;
  trace: GenerationTrace;
}

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

export interface EvidenceReference {
  file: string;
  line?: number;
  description: string;
}

export interface Finding {
  title: string;
  description: string;
  evidence: EvidenceReference[];
}

export interface Improvement {
  title: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  problem: string;
  recommendation: string;
  expectedImpact: string;
  evidence: EvidenceReference[];
}

export interface InterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  reason: string;
  expectedAnswer: string;
}

export interface ResumeFeedback {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  bestResumeBullets: string[];
}

export interface EngineeringReport {
  summary: {
    purpose: string;
    description: string;
  };

  technologyStack: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    infrastructure: string[];
  };

  architecture: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    scalability: string;
    maintainability: string;
  };

  folderStructure: {
    score: number;
    positives: string[];
    negatives: string[];
    recommendations: string[];
  };

  codeQuality: {
    score: number;
    positives: string[];
    negatives: string[];
    recommendations: string[];
  };

  strengths: Finding[];

  weaknesses: Finding[];

  improvements: Improvement[];

  resumeFeedback: ResumeFeedback;

  interviewQuestions: InterviewQuestion[];
}