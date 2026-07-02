import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function SummaryCard({
  report,
}: Props) {
  return (
    <SectionCard title="Project Summary">
      <h3 className="text-lg font-semibold">
        {report.summary.purpose}
      </h3>

      <p className="mt-3 text-slate-600">
        {report.summary.description}
      </p>
    </SectionCard>
  );
}