import { Button } from "@/components/ui/button";
import { kformat } from "@/lib/utils";
import { Pencil } from "lucide-react";
import ProductReviewItem from "./ProductReviewItem";
import { reviews } from "@/api-call/mocks/reviews";
import StarRating from "@/components/common/StarRating";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import { useState } from "react";
import AddReviewDialog from "./AddReviewDialog";

export default function ProductReviews({ product }: any) {
  const [openAddReviewDialog, setOpenAddReviewDialog] =
    useState<boolean>(false);

  const form = useSimpleForm({
    defaultValues: {
      content: "",
      name: "",
      email: "",
      stars: 0,
    },
    schema: z.object({
      content: z
        .string()
        .min(10, "Content must be at least 10 characters long"),
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email("Invalid email address"),
      stars: z
        .number()
        .min(1, "Rating must be at least 1 star")
        .max(5, "Rating must be at most 5 stars"),
    }),
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex items-center flex-col justify-center border-r ">
          <p className="font-semibold">Average rating</p>
          <p className="font-black text-5xl mt-4">3.7/5</p>
          <StarRating count={3.7} />
          <div className="text-muted-foreground">(9.12 Reviews)</div>
        </div>
        <div className="p-4 md:p-8 border-r">
          <div className="space-y-3">
            {Object.entries(product.starsStats).map(
              ([n, count]: any, index) => (
                <div
                  key={`review-star-progress-${index}`}
                  className="flex items-center w-full gap-2 "
                >
                  <div className="shrink-0">{n} Star</div>
                  <div className="bg-gray-200 h-1.5 w-full rounded-md">
                    <div
                      className="h-full w-full rounded-md bg-yellow-500"
                      style={{
                        width: `${(count * 100) / product.starsMax}%`,
                      }}
                    ></div>
                  </div>
                  <div className=" pt-0.5 text-center flex items-center justify-center w-8 text-xs text-muted-foreground">
                    {kformat(count)}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              setOpenAddReviewDialog(true);
            }}
            variant="outline"
            size="lg"
          >
            <Pencil /> Write your review
          </Button>
        </div>
      </div>
      <div className="border-t border-dashed my-4"> </div>
      <div className="space-y-8 py-8 md:pr-8">
        {reviews.map((review, index) => (
          <ProductReviewItem key={`product-review-${index}`} review={review} />
        ))}
      </div>
      <AddReviewDialog
        isOpen={openAddReviewDialog}
        setIsOpen={setOpenAddReviewDialog}
        form={form}
      />
    </>
  );
}
