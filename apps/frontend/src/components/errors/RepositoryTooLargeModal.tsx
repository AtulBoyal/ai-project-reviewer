import { AlertTriangle, X } from "lucide-react";

import type { RepositoryTooLargeResponse } from "../../types/errors";

interface Props {
  error: RepositoryTooLargeResponse;
  onClose: () => void;
}

export default function RepositoryTooLargeModal({
  error,
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
            <div className="rounded-2xl bg-amber-100 p-3">
              <AlertTriangle
                size={30}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Repository Too Large
              </h2>

              <p className="mt-1 text-slate-500">
                The analyzable source code exceeds the supported limit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                Analyzable Source Code
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-800">
                {error.analyzableSizeMB} MB
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">
                Supported Limit
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {error.limitMB} MB
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-5">
            <h3 className="font-semibold text-blue-900">
              Already Ignored Automatically
            </h3>

            <p className="mt-2 text-sm text-blue-800">
              <code>node_modules</code>,{" "}
              <code>.git</code>,{" "}
              <code>dist</code>,{" "}
              <code>build</code>, images,
              binaries and other generated files are
              <strong> not included</strong> in this calculation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              To continue
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
              <li>Remove unnecessary source folders.</li>
              <li>Remove duplicated projects.</li>
              <li>Exclude large datasets.</li>
              <li>Analyze one project at a time.</li>
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