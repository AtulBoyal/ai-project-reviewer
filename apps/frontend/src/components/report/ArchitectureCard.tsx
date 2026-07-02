import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";
import ReportSubsection from "./ReportSubsection";
import BulletList from "./BulletList";

interface Props {
  report: EngineeringReport;
}

export default function ArchitectureCard({
  report,
}: Props) {
  return (
    <SectionCard title="Architecture Review">
      <p className="text-slate-700">
        {report.architecture.summary}
      </p>

      <ReportSubsection title="Strengths">
        <BulletList items={report.architecture.strengths} />
      </ReportSubsection>

      <ReportSubsection title="Weaknesses">
        <BulletList items={report.architecture.weaknesses} />
      </ReportSubsection>

      <ReportSubsection title="Scalability">
        <p>{report.architecture.scalability}</p>
      </ReportSubsection>

      <ReportSubsection title="Maintainability">
        <p>{report.architecture.maintainability}</p>
      </ReportSubsection>
    </SectionCard>
  );
}