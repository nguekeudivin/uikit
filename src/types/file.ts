import { IdType } from "./shared";

export interface FileItem {
  id: IdType;
  name: string;
  size: number;
  type: string;
}

export interface Folder {
  id: IdType;
  name: string;
  files?: File[];
  folders?: Folder[];
  starred?: boolean;
  size?: number;
  users?: any[];
}
