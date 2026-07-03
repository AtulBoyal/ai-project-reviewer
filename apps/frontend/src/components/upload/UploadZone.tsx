import { useRef } from "react";
import { FolderUp, UploadCloud } from "lucide-react";
import { MAX_UPLOAD_SIZE } from "../../constants/upload";

interface Props {
  onFileSelected(file: File): void;
}

export default function UploadZone({
  onFileSelected,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      onFileSelected(file);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".zip"
        onChange={handleChange}
      />

      <div
        onClick={handleClick}
        className="
          group
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          border-slate-300
          bg-white
          p-14
          text-center
          shadow-sm
          transition-all
          duration-300
          hover:border-blue-500
          hover:bg-blue-50/40
          hover:shadow-lg
        "
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110">
          <UploadCloud
            size={36}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          Upload Repository
        </h2>

        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Select a ZIP archive containing your GitHub repository.
          Our AI will analyze the architecture, code quality,
          engineering practices, and generate a professional review.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition group-hover:bg-blue-700">
          <FolderUp size={18} />
          Choose ZIP File
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-600">
          <p className="font-semibold text-slate-800">
            Upload Requirements
          </p>

          <ul className="mt-2 space-y-1">
            <li>• Maximum upload size: <strong>{MAX_UPLOAD_SIZE / 1024 / 1024} MB</strong></li>
            <li>• Maximum analyzed source code: <strong>50 MB</strong></li>
            <li>• Generated folders (node_modules, dist, build, .git, etc.) are skipped automatically.</li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Supported format: <span className="font-medium">.zip</span>
        </p>
      </div>
    </>
  );
}