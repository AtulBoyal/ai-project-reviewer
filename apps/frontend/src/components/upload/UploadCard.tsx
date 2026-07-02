import AnalyzeButton from "./AnalyzeButton";
import UploadDropzone from "./UploadDropzone";
import ReportViewer from "../report/ReportViewer";

import { useAnalysis } from "../../hooks/useAnalysis";
import { useState } from "react";

export default function UploadCard() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const {
    loading,
    error,
    result,
    analyze,
  } = useAnalysis();

  async function handleAnalyze() {
    if (!selectedFile) {
      return;
    }

    await analyze(selectedFile);
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">
      <UploadDropzone
        selectedFile={selectedFile}
        onFileSelected={setSelectedFile}
      />

      <div className="mt-6">
        <AnalyzeButton
          disabled={!selectedFile}
          loading={loading}
          onClick={handleAnalyze}
        />
      </div>

      {error && (
        <p className="mt-4 text-red-600">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-10">
          <ReportViewer
            result={result}
          />
        </div>
      )}
    </div>
  );
}