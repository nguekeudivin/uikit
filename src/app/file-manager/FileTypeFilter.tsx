import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FileIcon from "@/components/common/FileIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FileTypeFilterProps {
  selected: string;
  select: any;
}

export default function FileTypeFilter({
  selected,
  select,
}: FileTypeFilterProps) {
  const types: Record<string, string> = {
    image: "Image",
    pdf: "Pdf",
    audio: "Audio",
    video: "Video",
    folder: "Folder",
    text: "Text",
    excel: "Excel",
    word: "Word",
    powerpoint: "PowerPoint",
    photoshop: "Photoshop",
    illustrator: "Illustrator",
    zip: "Zip",
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={(value: boolean) => {
          setIsOpen(value);
        }}
      >
        <PopoverTrigger className="font-semibold flex items-center gap-1">
          {selected == undefined ? "All Type" : types[selected]}
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent className="w-[600px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(types).map(([type, name], index) => (
              <div
                key={`file-type-${index}`}
                onClick={() => {
                  select(type);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-sm border p-2 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <FileIcon className="w-6 h-6 shrink-0" name={type} />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <Button variant="outline"> Clear </Button>
            <Button variant="dark"> Apply </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
