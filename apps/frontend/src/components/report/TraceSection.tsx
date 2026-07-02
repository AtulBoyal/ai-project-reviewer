import Section from "./Section";

interface Props {
  durationMs: number;
  model: string;
  repaired: boolean;
  repairAttempts: number;
}

export default function TraceSection({
  durationMs,
  model,
  repaired,
  repairAttempts,
}: Props) {
  return (
    <Section title="Analysis Information">
      <div className="grid gap-4 md:grid-cols-2">
        <p>
          <strong>Model:</strong> {model}
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {durationMs} ms
        </p>

        <p>
          <strong>Repair Used:</strong>{" "}
          {repaired ? "Yes" : "No"}
        </p>

        <p>
          <strong>Repair Attempts:</strong>{" "}
          {repairAttempts}
        </p>
      </div>
    </Section>
  );
}