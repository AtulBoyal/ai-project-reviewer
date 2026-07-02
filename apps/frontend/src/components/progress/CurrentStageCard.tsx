import { STAGES } from "./progressStages";

interface Props {
  stage: string;
}

export default function CurrentStageCard({
  stage,
}: Props) {
  const current =
    STAGES.find((item) => item.key === stage) ??
    STAGES[0];

  const Icon = current.icon;

  return (
    <div className="rounded-2xl border bg-slate-50 p-6">

      <div className="flex items-center gap-5">

        <div className="rounded-full bg-blue-100 p-4">
          <Icon
            size={30}
            className="text-blue-600"
          />
        </div>

        <div>

          <h3 className="text-xl font-semibold">
            {current.title}
          </h3>

          <p className="mt-1 text-slate-500">
            {current.description}
          </p>

        </div>

      </div>

    </div>
  );
}