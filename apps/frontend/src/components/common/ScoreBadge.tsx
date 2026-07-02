interface Props {
  score: number;
}

export default function ScoreBadge({
  score,
}: Props) {
  let color =
    "bg-red-100 text-red-700";

  if (score >= 8) {
    color =
      "bg-green-100 text-green-700";
  } else if (score >= 6) {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
    >
      {score}/10
    </span>
  );
}