import StarRating from "@/components/common/StarRating";
import UserAvatar from "@/components/common/UserAvatar";
import { format } from "date-fns";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { MdStar, MdVerified } from "react-icons/md";

interface ProductReviewItem {
  review: {
    user: {
      name: string;
      avatar: string;
    };
    date: Date | string;
    stars: number;
    verified: boolean;
    content: string;
    likes: number;
    dislikes: number;
    images: string[];
  };
}

export default function ProductReviewItem({ review }: ProductReviewItem) {
  return (
    <div className="md:flex px-3">
      <div className="md:px-3 w-auto md:w-48 shrink-0 md:text-center">
        <UserAvatar
          name={review.user.name}
          avatar={review.user.avatar}
          className="md:mx-auto h-16 w-16"
        />
        <h4 className="font-semibold mt-2">{review.user.name}</h4>
        <h5 className="text-muted-foreground text-sm">
          {format(review.date, "dd MMM yyyy")}
        </h5>
      </div>
      <div className="w-full">
        <div className="mt-1 md:mt-0">
          <StarRating count={4} className="w-5 h-5" />
        </div>
        {review.verified && (
          <div className="mt-1 flex items-center gap-2 text-green-600">
            <MdVerified className="text-green-600" />
            <span>Verified purchase</span>
          </div>
        )}
        <p className="mt-1">{review.content}</p>
        {review.images.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            {review.images.map((item, index) => (
              <div
                key={`review-image-${item}`}
                className="bg-cover w-16 h-16 rounded-xl"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            <span>{review.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-4 h-4" />
            <span>{review.dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
