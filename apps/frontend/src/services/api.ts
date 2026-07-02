import axios from "axios";

import type { AnalyzeRepositoryResponse } from "../types/report";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:5000/api",
});

export async function analyzeRepository(
  file: File,
): Promise<AnalyzeRepositoryResponse> {
  const formData = new FormData();

  formData.append("repository", file);

  const response =
    await api.post<AnalyzeRepositoryResponse>(
      "/analyze",
      formData,
    );

  return response.data;
}

export async function getProgress() {
  const response =
    await api.get("/progress");

  return response.data;
}