import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;

  value: ReactNode;
}

export default function StatusCard({
  title,
  value,
}: StatusCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}