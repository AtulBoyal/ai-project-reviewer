import Section from "./Section";

import type { InterviewQuestion } from "../../../../backend/src/ai/report/report.types";

interface Props {
  questions: InterviewQuestion[];
}

export default function InterviewSection({
  questions,
}: Props) {
  return (
    <Section title="Interview Questions">
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-lg border p-5"
          >
            <h3 className="font-semibold">
              {question.question}
            </h3>

            <div className="mt-3 flex gap-4 text-sm text-gray-600">
              <span>
                Difficulty:{" "}
                {question.difficulty}
              </span>

              <span>
                Category:{" "}
                {question.category}
              </span>
            </div>

            <p className="mt-4">
              <strong>Why:</strong>{" "}
              {question.reason}
            </p>

            <p className="mt-4">
              <strong>Expected Answer:</strong>{" "}
              {question.expectedAnswer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}