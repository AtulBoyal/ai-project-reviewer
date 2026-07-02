import BulletList from "./BulletList";
import Section from "./Section";

interface Props {
  summary: string;

  strengths: string[];

  weaknesses: string[];

  scalability: string;

  maintainability: string;
}

export default function ArchitectureSection({
  summary,
  strengths,
  weaknesses,
  scalability,
  maintainability,
}: Props) {
  return (
    <Section title="Architecture Review">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">
            Summary
          </h3>

          <p className="mt-2">
            {summary}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Architecture Strengths
          </h3>

          <BulletList items={strengths} />
        </div>

        <div>
          <h3 className="font-semibold">
            Architecture Weaknesses
          </h3>

          <BulletList items={weaknesses} />
        </div>

        <div>
          <h3 className="font-semibold">
            Scalability
          </h3>

          <p className="mt-2">
            {scalability}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Maintainability
          </h3>

          <p className="mt-2">
            {maintainability}
          </p>
        </div>
      </div>
    </Section>
  );
}