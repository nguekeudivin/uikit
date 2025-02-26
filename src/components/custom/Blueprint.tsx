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
