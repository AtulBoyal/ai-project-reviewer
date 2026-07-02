import type { PropsWithChildren } from "react";

import { AnalysisContext } from "../context/AnalysisContext";
import { useAnalysis } from "../hooks/useAnalysis";

export default function AnalysisProvider({
  children,
}: PropsWithChildren) {
  const analysis = useAnalysis();

  return (
    <AnalysisContext.Provider
      value={analysis}
    >
      {children}
    </AnalysisContext.Provider>
  );
}