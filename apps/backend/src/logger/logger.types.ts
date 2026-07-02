export type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR";

export interface LogEntry {
  level: LogLevel;

  message: string;

  data?: unknown;
}