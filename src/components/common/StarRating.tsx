import { cn } from "@/lib/utils";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

interface StarRatingProps {
  count: number;
  className?: string;
}

export default function StarRating({ count, className }: StarRatingProps) {
  const levels = [1, 2, 3, 4, 5];

  const getPreviousLevel = (index: number) => {
    if (levels[index - 1]) {
      return levels[index - 1];
    } else {
      return 0;
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {levels.map((level, index) => (
        <div key={`star-product-${index}`}>
          {(() => {
            if (level <= count)
              return (
                <MdStar className={cn("text-yellow-500 w-6 h-6", className)} />
              );
            if (getPreviousLevel(index) < count && count < level)
              return (
                <MdStarHalf
                  className={cn("text-yellow-500 w-6 h-6", className)}
                />
              );
            if (level > count)
              return (
                <MdStarOutline
                  className={cn("text-yellow-500 w-6 h-6", className)}
                />
              );
          })()}
        </div>
      ))}
    </div>
  );
}
