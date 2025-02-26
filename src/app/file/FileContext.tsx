"use client";

import { FileItem, Folder } from "@/types/file";
import { IdType } from "@/types/shared";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";

interface FileContextType {
  openUpload: boolean;
  handleUploadedFiles: (files: File[]) => void;
  setOpenUpload: Dispatch<SetStateAction<boolean>>;
  createFolder: ({ name, files }: Folder) => void;
  editFolder: (id: IdType, item: Partial<Folder>) => void;
  deleteFolder: (id: IdType) => void;
}

export interface FileProvideProps {
  children: ReactNode;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const useFile = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};
