"use client";

import EditorField from "@/components/common/form/EditorField";
import PageContent from "@/components/common/PageContent";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";

export default function CreateProductPage() {
  const form = useSimpleForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      images: [],
    },
    schema: {
      title: z.string().min(1, "Name is required"),
    },
  });

  return (
    <PageContent
      title="Create a new product"
      links={{ User: "/product/list", "new product": "#" }}
      className="max-w-6xl mx-auto"
    >
      <div className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Details </h3>
          <h4 className="text-muted-foreground">
            Title, short description, image...
          </h4>
        </header>
        <section className="p-6 border-t">
          <EditorField />
        </section>
      </div>
    </PageContent>
  );
}
