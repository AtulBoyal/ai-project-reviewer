import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Page({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-5xl px-6 py-16">

        {children}

      </div>

    </main>
  );
}