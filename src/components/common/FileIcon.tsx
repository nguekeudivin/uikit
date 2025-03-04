interface FileIconProps {
  name: string;
  className?: string;
}

export default function FileIcon({ name, className }: FileIconProps) {
  const getFileType = (fileName: string) => {
    const fileTypes = {
      image: ["jpg", "jpeg", "png", "gif", "bmp", "webp"],
      pdf: ["pdf"],
      audio: ["mp3", "wav", "ogg", "flac", "aac"],
      video: ["mp4", "mov", "avi", "mkv", "webm"],
      folder: ["folder"],
    };

    if (Object.keys(fileTypes).includes(name)) {
      return name;
    }
    const extension = (fileName.split(".").pop() as string).toLowerCase();

    for (const [type, extensions] of Object.entries(fileTypes)) {
      if (extensions.includes(extension)) {
        return type;
      }
    }

    return "document";
  };

  return (
    <div className={className}>
      <img
        src={`/assets/icons/files/${getFileType(name)}.svg`}
        alt={getFileType(name)}
        className="w-full h-full"
      />
    </div>
  );
}
