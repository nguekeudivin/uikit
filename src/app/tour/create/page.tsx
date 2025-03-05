"use client";

import { ChipsField } from "@/components/common/form/ChipsField";
import EditorField from "@/components/common/form/EditorField";
import ImagesField from "@/components/common/form/ImagesField";
import LeadedTextField from "@/components/common/form/LeadedTextField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRecord } from "@/hooks/use-record";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { ImageFile } from "@/types/file";
import { z } from "zod";
import { users } from "@/api-call/mocks/users";
import { User } from "@/types/users";
import UserAvatar from "@/components/common/UserAvatar";
import { X } from "lucide-react";

export default function CreateTourPage() {
  const form = useSimpleForm({
    defaultValues: {
      name: "",
      content: "",
      images: [],
      guides: [],
      publish: true,
    },
    schema: z.object({
      name: z.string().min(1, "Product name is required is required"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
      images: z.array(
        z.object({
          files: z.union([z.instanceof(File), z.undefined()]),
          src: z.string().min(1, "Image source is required"),
        })
      ),
      guides: z.array(z.string()).optional(),
      publish: z.boolean(),
    }),
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
      title="Create a new tour"
      links={{ Tour: "/product/list", "new tour": "#" }}
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
            <Label>Name</Label>
            <TextField
              name="name"
              placeholder="Name"
              value={form.values.name}
              onChange={form.handleChange}
              error={form.errors.name}
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
        <div className="flex flex-col gap-6 p-6 border-t border-dashed">
          <div className="col-span-2">
            <ChipsField
              name="guides"
              label="Tour guides"
              values={form.values.guides}
              suggestions={users.map((item: any) => ({
                name: item.name,
                avatar: item.avatar,
              }))}
              searchPredicate={(item: any, keyword: string) => {
                return item.name
                  .toLowerCase()
                  .includes(keyword.toLocaleLowerCase());
              }}
              shouldPickSuggestion={true}
              renderChip={(item: any, remove: any) => {
                return (
                  <div className="rounded-xl p-0.5 px-2  flex no-wrap items-center gap-2 bg-gray-100">
                    <div className="p-2 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100">
                      <UserAvatar
                        avatar={item.avatar}
                        name={item.name}
                        className="w-6 h-6"
                      />
                      <span className="truncate"> {item.name}</span>
                    </div>
                    <button
                      onClick={remove}
                      className="bg-gray-500 p-0.5 rounded-full text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              }}
              renderSuggestion={(item: any, pick: any) => {
                return (
                  <div
                    onClick={pick}
                    className="p-2 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100"
                  >
                    <UserAvatar
                      avatar={item.avatar}
                      name={item.name}
                      className="w-6 h-6"
                    />
                    <span> {item.name}</span>
                  </div>
                );
              }}
              placeholder="+1 Tour guides"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("guides", values);
              }}
              error={form.errors.guides}
            />
          </div>
        </div>
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
