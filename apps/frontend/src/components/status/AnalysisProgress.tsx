import ProgressStep from "./ProgressStep";

type AnalysisStatus =
  | "idle"
  | "uploading"
  | "extracting"
  | "analyzing"
  | "completed"
  | "failed";

interface Props {
  status: AnalysisStatus;
}

const ORDER: AnalysisStatus[] = [
  "idle",
  "uploading",
  "extracting",
  "analyzing",
  "completed",
];

const LABELS: Record<
  AnalysisStatus,
  string
> = {
  idle: "Ready",

  uploading: "Uploading",

  extracting: "Extracting",

  analyzing: "AI Analysis",

  completed: "Completed",

  failed: "Failed",
};

export default function AnalysisProgress({
  status,
}: Props) {
  const current =
    ORDER.indexOf(status);

  return (
    <div className="space-y-3">
      {ORDER.map((step, index) => (
        <ProgressStep
          key={step}
          title={LABELS[step]}
          active={
            index === current
          }
          completed={
            index < current
          }
        />
      ))}
    </div>
  );
}