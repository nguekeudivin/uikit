"use client";

import CustomSelect from "@/components/common/CustomSelect";
import DropdownField from "@/components/common/form/DropdownField";
import EditorField from "@/components/common/form/EditorField";
import ImagesField from "@/components/common/form/ImagesField";
import { SelectField } from "@/components/common/form/SelectField";
import { TagsField } from "@/components/common/form/TagsField";
import TextAreaField from "@/components/common/form/TextAreaField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Label } from "@/components/ui/label";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { ImageFile } from "@/types/file";
import { number, z } from "zod";

export default function CreateProductPage() {
  const form = useSimpleForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      images: [],
      code: "",
      SKU: "",
      quantity: "",
      categories: "",
      colors: [],
      sizes: [8, 7],
      tags: [],
      gender: "",
      saleLabel: "",
      newLabel: "",
    },
    schema: {
      title: z.string().min(1, "Name is required"),
    },
  });

  const categories = [
    {
      groupName: "Clothing",
      options: ["Shirts", "T-shirts", "Jeans", "Leathers", "Accessories"],
    },
    {
      groupName: "Tailored",
      options: ["Suits", "Blazer", "Trousers", "Waistcosts", "Apparel"],
    },
  ];

  return (
    <PageContent
      title="Create a new product"
      links={{ User: "/product/list", "new product": "#" }}
      className="max-w-6xl mx-auto mb-24"
    >
      <section className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Details </h3>
          <h4 className="text-muted-foreground">
            Title, short description, image...
          </h4>
        </header>
        <div className="p-6 border-t space-y-6">
          <div>
            <TextField
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              label="Product code"
            />
          </div>
          <div>
            <TextAreaField
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              label="Product SKU"
              rows={4}
            />
          </div>

          <div>
            <Label className=""> Content </Label>
            <EditorField
              content={form.values.description}
              onContentChange={(content: string) => {
                form.setValue("content", content);
              }}
            />
          </div>
          <div className="mt-8">
            <Label className=""> Images </Label>
            <ImagesField
              id="image"
              images={form.values.images}
              onImagesChange={(images: ImageFile[]) =>
                form.setValue("images", images)
              }
            />
          </div>
        </div>
      </section>
      <section className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Properties </h3>
          <h4 className="text-muted-foreground">
            Additional functions and attributes...
          </h4>
        </header>
        <div className="p-6 border-t grid grid-cols-2 gap-4 md:gap-6">
          <div>
            <TextField
              name="code"
              value={form.values.code}
              onChange={form.handleChange}
              label="Product code"
            />
          </div>
          <div>
            <TextField
              name="sku"
              value={form.values.sku}
              onChange={form.handleChange}
              label="Product SKU"
            />
          </div>
          <div>
            <TextField
              type="number"
              name="quantity"
              value={form.values.quantity}
              onChange={form.handleChange}
              label="Quantity"
            />
          </div>
          <div>
            <SelectField
              onChange={form.handleChange}
              name="category"
              label="Category"
            >
              {categories.map((group, index) => (
                <optgroup key={`categoryGroup${index}`} label={group.groupName}>
                  {group.options.map((option, i) => (
                    <option key={`categoryGroupOption${i}`} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </SelectField>
          </div>
          <div>
            <DropdownField
              label="Colors"
              optionsClassName="w-[250px]"
              options={[
                "Red",
                "Blue",
                "Green",
                "Yellow",
                "Violet",
                "Black",
              ].map((n) => ({ label: n, value: n }))}
              name="colors"
              values={form.values.colors}
              onValuesChange={(values) => {
                form.setValue("colors", values);
              }}
            />
          </div>
          <div>
            <DropdownField
              label="Sizes"
              optionsClassName="w-[250px]"
              options={[8, 7, 9, 19].map((n) => ({ label: n, value: n }))}
              name="sizes"
              values={form.values.sizes}
              onValuesChange={(values) => {
                form.setValue("sizes", values);
              }}
            />
          </div>
          <div className="col-span-2">
            <TagsField
              name="tags"
              label="Tags"
              values={form.values.tags}
              suggestions={[
                "Education",
                "Sport",
                "Finance",
                "Health",
                "Technology",
                "Entertainment",
                "Travel",
                "Food",
                "Environment",
                "Fashion",
                "Real Estate",
                "Automotive",
                "Art and Culture",
                "Science",
                "Business",
              ]}
              placeholder="+1 Tags"
              onValuesChange={(values: (string | number)[]) => {
                console.log("on value changed", values);
                form.setValue("tags", values);
              }}
            />
          </div>
        </div>
      </section>
    </PageContent>
  );
}
