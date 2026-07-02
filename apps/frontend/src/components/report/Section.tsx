import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Section({
  title,
  children,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>

      <div className="space-y-5 p-6">
        {children}
      </div>
    </section>
  );
}