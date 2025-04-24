import { Image, X } from "lucide-react";
import { ImageFile } from "@/types/file";
import { cn } from "@/lib/utils";

export default function ImageField({
  image,
  onImageChange,
  id,
  error,
}: {
  image: ImageFile;
  onImageChange: (image: ImageFile | undefined) => void;
  id: string;
  error?: string;
}) {
  const upload = (event: any) => {
    const file = event.target.files[0];
    // reach theme
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        onImageChange({
          file: file,
          src: e.target.result,
        });
      };
    }
  };

  const hasError = error != undefined && error != "";

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "mt-4 rounded-xl bg-gray-100 border w-full bg-cover h-64 flex flex-col items-center justify-center w-full relative",
          {
            "border-red-500": hasError,
            "h-[500px]": image != undefined,
          }
        )}
        style={{ backgroundImage: `url(${image?.src})` }}
      >
        {image == undefined ? (
          <>
            <Image className="w-12 h-12 text-primary" />
            <span className="text-xl font-semibold mt-4">
              Drop or select file
            </span>
            <span className="text-muted-foreground mt-2">
              Drop files here or click to
              <span className="text-sky-600 underline">browser</span> through
              your machine
            </span>
          </>
        ) : (
          <label htmlFor={id} className="w-full h-full hover:bg-gray-200/30">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                onImageChange(undefined);
              }}
              className="absolute top-2 right-2 p-0.5 rounded-full bg-gray-900/60 text-white hover:bg-gray-900 transition-all duration-300 ease-in-out"
            >
              <X className="w-4 h-4" />
            </button>
          </label>
        )}
      </label>
      {hasError && <small className="text-red-500 pl-1">{error}</small>}

      <input
        type="file"
        multiple={true}
        id={id}
        className="hidden"
        name={id}
        onChange={upload}
      />
    </div>
  );
}
