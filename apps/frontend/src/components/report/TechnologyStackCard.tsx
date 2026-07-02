import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

function Row({
  title,
  values,
}: {
  title: string;
  values: string[];
}) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-slate-600">
        {values.length === 0
          ? "-"
          : values.join(", ")}
      </p>
    </div>
  );
}

export default function TechnologyStackCard({
  report,
}: Props) {
  return (
    <SectionCard title="Technology Stack">
      <div className="rounded-lg bg-slate-50 p-3">
        <Row
          title="Frontend"
          values={report.technologyStack.languages}
        />
      </div>

      <div className="rounded-lg bg-slate-50 p-3">
        <Row
          title="Backend"
          values={report.technologyStack.frameworks}
        />
      </div>

      <div className="rounded-lg bg-slate-50 p-3">
        <Row
          title="Database"
          values={report.technologyStack.databases}
        />
      </div>

      <div className="rounded-lg bg-slate-50 p-3">
        <Row
          title="Infrastructure"
          values={
            report.technologyStack.infrastructure
          }
        />
      </div>

      <div className="rounded-lg bg-slate-50 p-3">
        <Row
          title="Other"
          values={report.technologyStack.tools}
        />
      </div>
      
    </SectionCard>
  );
}