import {
  Upload,
  Archive,
  FolderOpen,
  Database,
  Search,
  BrainCircuit,
  ShieldCheck,
  FileText,
  CheckCircle,
} from "lucide-react";

export const STAGES = [
  {
    key: "UPLOADING",
    title: "Uploading Repository",
    description: "Uploading repository archive.",
    icon: Upload,
  },
  {
    key: "EXTRACTING",
    title: "Extracting Repository",
    description: "Extracting repository contents.",
    icon: Archive,
  },
  {
    key: "READING_REPOSITORY",
    title: "Reading Repository",
    description: "Reading project files.",
    icon: FolderOpen,
  },
  {
    key: "BUILDING_METADATA",
    title: "Building Metadata",
    description: "Collecting repository metadata.",
    icon: Database,
  },
  {
    key: "STATIC_ANALYSIS",
    title: "Running Static Analysis",
    description: "Analyzing code quality and engineering metrics.",
    icon: Search,
  },
  {
    key: "BUILDING_AI_CONTEXT",
    title: "Preparing AI Context",
    description: "Preparing repository context for AI.",
    icon: BrainCircuit,
  },
  {
    key: "AI_REVIEW",
    title: "AI Engineering Review",
    description: "Generating engineering review.",
    icon: BrainCircuit,
  },
  {
    key: "VALIDATING_RESPONSE",
    title: "Validating Response",
    description: "Validating AI response.",
    icon: ShieldCheck,
  },
  {
    key: "GENERATING_MARKDOWN",
    title: "Generating Report",
    description: "Preparing final report.",
    icon: FileText,
  },
  {
    key: "COMPLETED",
    title: "Completed",
    description: "Engineering review completed.",
    icon: CheckCircle,
  },
] as const;