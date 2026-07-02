import { FileArchive, CheckCircle2 } from "lucide-react";

interface Props {
  file: File;
}

export default function SelectedFile({
  file,
}: Props) {
  const size =
    (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition-all">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-blue-100 p-3">
          <FileArchive
            className="text-blue-600"
            size={28}
          />
        </div>

        <div className="flex-1">

          <h3 className="font-semibold">
            {file.name}
          </h3>

          <p className="text-sm text-slate-500">
            {size} MB
          </p>

        </div>

        <CheckCircle2
          className="text-green-600"
          size={24}
        />

      </div>

    </div>
  );
}