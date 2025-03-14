import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";

export default function SaleOverview() {
  const form = useSimpleForm({
    defaultValues: {
      name: "",
    },
    schema: z.object({
      title: z.string().min(1, "Name is required"),
    }),
  });

  const avatars = [
    "/assets/images/avatar/avatar-1.webp",
    "/assets/images/avatar/avatar-2.webp",
    "/assets/images/avatar/avatar-3.webp",
    "/assets/images/avatar/avatar-4.webp",
    "/assets/images/avatar/avatar-5.webp",
    "/assets/images/avatar/avatar-6.webp",
    "/assets/images/avatar/avatar-7.webp",
    "/assets/images/avatar/avatar-8.webp",
    "/assets/images/avatar/avatar-9.webp",
    "/assets/images/avatar/avatar-10.webp",
    "/assets/images/avatar/avatar-11.webp",
    "/assets/images/avatar/avatar-12.webp",
    "/assets/images/avatar/avatar-13.webp",
    "/assets/images/avatar/avatar-14.webp",
    "/assets/images/avatar/avatar-15.webp",
    "/assets/images/avatar/avatar-16.webp",
    "/assets/images/avatar/avatar-17.webp",
    "/assets/images/avatar/avatar-18.webp",
    "/assets/images/avatar/avatar-19.webp",
    "/assets/images/avatar/avatar-20.webp",
  ];

  const products = [
    "/assets/images/product/product-1.webp",
    "/assets/images/product/product-2.webp",
    "/assets/images/product/product-3.webp",
    "/assets/images/product/product-4.webp",
    "/assets/images/product/product-5.webp",
    "/assets/images/product/product-6.webp",
    "/assets/images/product/product-7.webp",
    "/assets/images/product/product-8.webp",
    "/assets/images/product/product-9.webp",
    "/assets/images/product/product-10.webp",
    "/assets/images/product/product-11.webp",
    "/assets/images/product/product-12.webp",
    "/assets/images/product/product-13.webp",
    "/assets/images/product/product-14.webp",
    "/assets/images/product/product-15.webp",
    "/assets/images/product/product-16.webp",
    "/assets/images/product/product-17.webp",
    "/assets/images/product/product-18.webp",
    "/assets/images/product/product-19.webp",
    "/assets/images/product/product-20.webp",
    "/assets/images/product/product-21.webp",
    "/assets/images/product/product-22.webp",
    "/assets/images/product/product-23.webp",
    "/assets/images/product/product-24.webp",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle label="Title" />
        <h4 className="text-muted-foreground">(+43%) than last year</h4>
      </CardHeader>
      <CardContent className="px-6"></CardContent>
    </Card>
  );
}
