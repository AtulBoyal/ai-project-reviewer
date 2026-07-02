import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function WeaknessesCard({
  report,
}: Props) {
  return (
    <SectionCard title="Weaknesses">
      <ul className="list-disc space-y-2 pl-6">
        {report.weaknesses.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>

            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}