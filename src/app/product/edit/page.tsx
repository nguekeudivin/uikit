"use client";

import { ChipsField } from "@/components/common/form/ChipsField";
import DropdownField from "@/components/common/form/DropdownField";
import EditorField from "@/components/common/form/EditorField";
import ImagesField from "@/components/common/form/ImagesField";
import LeadedTextField from "@/components/common/form/LeadedTextField";
import { SelectField } from "@/components/common/form/SelectField";
import TextAreaField from "@/components/common/form/TextAreaField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRecord } from "@/hooks/use-record";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { ImageFile } from "@/types/file";
import { z } from "zod";

export default function EditProductPage() {
  const form = useSimpleForm({
    defaultValues: {
      name: "Awesome Product",
      description: "This is an amazing product that you will love!",
      content: `
        <h1>Awesome Product</h1>
        <p>This is an amazing product that you will love! It comes with the following features:</p>
        <ul>
          <li>High-quality materials</li>
          <li>Durable and long-lasting</li>
          <li>Available in multiple colors and sizes</li>
        </ul>
        <p>Order now and get free shipping!</p>
      `,
      images: [
        {
          file: undefined,
          src: "/images/product-1.jpg",
        },
        {
          file: undefined,
          src: "/images/product-2.jpg",
        },
        {
          file: undefined,
          src: "/images/product-3.jpg",
        },
        {
          file: undefined,
          src: "/images/product-4.jpg",
        },
      ],
      code: "PROD123",
      SKU: "SKU12345",
      quantity: "100",
      categories: "Electronics",
      colors: ["Red", "Blue", "Green"],
      sizes: [8, 7],
      tags: ["New Arrival", "Best Seller"],
      gender: ["Men"],
      saleLabel: "Sale",
      newLabel: "New",
      regularPrice: "99.99",
      salePrice: "79.99",
      includeTaxes: true,
      tax: "7.5",
      publish: true,
    },
    schema: z.object({
      title: z.string().min(1, "Name is required"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
      images: z
        .array(
          z.object({
            files: z.union([z.instanceof(File), z.undefined()]),
            src: z.string().min(1, "Image source is required"),
          })
        )
        .min(1, "At least one image is required"),
      code: z.string().min(1, "Code is required"),
      SKU: z.string().min(1, "SKU is required"),
      quantity: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0,
          "Quantity must be a non-negative number"
        ),
      categories: z.string().min(1, "Category is required"),
      colors: z.array(z.string()).min(1, "At least one color is required"),
      sizes: z
        .array(z.number().min(0, "Size must be a non-negative number"))
        .min(1, "At least one size is required"),
      tags: z.array(z.string()).optional(),
      gender: z.array(z.string()).min(1, "Pick a leat one gender"),
      saleLabel: z.string().optional(),
      newLabel: z.string().optional(),
      regularPrice: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0,
          "Regular price must be a non-negative number"
        ),
      salePrice: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0,
          "Sale price must be a non-negative number"
        ),
      includeTaxes: z.boolean(),
      tax: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0,
          "Tax must be a non-negative number"
        ),
      publish: z.boolean(),
    }),
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

  const { values: isDisable, setValue: toggleDisable } = useRecord<boolean>({
    saleLabel: true,
    newLabel: false,
  });

  const submit = () => {
    if (form.check()) {
      // submit the form
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // To do submit
    }
  };

  return (
    <PageContent
      title="Edit product"
      links={{ Product: "/product/list", "Awesome product": "#" }}
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
              label="Product name"
              error={form.errors.name}
            />
          </div>
          <div>
            <TextAreaField
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              label="Product description"
              rows={4}
              error={form.errors.description}
            />
          </div>

          <div>
            <Label className=""> Content </Label>
            <EditorField
              content={form.values.content}
              onContentChange={(content: string) => {
                form.setValue("content", content);
              }}
              error={form.errors.content}
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
              error={form.errors.images}
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
              error={form.errors.code}
            />
          </div>
          <div>
            <TextField
              name="sku"
              value={form.values.SKU}
              onChange={form.handleChange}
              label="Product SKU"
              error={form.errors.SKU}
            />
          </div>
          <div>
            <TextField
              type="number"
              name="quantity"
              value={form.values.quantity}
              onChange={form.handleChange}
              label="Quantity"
              error={form.errors.quantity}
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
              error={form.errors.colors}
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
              error={form.errors.sizes}
            />
          </div>
          <div className="col-span-2">
            <ChipsField
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
              error={form.errors.tags}
            />
          </div>
          <div>
            <Label> Gender </Label>
            <div className="flex items-center gap-8 mt-3">
              {["Men", "Women", "Kids"].map((item, index) => (
                <div key={`gender${index}`} className="flex items-center gap-2">
                  <Checkbox
                    id={`gender${index}`}
                    checked={form.values.gender.includes(item)}
                    onCheckedChange={(checked) => {
                      form.pushToggle("gender", item, checked as boolean);
                    }}
                  />
                  <label htmlFor={`gender${index}`}>{item}</label>
                </div>
              ))}
              {form.hasError("gender") && (
                <small className="text-red-500 pl-1">
                  {form.errors.gender}
                </small>
              )}
            </div>
          </div>
        </div>
        <footer className="border-t border-dashed p-4 space-y-6">
          <div className="flex items-center gap-6">
            <Switch
              id="saleLabel"
              checked={!isDisable["saleLabel"]}
              onCheckedChange={(checked) => {
                toggleDisable("saleLabel", !checked);
              }}
            />
            <TextField
              name="saleLabel"
              disabled={isDisable["saleLabel"]}
              value={form.values.saleLabel}
              onChange={form.handleChange}
              label="Sale label"
              error={form.errors.saleLabel}
            />
          </div>
          <div className="flex items-center gap-6">
            <Switch
              id="newLabel"
              checked={!isDisable["newLabel"]}
              onCheckedChange={(checked) => {
                toggleDisable("newLabel", !checked);
              }}
            />
            <TextField
              name="newLabel"
              disabled={isDisable["newLabel"]}
              value={form.values.newLabel}
              onChange={form.handleChange}
              label="New label"
              error={form.errors.newLabel}
            />
          </div>
        </footer>
      </section>

      <section className="shadow max-w-4xl mx-auto mt-8 rounded-xl">
        <header className="p-6">
          <h3 className="text-2xl font-semibold"> Pricing </h3>
          <h4 className="text-muted-foreground">Price related inputs</h4>
        </header>
        <div className="flex flex-col gap-6 p-6 border-t border-dashed">
          <div>
            <LeadedTextField
              placeholder="0.0"
              name="regularPrice"
              value={form.values.regularPrice}
              onChange={form.handleNumberChange}
              label="Regular price"
              leading="$"
              error={form.errors.regularPrice}
            />
          </div>
          <div>
            <LeadedTextField
              placeholder="0.0"
              name="salePrice"
              value={form.values.salePrice}
              onChange={form.handleNumberChange}
              label="Sale Price"
              leading="$"
              error={form.errors.salePrice}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Switch
              id="includeTaxes"
              checked={form.values.includeTaxes}
              onCheckedChange={(checked) => {
                if (!checked) {
                  form.setValue("taxes", 0);
                }
                form.setValue("includeTaxes", checked);
              }}
            />
            <span>Price includes taxes</span>
          </div>
          {!form.values.includeTaxes && (
            <div>
              <LeadedTextField
                placeholder="0.0"
                name="taxes"
                value={form.values.taxes}
                onChange={form.handleNumberChange}
                label="Tax(%)"
                leading="%"
                error={form.errors.taxes}
              />
            </div>
          )}
        </div>
      </section>

      <footer className="max-w-4xl mx-auto  px-4 flex items-center justify-between mt-12">
        <div className="flex gap-3 items-center">
          <Switch
            id="publishSwitch"
            checked={form.values.publish}
            onCheckedChange={(checked) => {
              form.setValue("publish", checked);
            }}
          />
          <span>Publish</span>
        </div>
        <div>
          <Button onClick={submit} variant="dark" size="lg">
            {" "}
            Create product{" "}
          </Button>
        </div>
      </footer>
    </PageContent>
  );
}
