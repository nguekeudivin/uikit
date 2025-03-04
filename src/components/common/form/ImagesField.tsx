import { Images, X } from "lucide-react";
import { ImageFile } from "@/types/file";

export default function ImagesField({
  images,
  onImagesChange,
  id,
}: {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  id: string;
}) {
  const upload = (event: any) => {
    const files = Array.from(event.target.files) as File[];
    // reach theme
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        onImagesChange([
          ...images,
          {
            file: file,
            src: e.target.result,
          },
        ]);
      };
    });
  };

  return (
    <>
      <label
        htmlFor={id}
        className="mt-4 rounded-xl bg-gray-100 border w-full h-64 flex flex-col items-center justify-center w-full"
      >
        <Images className="w-12 h-12 text-primary" />
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
        id={id}
        className="hidden"
        name={id}
        onChange={upload}
      />
      <div className="">
        {images.length != 0 && (
          <ul className="flex gap-4 mt-4">
            {images.map((item: ImageFile, index: number) => (
              <li
                key={`uploadedFile${index}`}
                style={{ backgroundImage: `url(${item.src})` }}
                className="relative bg-cover w-36 h-36 border px-4 py-2 rounded-md flex items-center justify-between"
              >
                <button className="absolute top-2 right-2 p-1 rounded-full bg-red-100/50 text-white hover:bg-red-200 transition-all duration-300 ease-in-out">
                  <X className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
