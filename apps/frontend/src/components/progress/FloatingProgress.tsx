import type { AnalysisProgress } from "../../types/progress";

interface Props {
    progress: AnalysisProgress;
    onOpen: () => void;
}

export default function FloatingProgress({
    progress,
    onOpen,
}: Props) {
    return (
        <button
            onClick={onOpen}
            className="
                fixed
                bottom-6
                right-6
                z-50
                rounded-xl
                border
                bg-white
                px-5
                py-4
                shadow-xl
                transition
                hover:scale-[1.02]
            "
        >
            <div className="font-semibold">
                🔄 Repository Analysis
            </div>

            <div className="mt-1 text-sm text-slate-500">
                {progress.message}
            </div>
        </button>
    );
}