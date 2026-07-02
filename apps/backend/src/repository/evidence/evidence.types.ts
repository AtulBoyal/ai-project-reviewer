/**
 * Base location inside a repository.
 */
export interface SourceLocation {
  file: string;

  line: number;
}

/**
 * Evidence for a discovered function.
 */
export interface FunctionEvidence extends SourceLocation {
  name: string;

  length: number;
}

/**
 * Evidence for logging statements.
 */
export interface LoggingEvidence extends SourceLocation {
  type:
    | "console.log"
    | "console.error"
    | "console.warn"
    | "debugger"
    | "process.exit";
}

/**
 * Evidence for TypeScript issues.
 */
export interface TypeScriptEvidence
  extends SourceLocation {
  type:
    | "any"
    | "unknown"
    | "ts-ignore"
    | "eslint-disable"
    | "type-assertion";
}

/**
 * Evidence for engineering annotations.
 */
export interface AnnotationEvidence
  extends SourceLocation {
  type:
    | "TODO"
    | "FIXME"
    | "HACK"
    | "XXX";

  text: string;

  severity: "Low" | "Medium" | "High";
}

/**
 * Complete repository evidence.
 *
 * Unlike metrics and static analysis,
 * this contains exact locations inside
 * the repository.
 */
export interface RepositoryEvidence {
  functions: FunctionEvidence[];

  logging: LoggingEvidence[];

  typescript: TypeScriptEvidence[];

  annotations: AnnotationEvidence[];
}