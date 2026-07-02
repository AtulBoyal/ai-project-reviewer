import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ReportSubsection({
  title,
  children,
}: Props) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <div className="rounded-xl bg-slate-50 p-4">
        {children}
      </div>
    </div>
  );
}