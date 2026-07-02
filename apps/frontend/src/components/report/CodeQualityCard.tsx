import type { EngineeringReport } from "../../types/report";
import ScoreBadge from "../common/ScoreBadge";
import BulletList from "./BulletList";
import ReportSubsection from "./ReportSubsection";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function CodeQualityCard({
  report,
}: Props) {
  return (
    <SectionCard title="Code Quality">
      <div className="mb-5">
        <span className="text-lg font-bold">
          <ScoreBadge
            score={report.codeQuality.score}
          />
        </span>
      </div>

      <h3 className="font-semibold">
        Observations
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
    </SectionCard>
  );
}