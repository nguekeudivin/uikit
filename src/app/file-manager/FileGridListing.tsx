"use client";

import { Grid2x2X, Plus } from "lucide-react";
import {
  EllipsisVertical,
  Link,
  Pencil,
  Share2,
  Star,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileIcon from "../../components/common/FileIcon";
import { formatFileSize } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFile } from "../file/FileContext";
import UploadFileDialog from "../file/UploadFileDialog";
import CreateFolderDialog from "../file/CreateFolderDialog";

const FileCard = ({ index, item }: { index: number; item: any }) => {
  return (
    <div key={`folders${index}`}>
      <div className="relative p-4 border  p-4 rounded-lg border">
        <FileIcon name={item.type} className="w-8 h-8" />
        <p className="font-semibold truncate mt-2">{item.name}</p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
          <span>{formatFileSize(item.size)}</span>
          <span>{300} files</span>
        </p>
        <div className="h-8 pt-4">
          {item.users.length != 0 && (
            <div className="flex items-center relative mt-2">
              {item.users.slice(0, 2).map((user: any, userIndex: number) => (
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
                  // setTimeout(() => {
                  //   startEditFolder(item);
                  // }, 50);
                }}
              >
                <Pencil />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // setTimeout(() => {
                  //   deleteFolder(item.id);
                  // }, 50);
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
  );
};

export default function FileGridListing({ table }: { table: any }) {
  const { setOpenUpload, setOpenFolderDialog } = useFile();

  const getFolders = () => {
    return table
      .getRowModel()
      .rows.filter((row: any) => row.original.type == "folder");
  };

  const getFiles = () => {
    return table
      .getRowModel()
      .rows.filter((row: any) => row.original.type != "folder");
  };

  return (
    <>
      <UploadFileDialog />
      <div>
        {table.getRowModel().rows?.length ? (
          <div className="space-y-6">
            <Accordion type="single" defaultValue="item-1" collapsible>
              <AccordionItem value="item-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="flex items-center text-xl font-semibold gap-2">
                      Folders
                      <button
                        onClick={() => {
                          setOpenFolderDialog(true);
                        }}
                        className="p-1 rounded-full bg-primary text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <CreateFolderDialog />
                    </h3>
                    <p className="text-muted-foreground gap-2 mt-1">
                      <span>{getFolders().length} </span>
                      <span>Folders</span>
                    </p>
                  </div>

                  <AccordionTrigger className="text-xl font-semibold"></AccordionTrigger>
                </div>

                <AccordionContent className="mt-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {getFolders().map((row: any, index: number) => {
                      const item = row.original;
                      return (
                        <FileCard
                          key={`file-${index}`}
                          index={index}
                          item={item}
                        />
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" defaultValue="item-1" collapsible>
              <AccordionItem value="item-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="flex items-center text-xl font-semibold gap-2">
                      Files
                      <button
                        onClick={() => {
                          setOpenUpload(true);
                        }}
                        className="bg-sky-600 text-white rounded-full text-sm p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </h3>
                    <p className="flex text-muted-foreground gap-1 mt-1">
                      <span>{getFiles().length}</span>
                      <span>Files</span>
                    </p>
                  </div>

                  <AccordionTrigger className="text-xl font-semibold"></AccordionTrigger>
                </div>
                <AccordionContent className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {getFiles().map((row: any, index: number) => {
                      const item = row.original;
                      return (
                        <FileCard
                          key={`file-${index}`}
                          index={index}
                          item={item}
                        />
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <div className="h-[300px]  bg-gray-100 m-4 flex items-center justify-center rounded-xl border border-dashed">
            <div className="flex flex-col items-center text-muted-foreground">
              <Grid2x2X className="w-12 h-12 " />
              <p className="text-xl mt-2">No data</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
