import Section from "./Section";

interface Props {
  purpose: string;

  summary: string;
}

export default function OverviewSection({
  purpose,
  summary,
}: Props) {
  return (
    <Section title="Project Summary">
      <div className="space-y-5">
        <div>
          <h3 className="font-semibold">
            Purpose
          </h3>

          <p className="mt-2">
            {purpose}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Overview
          </h3>

          <p className="mt-2">
            {summary}
          </p>
        </div>
      </div>
    </Section>
  );
}