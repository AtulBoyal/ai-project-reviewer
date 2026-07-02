interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <header className="mb-12 text-center">

      <h1 className="text-5xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        {subtitle}
      </p>

    </header>
  );
}