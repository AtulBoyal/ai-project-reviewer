import { useContext } from "react";

import { AnalysisContext } from "../context/AnalysisContext";

export function useAnalysisContext() {
  const context = useContext(
    AnalysisContext,
  );

  if (!context) {
    throw new Error(
      "useAnalysisContext must be used inside AnalysisProvider.",
    );
  }

  return context;
}