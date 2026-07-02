import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function StrengthsCard({
  report,
}: Props) {
  return (
    <SectionCard title="Strengths">
      <ul className="list-disc space-y-2 pl-6">
        {report.strengths.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>

            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}