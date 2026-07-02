export interface UploadedRepository {
  fileId: string;
  originalName: string;
  storedName: string;
}

export function createUploadResponse(file: Express.Multer.File): UploadedRepository {
  return {
    fileId: file.filename.replace(".zip", ""),
    originalName: file.originalname,
    storedName: file.filename,
  };
}