"use client";

import {
  ChevronRight,
  EllipsisVertical,
  Folder,
  Link,
  Pencil,
  Plus,
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
import { format } from "date-fns";
import { useFile } from "./FileContext";

const items = [
  {
    name: "cover-2.jpg",
    size: "45.78 Mb",
    date: "26 Feb 2025 12:36 pm",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
      {
        image: "/assets/images/avatar/avatar-3.webp",
      },
      {
        image: "/assets/images/avatar/avatar-4.webp",
      },
      {
        image: "/assets/images/avatar/avatar-5.webp",
      },
    ],
  },
  {
    name: "design-suriname-2015.mp3",
    size: "22.89 Mb",
    date: "25 Feb 2025 11:36 am",
    starred: false,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
      {
        image: "/assets/images/avatar/avatar-3.webp",
      },
      {
        image: "/assets/images/avatar/avatar-4.webp",
      },
    ],
  },
  {
    name: "expertise-2015-conakry-sao-tome-and-principe-gender.mp4",
    size: "15.26 Mb",
    date: "24 Feb 2025 10:36 am",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
      {
        image: "/assets/images/avatar/avatar-2.webp",
      },
    ],
  },
  {
    name: "money-popup-crack.pdf",
    size: "11.44 Mb",
    date: "23 Feb 2025 9:36 am",
    starred: true,
    users: [
      {
        image: "/assets/images/avatar/avatar-1.webp",
      },
    ],
  },
  {
    name: "cover-4.jpg",
    size: "9.16 Mb",
    date: "22 Feb 2025 8:36 am",
    starred: false,
    users: [],
  },
];

export default function RecentFiles() {
  const { setOpenUpload } = useFile();

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Recent files</h3>
          <button
            onClick={() => {
              setOpenUpload(true);
            }}
            className="p-1 rounded-full bg-primary text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div>
          <button className="inline-flex items-center gap-2">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-6">
        {items.map((item, index) => (
          <div
            key={`file${index}`}
            className="border p-4 relative rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <FileIcon name={item.name} />
              </div>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.size}</span>{" "}
                  <span>{format(item.date, "dd MMM yyyy hh:mm a")}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="">
                {item.users.length != 0 && (
                  <div className="flex items-center relative mt-2">
                    {item.users.slice(0, 2).map((user, userIndex) => (
                      <div
                        key={`fileuser${index}${userIndex}`}
                        style={{
                          right: `${(userIndex + 1) * 25}px`,
                          backgroundImage: `url(${user.image})`,
                        }}
                        className={`z-${
                          userIndex * 10
                        } absolute w-8 h-8 bg-cover rounded-full border border-white`}
                      ></div>
                    ))}
                    {item.users.length > 2 && (
                      <div className="right-[0px] text-sm font-semibold z-5 absolute w-8 h-8 rounded-full bg-primary/10 text-primary border-primary flex items-center justify-center">
                        +{item.users.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>

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
                  <DropdownMenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100">
                    <Trash className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
