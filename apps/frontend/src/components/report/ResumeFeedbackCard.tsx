import type { EngineeringReport } from "../../types/report";
import ScoreBadge from "../common/ScoreBadge";
import BulletList from "./BulletList";
import ReportSubsection from "./ReportSubsection";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function ResumeFeedbackCard({
  report,
}: Props) {
  return (
    <SectionCard title="Resume Feedback">
      <div className="mb-5">
        <span className="text-lg font-bold">
          <ScoreBadge
            score={report.resumeFeedback.score}
          />
        </span>
      </div>

      <p className="text-slate-700">
        {report.resumeFeedback.summary}
      </p>

      <h3 className="mt-6 font-semibold">
        Suggestions
      </h3>

      <ReportSubsection title="Strengths">
        <BulletList items={report.resumeFeedback.strengths} />
      </ReportSubsection>

      <ReportSubsection title="Weaknesses">
        <BulletList items={report.resumeFeedback.improvements} />
      </ReportSubsection>

      <ReportSubsection title="Recommendations">
        <BulletList items={report.resumeFeedback.bestResumeBullets} />
      </ReportSubsection>
    </SectionCard>
  );
}