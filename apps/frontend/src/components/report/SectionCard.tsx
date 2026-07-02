import type { PropsWithChildren } from "react";

interface SectionCardProps extends PropsWithChildren {
  title: string;
}

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        {title}
      </h2>

      {children}
    </section>
  );
}