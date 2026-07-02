export interface EngineeringReport {
  summary: ProjectSummary;
  technologyStack: TechnologyStack;
  architecture: ArchitectureReview;
  folderStructure: FolderStructureReview;
  codeQuality: CodeQualityReview;
  strengths: Finding[];
  weaknesses: Finding[];
  improvements: Improvement[];
  resumeFeedback: ResumeFeedback;
  interviewQuestions: InterviewQuestion[];
}

export interface ProjectSummary {
  purpose: string;
  description: string;
}

export interface TechnologyStack {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  infrastructure: string[];
}

export interface ArchitectureReview {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  scalability: string;
  maintainability: string;
}

export interface FolderStructureReview {
  score: number;
  positives: string[];
  negatives: string[];
  recommendations: string[];
}

export interface CodeQualityReview {
  score: number;
  positives: string[];
  negatives: string[];
  recommendations: string[];
}

export interface ResumeFeedback {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  bestResumeBullets: string[];
}

export interface InterviewQuestion {
  question: string;

  difficulty:
    | "Easy"
    | "Medium"
    | "Hard";

  category: string;
  reason: string;
  expectedAnswer: string;
}

export interface EvidenceReference {
  file: string;
  line?: number;
  description: string;
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

export interface Finding {
  title: string;
  description: string;
  evidence: EvidenceReference[];
}
