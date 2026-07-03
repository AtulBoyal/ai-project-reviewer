export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            RepoInsight AI
          </h1>

          <p className="text-sm text-slate-500">
            AI Powered Repository Engineering Review
          </p>
        </div>
      </div>
    </header>
  );
}