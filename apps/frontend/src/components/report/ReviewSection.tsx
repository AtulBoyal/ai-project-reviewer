import BulletList from "./BulletList";
import ScoreCard from "./ScoreCard";
import Section from "./Section";

interface Props {
  title: string;

  score: number;

  positives: string[];

  negatives: string[];

  recommendations: string[];
}

export default function ReviewSection({
  title,
  score,
  positives,
  negatives,
  recommendations,
}: Props) {
  return (
    <Section title={title}>
      <div className="space-y-6">
        <ScoreCard
          title="Score"
          score={score}
        />

        <div>
          <h3 className="font-semibold">
            Positives
          </h3>

          <BulletList items={positives} />
        </div>

        <div>
          <h3 className="font-semibold">
            Negatives
          </h3>

          <BulletList items={negatives} />
        </div>

        <div>
          <h3 className="font-semibold">
            Recommendations
          </h3>

          <BulletList
            items={recommendations}
          />
        </div>
      </div>
    </Section>
  );
}