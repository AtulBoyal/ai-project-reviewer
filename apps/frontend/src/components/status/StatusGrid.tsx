import StatusCard from "./StatusCard";

interface Props {
  duration?: number;

  repaired?: boolean;

  model?: string;
}

export default function StatusGrid({
  duration,
  repaired,
  model,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatusCard
        title="Model"
        value={model ?? "-"}
      />

      <StatusCard
        title="Duration"
        value={
          duration == null
            ? "-"
            : `${duration} ms`
        }
      />

      <StatusCard
        title="Repair"
        value={
          repaired ? "Yes" : "No"
        }
      />
    </div>
  );
}