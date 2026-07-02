import {
  CheckCircle,
  LoaderCircle,
} from "lucide-react";

import { STAGES } from "./progressStages";

interface Props {
  stage: string;
}

export default function StageTimeline({
  stage,
}: Props) {
  const currentIndex =
    STAGES.findIndex(
      (item) => item.key === stage,
    );

  const visibleStages = STAGES.filter(
    (stage) => stage.key !== "COMPLETED",
  );

  return (
    <div className="space-y-4">

      {visibleStages.map((item, index) => {
        const Icon = item.icon;

        const completed =
          index < currentIndex;

        const current =
          index === currentIndex;

        return (
          <div
            key={item.key}
            className="flex gap-4"
          >

            <div className="flex flex-col items-center">

              {completed ? (
                <CheckCircle
                  size={20}
                  className="text-green-600"
                />
              ) : current ? (
                <LoaderCircle
                  size={20}
                  className="animate-spin text-blue-600"
                />
              ) : (
                <Icon
                  size={20}
                  className="text-slate-400"
                />
              )}

              {index !== visibleStages.length - 1 && (
                <div className="mt-2 h-8 w-px bg-slate-300" />
              )}

            </div>

            <div>

              <p
                className={
                  current
                    ? "font-semibold"
                    : completed
                      ? "text-slate-900"
                      : "text-slate-500"
                }
              >
                {item.title}
              </p>

              <p className="text-sm text-slate-400">
                {item.description}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}