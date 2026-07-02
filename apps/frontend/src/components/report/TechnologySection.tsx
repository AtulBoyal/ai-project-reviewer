import BulletList from "./BulletList";
import Section from "./Section";

interface Props {
  title: string;

  items: string[];
}

export default function TechnologySection({
  title,
  items,
}: Props) {
  return (
    <Section title={title}>
      <BulletList items={items} />
    </Section>
  );
}