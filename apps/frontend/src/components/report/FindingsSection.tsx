import Section from "./Section";
import FindingCard from "./FindingCard";

interface Finding {
  title: string;

  description: string;
}

interface Props {
  title: string;

  findings: Finding[];
}

export default function FindingsSection({
  title,
  findings,
}: Props) {
  return (
    <Section title={title}>
      <div className="space-y-4">
        {findings.map((finding) => (
          <FindingCard
            key={finding.title}
            title={finding.title}
            description={
              finding.description
            }
          />
        ))}
      </div>
    </Section>
  );
}