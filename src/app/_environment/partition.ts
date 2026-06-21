export interface Partition {

  id?: number;
  userId?: string;
  name: string;
  icon: string;
  status: string;
  usedSpace?: number;
  fileCount?: number;
  percentage?: number;

}