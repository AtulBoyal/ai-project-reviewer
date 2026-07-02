import { extractRepositoryArchive } from "./extraction/extraction.service.js";
import { traverseRepository } from "./traversal/traversal.service.js";
import { filterRepository } from "./filtering/filtering.service.js";
import { readRepository } from "./reader/reader.service.js";
import { buildRepositoryMetadata } from "./metadata/metadata.service.js";
import { progressService } from "../progress/progress.service.js";
import { logger } from "../logger/logger.service.js";

import type { RepositoryMetadata } from "../types/repository.js";

export async function processRepository(
  zipFilePath: string,
  extractionDirectory: string,
): Promise<RepositoryMetadata> {
  progressService.setStage(
    "EXTRACTING",
  );

  const repositoryRoot =
    await extractRepositoryArchive(
      zipFilePath,
      extractionDirectory,
    );
  
  await logger.info(
    "Repository extracted",
  );

  progressService.setStage(
    "READING_REPOSITORY",
  );

  const tree =
    await traverseRepository(
      repositoryRoot,
    );
  
  await logger.info(
    "Repository traversed",
  );

  const filtered =
    filterRepository(tree);

  const content =
    await readRepository(filtered);
  
  await logger.info(
    "Repository files loaded",
  );

  progressService.setStage(
    "BUILDING_METADATA",
  );

  await logger.info(
    "Repository metadata generated",
  );

  return buildRepositoryMetadata(
    content,
    tree,
  );
}