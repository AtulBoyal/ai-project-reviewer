import ImprovementCard from "./ImprovementCard";
import Section from "./Section";

import type { Improvement } from "../../../../backend/src/ai/report/report.types";

interface Props {
  improvements: Improvement[];
}

export default function ImprovementsSection({
  improvements,
}: Props) {
  return (
    <Section title="Improvement Suggestions">
      <div className="space-y-5">
        {improvements.map((item) => (
          <ImprovementCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </Section>
  );
}