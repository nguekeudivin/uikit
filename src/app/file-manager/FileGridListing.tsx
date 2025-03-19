"use client";

import { Grid2x2X } from "lucide-react";

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
import FileIcon from "../../components/common/FileIcon";
import { formatFileSize } from "@/lib/utils";

export default function FileGridListing({ table }: { table: any }) {
  return (
    <>
      <div>
        {table.getRowModel().rows?.length ? (
          <div className="grid grid-cols-4 gap-6">
            {table.getRowModel().rows.map((row: any, index: number) => {
              const item = row.original;
              return (
                <div key={`folders${index}`}>
                  <div className="relative p-4 border  p-4 rounded-lg border">
                    <FileIcon name={item.type} className="w-8 h-8" />
                    <p className="font-semibold text-lg truncate">
                      {item.name}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                      <span>{formatFileSize(item.size)}</span>
                      <span>{300} files</span>
                    </p>
                    <div className="h-8 pt-4">
                      {item.users.length != 0 && (
                        <div className="flex items-center relative mt-2">
                          {item.users
                            .slice(0, 2)
                            .map((user: any, userIndex: number) => (
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
            })}
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
