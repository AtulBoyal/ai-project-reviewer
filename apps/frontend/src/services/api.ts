import axios from "axios";

import type { AnalyzeRepositoryResponse } from "../types/report";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function analyzeRepository(
  file: File,
): Promise<AnalyzeRepositoryResponse> {
  const formData = new FormData();

  formData.append("repository", file);

  const response = await api.post<AnalyzeRepositoryResponse>(
    "/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function getProgress() {
    const response =
        await axios.get(
            "http://localhost:5000/api/progress",
        );

    return response.data;
}