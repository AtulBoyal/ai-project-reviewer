import type { PropsWithChildren } from "react";

export default function ReportGrid({
  children,
}: PropsWithChildren) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {children}
    </div>
  );
}