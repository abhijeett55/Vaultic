export interface FileMetaData {
  id: number;
  userId?: string;

  name: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  tags: string;
  
  uploadDate: string;
}
