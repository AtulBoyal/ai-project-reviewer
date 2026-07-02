interface Props {
  message: string;
}

export default function ErrorAlert({
  message,
}: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-red-700">
        {message}
      </p>
    </div>
  );
}