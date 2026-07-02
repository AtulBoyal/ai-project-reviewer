import type { EngineeringReport } from "../../types/report";
import SectionCard from "./SectionCard";

interface Props {
  report: EngineeringReport;
}

export default function InterviewQuestionsCard({
  report,
}: Props) {
  return (
    <SectionCard title="Interview Questions">
      <div className="space-y-5">
        {report.interviewQuestions.map((question) => (
          <div
            key={question.question}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <h3 className="text-lg font-semibold">
              {question.question}
            </h3>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {question.difficulty}
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {question.category}
              </span>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Why this is asked
              </h4>

              <p className="mt-2 leading-7 text-slate-600">
                {question.reason}
              </p>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Expected Answer
              </h4>

              <p className="mt-2 whitespace-pre-line leading-7 text-slate-600">
                {question.expectedAnswer}
              </p>
            </div>

          </div>
        ))}
      </div>
    </SectionCard>
  );
}