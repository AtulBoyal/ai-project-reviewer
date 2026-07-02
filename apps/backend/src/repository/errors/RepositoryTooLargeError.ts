export class RepositoryTooLargeError extends Error {
  readonly size: number;
  readonly limit: number;

  constructor(
    size: number,
    limit: number,
  ) {
    super("Repository exceeds maximum analyzable size.");

    this.name = "RepositoryTooLargeError";

    this.size = size;
    this.limit = limit;
  }
}