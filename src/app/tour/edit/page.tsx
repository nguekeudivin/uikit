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
import DateField from "@/components/common/form/DateField";
import CountryField from "@/components/common/form/CountryField";
import CheckboxesField from "@/components/common/form/CheckboxesField";
import { CheckBoxOption } from "@/types/form";

export default function EditTourPage() {
  const form = useSimpleForm({
    defaultValues: {
      name: "Amazing Tour Package",
      description:
        "Explore the best destinations with our amazing tour package.",
      content: `
              <h1>Amazing Tour Package</h1>
              <p>Join us for an unforgettable adventure! This tour package includes:</p>
              <ul>
                <li>Guided tours to iconic landmarks</li>
                <li>Comfortable accommodations</li>
                <li>Delicious meals and local cuisine</li>
                <li>Transportation in air-conditioned vehicles</li>
              </ul>
              <p>Book now and create memories that last a lifetime!</p>
            `,
      images: [
        { file: undefined, src: "/assets/images/booking/booking-1.jpg" },
        { file: undefined, src: "/assets/images/booking/booking-2.jpg" },
        { file: undefined, src: "/assets/images/booking/booking-3.jpg" },
        { file: undefined, src: "/assets/images/booking/booking-4.jpg" },
      ],
      guides: [
        {
          name: "James Smith",
          avatar: "/assets/images/avatar/avatar-1.webp",
        },
        {
          name: "Mary Johnson",
          avatar: "/assets/images/avatar/avatar-2.webp",
        },
      ],
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      publish: true,
      duration: "7 days",
      destination: "France",
      services: ["Audio guide", "Lunch", "Private tour"],
      tags: ["Adventure", "Family", "Luxury"],
    },
    schema: z.object({
      name: z.string().min(1, "Product name is required"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
      images: z
        .array(
          z.object({
            file: z.union([z.instanceof(File), z.undefined()]),
            src: z.string().min(1, "Image source is required"),
          })
        )
        .min(1, "At least one image is required"),
      guides: z.array(z.string()).optional(),
      startDate: z.date({ required_error: "Start date is required" }), // Required date
      endDate: z.date({ required_error: "End date is required" }), // Required date
      publish: z.boolean(),
      duration: z.string().min(1, "Duration is required"), // Validate duration
      destination: z.string().min(1, "Destination is required"), // Validate destination
      services: z.array(z.string()).optional(), // Validate services (optional)
      tags: z.array(z.string()).optional(), // Validate tags (optional)
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
      title="Edit tour"
      links={{ Tour: "/tour/list", "Awesome tout": "#" }}
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
              placeholder="Ex: Adventure Seekers Expedition"
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
          <div>
            <Label>Tour guides</Label>
            <ChipsField
              name="guides"
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

          <div>
            <Label>Available</Label>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <DateField
                className="w-full"
                name="startDate"
                label="Start date"
                value={form.values.startDate}
                onValueChange={(date) => {
                  form.setValue("startDate", date);
                }}
                error={form.errors.enddate}
              />
              <DateField
                className="w-full"
                name="endDate"
                label="End date"
                value={form.values.endDate}
                onValueChange={(date) => {
                  form.setValue("endDate", date);
                }}
                error={form.errors.endDate}
              />
            </div>
          </div>

          <div>
            <Label>Duration</Label>
            <TextField
              name="duration"
              placeholder="Ex: 2 days, 4 days, 3 nights"
              value={form.values.duration}
              onChange={form.handleChange}
              error={form.errors.duration}
            />
          </div>

          <div>
            <Label>Destination</Label>
            <CountryField
              name="country"
              placeholder="Pick the destination"
              onValueChange={(value) => form.setValue("destination", value)}
              value={form.values.destination}
            />
          </div>

          <CheckboxesField
            label="Services"
            options={[
              "Audio guide",
              "Food and drinks",
              "Lunch",
              "Private tour",
              "Special activities",
              "Entrance fees",
              "Gratuities",
              "Pick-up and drop off",
              "Professional guide",
              "Transport by air-conditioned",
            ].map((item) => ({ label: item, value: item }))}
            className="grid grid-cols-2 gap-x-8 gap-y-4"
            values={form.values.services}
            onCheckedChange={(item: CheckBoxOption, checked: boolean) => {
              form.pushToggle("services", item.value, checked as boolean);
            }}
            error={form.errors.services}
          />

          <div>
            <Label> Tags </Label>
            <ChipsField
              name="tags"
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
            Create tour
          </Button>
        </div>
      </footer>
    </PageContent>
  );
}
