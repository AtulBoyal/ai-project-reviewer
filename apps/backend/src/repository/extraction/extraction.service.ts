import fsPromises from "node:fs/promises";
import path from "node:path";
import extract from "extract-zip";

export async function extractRepositoryArchive(
  zipFilePath: string,
  extractionDirectory: string,
): Promise<string> {
  await fsPromises.mkdir(extractionDirectory, {
    recursive: true,
  });

  await extract(zipFilePath, {
    dir: path.resolve(extractionDirectory),
  });

  const entries = await fsPromises.readdir(
    extractionDirectory,
    { withFileTypes: true },
  );

  const directories = entries.filter((entry) =>
    entry.isDirectory(),
  );

  if (directories.length === 1) {
    return path.join(
      extractionDirectory,
      directories[0].name,
    );
  }

  return extractionDirectory;
}