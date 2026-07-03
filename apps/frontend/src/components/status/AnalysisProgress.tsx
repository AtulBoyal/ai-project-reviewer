import ProgressStep from "./ProgressStep";

import type { AnalysisStage } from "../../types/progress";

interface Props {
  stage: AnalysisStage;
}

const ORDER: AnalysisStage[] = [
  "IDLE",
  "UPLOADING",
  "EXTRACTING",
  "READING_REPOSITORY",
  "BUILDING_METADATA",
  "STATIC_ANALYSIS",
  "BUILDING_AI_CONTEXT",
  "AI_REVIEW",
  "VALIDATING_RESPONSE",
  "GENERATING_MARKDOWN",
  "COMPLETED",
];

const LABELS: Record<AnalysisStage, string> = {
  IDLE: "Ready",
  UPLOADING: "Uploading",
  EXTRACTING: "Extracting",
  READING_REPOSITORY: "Reading Repository",
  BUILDING_METADATA: "Building Metadata",
  STATIC_ANALYSIS: "Static Analysis",
  BUILDING_AI_CONTEXT: "Preparing AI Context",
  AI_REVIEW: "AI Review",
  VALIDATING_RESPONSE: "Validating Response",
  GENERATING_MARKDOWN: "Generating Markdown",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export default function AnalysisProgress({
  stage,
}: Props) {
  const current = ORDER.indexOf(stage);

  return (
    <div className="space-y-3">
      {ORDER.map((item, index) => (
        <ProgressStep
          key={item}
          title={LABELS[item]}
          active={index === current}
          completed={index < current}
        />
      ))}
    </div>
  );
}