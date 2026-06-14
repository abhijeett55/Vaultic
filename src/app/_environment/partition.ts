export interface Partition {
  id?: number;
  userId?: string;

  name: string;
  icon: string;
  status: string;
  
  usedSpace: string;
  fileCount: number;
  percentage: number;
}