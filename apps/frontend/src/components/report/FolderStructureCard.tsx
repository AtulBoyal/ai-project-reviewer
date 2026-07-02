import type { EngineeringReport } from "../../types/report";
import ScoreBadge from "../common/ScoreBadge";
import BulletList from "./BulletList";
import ReportSubsection from "./ReportSubsection";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function FolderStructureCard({
  report,
}: Props) {
  return (
    <SectionCard title="Folder Structure">
      <div className="mb-5">
        <span className="text-lg font-bold">
          <ScoreBadge
            score={report.folderStructure.score}
          />
        </span>
      </div>

      <h3 className="font-semibold">
        Comments
      </h3>

      <ReportSubsection title="Strengths">
        <BulletList items={report.folderStructure.positives} />
      </ReportSubsection>

      <ReportSubsection title="Weaknesses">
        <BulletList items={report.folderStructure.negatives} />
      </ReportSubsection>

      <ReportSubsection title="Recommendations">
        <BulletList items={report.folderStructure.recommendations} />
      </ReportSubsection>

      {/* <ul className="mt-2 list-disc space-y-2 pl-6">
        {report.folderStructure.positives.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <ul className="mt-2 list-disc space-y-2 pl-6">
        {report.folderStructure.negatives.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold">
        Recommendations
      </h3>

      <ul className="mt-2 list-disc space-y-2 pl-6">
        {report.folderStructure.recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}
    </SectionCard>
  );
}