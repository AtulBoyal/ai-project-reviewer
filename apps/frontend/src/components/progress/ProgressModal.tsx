import { useEffect } from "react";
import { X } from "lucide-react";

import CurrentStageCard from "./CurrentStageCard";
import ProgressBar from "./ProgressBar";
import StageTimeline from "./StageTimeline";

import type { AnalysisProgress } from "../../types/progress";

interface Props {
  progress: AnalysisProgress;
  onClose: () =>void;
}

export default function ProgressModal({
  progress,
  onClose,
}: Props) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-6">

        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between border-b bg-white p-6">
            <div>
              <h2 className="text-3xl font-bold">
                {progress.stage === "COMPLETED"
                  ? "Analysis Completed"
                  : "Analyzing Repository"}
              </h2>

              <p className="mt-2 text-slate-500">
                Professional engineering review in progress.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[calc(90vh-96px)] space-y-6 overflow-y-auto p-6">

            <CurrentStageCard
              stage={progress.stage}
            />

            <ProgressBar />

            <StageTimeline
              stage={progress.stage}
            />

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="font-semibold">
                Current Status
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {progress.message}
              </p>

              <p className="mt-4 text-xs text-slate-400">
                AI reviews are generated from repository
                metadata and source code.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}