import { FileStack, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import FileIcon from "@/components/common/FileIcon";

interface UploadFileFormProps {
  handleUpload: (File: []) => void;
}

export default function UploadFileForm({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) {
  const upload = (event: any) => {
    setFiles(Array.from(event.target.files));
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className="mt-4 rounded-xl bg-gray-100 border w-full h-64 flex flex-col items-center justify-center w-full"
      >
        <FileStack className="w-12 h-12 text-primary" />
        <span className="text-xl font-semibold mt-4">Drop or select file</span>
        <span className="text-muted-foreground mt-2">
          Drop files here or click to
          <span className="text-green-600 underline">browser</span> through your
          machine
        </span>
      </label>
      <input
        type="file"
        multiple={true}
        id="fileInput"
        className="hidden"
        name="fileInput"
        onChange={upload}
      />
      <div className="max-h-[400px] overflow-hidden hover:overflow-auto w-full  scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
        {files.length != 0 && (
          <ul className="space-y-4">
            {files.map((item, index) => (
              <li
                key={`uploadedFile${index}`}
                className="border px-4 py-2 rounded-md flex items-center justify-between"
              >
                {/* <p className="">{item.name}</p> */}
                <div className="flex items-center gap-2">
                  <div>
                    <FileIcon name={item.name} />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <span>{item.size}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, i) => i != index));
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
