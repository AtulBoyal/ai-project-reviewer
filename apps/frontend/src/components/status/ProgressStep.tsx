interface Props {
  title: string;

  active: boolean;

  completed: boolean;
}

export default function ProgressStep({
  title,
  active,
  completed,
}: Props) {
  let color =
    "bg-gray-300";

  if (completed) {
    color =
      "bg-green-500";
  } else if (active) {
    color =
      "bg-blue-500";
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <span>{title}</span>
    </div>
  );
}