interface Props {
  score: number;
  title: string;
}

export default function ScoreCard({
  score,
  title,
}: Props) {
  const color =
    score >= 8
      ? "text-green-600"
      : score >= 6
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div
        className={`mt-4 text-5xl font-bold ${color}`}
      >
        {score}
        <span className="text-2xl text-slate-400">
          /10
        </span>
      </div>

    </div>
  );
}