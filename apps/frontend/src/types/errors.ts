export interface RepositoryTooLargeResponse {
  success: false;

  error: "REPOSITORY_TOO_LARGE";

  message: string;

  analyzableSizeMB: number;

  limitMB: number;
}

export interface UploadTooLargeResponse {
  success: false;

  error: "UPLOAD_TOO_LARGE";

  message: string;
}