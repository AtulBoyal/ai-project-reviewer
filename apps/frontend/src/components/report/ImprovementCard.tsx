import {
  ArrowUpCircle,
  AlertTriangle,
  Wrench,
} from "lucide-react";

interface Props {
  title: string;
  priority: string;
  category: string;
  problem: string;
  recommendation: string;
  expectedImpact: string;
}

export default function ImprovementCard({
  title,
  priority,
  category,
  problem,
  recommendation,
  expectedImpact,
}: Props) {
  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {category}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}
        >
          {priority}
        </span>

      </div>

      <div className="mt-6 space-y-5">

        <div className="flex gap-3">
          <AlertTriangle className="mt-1 text-red-500" size={18} />

          <div>
            <h4 className="font-medium">
              Problem
            </h4>

            <p className="text-slate-600">
              {problem}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Wrench className="mt-1 text-blue-600" size={18} />

          <div>
            <h4 className="font-medium">
              Recommendation
            </h4>

            <p className="text-slate-600">
              {recommendation}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <ArrowUpCircle className="mt-1 text-green-600" size={18} />

          <div>
            <h4 className="font-medium">
              Expected Impact
            </h4>

            <p className="text-slate-600">
              {expectedImpact}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}