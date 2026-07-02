import type { RepositoryFile } from "../../types/repository.js";

import type { RepositoryEvidence } from "./evidence.types.js";

import { buildAnnotationEvidence } from "../static-analysis/todo-evidence.js";
import { buildFunctionEvidence } from "./function-evidence.js";
import { buildLoggingEvidence } from "./logging-evidence.js";
import { buildTypeScriptEvidence } from "./typescript-evidence.js";

/**
 * Builds complete repository evidence.
 *
 * Unlike repository metrics, evidence contains exact
 * locations inside the repository which can later be
 * referenced by the AI while generating explanations.
 */
export function buildRepositoryEvidence(
  files: RepositoryFile[],
): RepositoryEvidence {
  const functions =
    buildFunctionEvidence(files);

  const logging =
    buildLoggingEvidence(files);

  const typescript =
    buildTypeScriptEvidence(files);

  const annotations =
    buildAnnotationEvidence(files);

  return {
    functions,
    logging,
    typescript,
    annotations,
  };
}