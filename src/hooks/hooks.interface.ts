// CustomUploadTypes.ts
export type UploadProgress= {
  percent: number;
}

export interface UploadSuccess {
  downloadUrl: string;
}

export interface UploadError {
  message: string;
}

export type UploadState = UploadProgress | UploadSuccess | UploadError;

export interface CustomUploadHook {
  progress:number;
  successData: UploadSuccess | null;
  error: UploadError | null;
  onUpload: (file: File) => void;
}
