import { Upload } from "lucide-react";
import type { ChangeEvent } from "react";

interface UploadDropzoneProps {
  selectedFile: File | null;
  onFileSelected: (file: File | null) => void;
}

export default function UploadDropzone({
  selectedFile,
  onFileSelected,
}: UploadDropzoneProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;

    onFileSelected(file);
  }

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 transition hover:border-slate-500 hover:bg-slate-100">
      <Upload
        className="mb-4 text-slate-600"
        size={40}
      />

      <h3 className="text-lg font-semibold">
        Upload Repository ZIP
      </h3>

      <p className="mt-2 text-center text-sm text-slate-500">
        Click here to select a ZIP archive of your
        project.
      </p>

      {selectedFile && (
        <div className="mt-5 rounded-md bg-white px-4 py-2 text-sm shadow">
          {selectedFile.name}
        </div>
      )}

      <input
        hidden
        type="file"
        accept=".zip"
        onChange={handleChange}
      />
    </label>
  );
}