export interface PreviewFileData {
  fileName?: string,
  fileData?: string,
  contentType?: string,
  file: Blob,
}

export interface BlobData {
  fileName: string,
  fileData: string,
  fileType: string,
}
