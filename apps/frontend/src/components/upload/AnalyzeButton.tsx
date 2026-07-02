import { LoaderCircle, Sparkles } from "lucide-react";

interface Props {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function AnalyzeButton({
  loading,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle
            size={20}
            className="animate-spin"
          />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles size={20} />
          Analyze Repository
        </>
      )}
    </button>
  );
}