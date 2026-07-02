import { useState } from "react";
import axios from "axios";

import { analyzeRepository } from "../services/api";
import type { AnalyzeRepositoryResponse } from "../types/report";
import type { AnalysisProgress } from "../types/progress";
import type {
  RepositoryTooLargeResponse,
  UploadTooLargeResponse,
} from "../types/errors";
import { getProgress } from "../services/api";

export function useAnalysis() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [
    repositoryLimitError,
    setRepositoryLimitError,
  ] =
    useState<RepositoryTooLargeResponse | null>(
      null,
    );

  const [
    uploadTooLargeError,
    setUploadTooLargeError,
  ] =
    useState<UploadTooLargeResponse | null>(
      null,
    );

  const [result, setResult] =
    useState<AnalyzeRepositoryResponse | null>(null);

  const [progress, setProgress] =
    useState<AnalysisProgress>({
      stage: "IDLE",
      message: "",
      percentage: 0,
    });

  function reset() {
    setResult(null);
    setError("");
    setRepositoryLimitError(null);
    setUploadTooLargeError(null);
  }

  async function analyze(file: File) {
    setProgress({
      stage: "UPLOADING",
      message: "",
      percentage: 5,
    });

    setLoading(true);
    const interval = setInterval(
      async () => {
        try {
          const latest =
            await getProgress();

          setProgress(latest);
        } catch {}
      },
      500,
    );
    setError("");

    try {
      const response =
        await analyzeRepository(file);

      setResult(response);
      setProgress({
        stage: "COMPLETED",
        message: "Analysis completed.",
        percentage: 100,
      });
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        switch (data?.error) {
          case "UPLOAD_TOO_LARGE":
            setUploadTooLargeError(data);
            return;

          case "REPOSITORY_TOO_LARGE":
            setRepositoryLimitError(data);
            return;
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Analysis failed.");
      }

      setProgress({
        stage: "FAILED",
        message: "Analysis failed.",
        percentage: 100,
      });
    } finally {
        clearInterval(interval);

        setLoading(false);
    }
  }

  return {
    loading,
    error,

    uploadTooLargeError,
    repositoryLimitError,

    result,
    progress,
    
    analyze,
    reset,
  };
}