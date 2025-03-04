"use client";

import {
  ChevronRight,
  EllipsisVertical,
  Link,
  Pencil,
  Share2,
  Star,
  Trash,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateFormDialog from "./CreateFolderDialog";
import FileIcon from "../../components/common/FileIcon";
import { Folder } from "@/types/file";
import { formatFileSize } from "@/lib/utils";
import EditFolderDialog from "./EditFolderDialog";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import { folders } from "@/api-call/endpoints/files";
import { useFile } from "./FileContext";

export default function Folders() {
  useEffect(() => {
    const folderContainer = document.getElementById("folder-container");
    if (folderContainer) {
      folderContainer.style.width = `${folders.length * 300}px`;
    }
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const form = useSimpleForm({
    defaultValues: {
      id: "",
      name: "",
    },
    schema: z.object({
      title: z.string().min(1, "Name is required"),
    }),
  });

  const startEditFolder = (folder: Folder) => {
    form.setValue("id", folder.id);
    form.setValue("name", folder.name);
    setOpen(true);
  };

  const { deleteFolder } = useFile();

  return (
    <div>
      <EditFolderDialog form={form} setOpen={setOpen} open={open} />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Folders</h3>
          <CreateFormDialog />
        </div>
        <div>
          <button className="inline-flex items-center gap-2">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="h-[208px] overflow-hidden hover:overflow-auto w-full  scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
        <div className="mt-4 flex gap-4" id="folder-container">
          {folders.map((item, index) => (
            <div key={`folders${index}`} style={{ width: "300px" }}>
              <div className="relative p-4 border p-4 rounded-lg border">
                <FileIcon name="folder" className="w-12 h-12" />
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                  <span>{formatFileSize(item.size)}</span>
                  <span>{300} files</span>
                </p>
                <div className="h-8 pt-4">
                  {item.users.length != 0 && (
                    <div className="flex items-center relative mt-2">
                      {item.users.slice(0, 2).map((user, userIndex) => (
                        <div
                          key={`folder${item}${userIndex}`}
                          style={{
                            left: `${userIndex * 25}px`,
                            backgroundImage: `url(${user.image})`,
                          }}
                          className={`z-${
                            (2 - userIndex) * 10
                          } absolute w-8 h-8 bg-cover rounded-full border border-white`}
                        ></div>
                      ))}
                      {item.users.length > 2 && (
                        <div className="left-[50px] text-sm font-semibold z-5 absolute w-8 h-8 rounded-full bg-primary/10 text-primary border-primary flex items-center justify-center">
                          +{item.users.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button>
                    {item.starred ? (
                      <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                    ) : (
                      <Star className="text-muted-foreground w-5 h-5" />
                    )}
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="w-4 h-4 text-gray-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link />
                        <span>Copy link</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setTimeout(() => {
                            startEditFolder(item);
                          }, 50);
                        }}
                      >
                        <Pencil />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setTimeout(() => {
                            deleteFolder(item.id);
                          }, 50);
                        }}
                        className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100"
                      >
                        <Trash className="text-red-500" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
