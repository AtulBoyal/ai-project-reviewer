interface Props {
  items: string[];
}

export default function BulletList({
  items,
}: Props) {
  if (!items.length) {
    return (
      <p className="text-slate-500">
        No items available.
      </p>
    );
  }

  return (
    <ul className="space-y-3">

      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3"
        >
          <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />

          <span className="leading-7 text-slate-700">
            {item}
          </span>
        </li>
      ))}

    </ul>
  );
}