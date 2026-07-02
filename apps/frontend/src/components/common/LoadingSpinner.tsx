export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

      <p className="mt-5 text-slate-600">
        AI is reviewing your repository...
      </p>
    </div>
  );
}