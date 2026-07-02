import { AlertTriangle, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function UploadTooLargeModal({
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-4 w-full max-w-xl rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-100 p-3">
              <AlertTriangle
                size={30}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Upload Too Large
              </h2>

              <p className="mt-1 text-slate-500">
                The uploaded ZIP archive exceeds the supported upload limit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
              Maximum Upload Size
            </p>

            <p className="mt-2 text-4xl font-bold text-red-600">
              500 MB
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-5">
            <h3 className="font-semibold text-red-900">
              Why this happened
            </h3>

            <p className="mt-2 text-sm text-red-800">
              The uploaded ZIP file is larger than the
              maximum supported upload size.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Suggestions
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
              <li>Remove <code>node_modules</code> before creating the ZIP.</li>
              <li>Remove <code>dist</code>, <code>build</code> and other generated folders.</li>
              <li>Upload only the project directory.</li>
              <li>Split very large repositories into smaller projects if needed.</li>
            </ul>
          </div>

          <div className="flex justify-end border-t pt-6">
            <button
              onClick={onClose}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}