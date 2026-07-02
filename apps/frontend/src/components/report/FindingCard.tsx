import {
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Props {
  title: string;
  description: string;
  positive?: boolean;
}

export default function FindingCard({
  title,
  description,
  positive = true,
}: Props) {
  const Icon = positive
    ? CheckCircle2
    : AlertCircle;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <div className="flex gap-3">

        <Icon
          size={20}
          className={
            positive
              ? "text-green-600"
              : "text-orange-600"
          }
        />

        <div>

          <h4 className="font-semibold">
            {title}
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}