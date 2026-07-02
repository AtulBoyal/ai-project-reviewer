import BulletList from "./BulletList";
import ScoreCard from "./ScoreCard";
import Section from "./Section";

import type { ResumeFeedback } from "../../../../backend/src/ai/report/report.types";

interface Props {
  feedback: ResumeFeedback;
}

export default function ResumeSection({
  feedback,
}: Props) {
  return (
    <Section title="Resume Feedback">
      <div className="space-y-6">
        <ScoreCard
          title="Resume Score"
          score={feedback.score}
        />

        <p>{feedback.summary}</p>

        <div>
          <h3 className="font-semibold mb-2">
            Resume Strengths
          </h3>

          <BulletList
            items={feedback.strengths}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Improvements
          </h3>

          <BulletList
            items={feedback.improvements}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Best Resume Bullets
          </h3>

          <BulletList
            items={
              feedback.bestResumeBullets
            }
          />
        </div>
      </div>
    </Section>
  );
}