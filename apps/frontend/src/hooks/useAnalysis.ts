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
import { MAX_UPLOAD_SIZE } from "../constants/upload";

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
    setResult(null);
    setError("");
    setUploadTooLargeError(null);
    setRepositoryLimitError(null);

    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadTooLargeError({
        success: false,
        error: "UPLOAD_TOO_LARGE",
        message: `Maximum upload size is ${
          MAX_UPLOAD_SIZE / 1024 / 1024
        } MB.`,
      });

      return;
    }

    setProgress({
      stage: "UPLOADING",
      message: "",
      percentage: 5,
    });

    let analysisStarted = false;
    
    setLoading(true);

    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(async () => {
      try {
        const latest = await getProgress();

        if (
          !analysisStarted &&
          latest.stage === "COMPLETED"
        ) {
          // Ignore stale completion from previous analysis
          return;
        }

        analysisStarted = true;

        setProgress(latest);

        if (
          latest.stage === "COMPLETED" ||
          latest.stage === "FAILED"
        ) {
          clearInterval(interval);
        }
      } catch {
        // Ignore polling failures
      }
    }, 500);

    setError("");

    try {
      const response =
        await analyzeRepository(file);

      console.log("Analyze response:", response);

      clearInterval(interval);

      setResult(response);

      console.log("Result state updated");

      setProgress({
        stage: "COMPLETED",
        message: "Analysis completed.",
        percentage: 100,
      });

      console.log("Progress set to completed.");
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        // Handle explicit backend upload size error
        if (
          error.response?.status === 413 ||
          data?.error === "UPLOAD_TOO_LARGE"
        ) {
          setUploadTooLargeError({
            success: false,
            error: "UPLOAD_TOO_LARGE",
            message:
              data?.message ??
              "The selected ZIP file exceeds the maximum upload size (500 MB).",
          });

          setProgress({
            stage: "IDLE",
            message: "",
            percentage: 0,
          });

          return;
        }

        // Handle repository source-code size limit
        if (data?.error === "REPOSITORY_TOO_LARGE") {
          setRepositoryLimitError(data);

          setProgress({
            stage: "IDLE",
            message: "",
            percentage: 0,
          });

          return;
        }

        // Browser/network aborted upload
        if (
          error.code === "ERR_NETWORK" ||
          error.code === "ECONNABORTED"
        ) {
          setUploadTooLargeError({
            success: false,
            error: "UPLOAD_TOO_LARGE",
            message:
              "The upload could not be completed. The file is likely too large or the connection was interrupted.",
          });

          setProgress({
            stage: "IDLE",
            message: "",
            percentage: 0,
          });

          return;
        }
      }

      if (error instanceof Error) {
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