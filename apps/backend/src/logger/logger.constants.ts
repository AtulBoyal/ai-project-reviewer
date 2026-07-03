import os from "node:os";
import path from "node:path";

export const LOG_DIRECTORY =
  path.join(os.tmpdir(), "repo-insight-ai-logs");