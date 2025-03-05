"use client";

import { ChipsField } from "@/components/common/form/ChipsField";
import EditorField from "@/components/common/form/EditorField";
import ImageField from "@/components/common/form/ImageField";
import TextAreaField from "@/components/common/form/TextAreaField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { ImageFile } from "@/types/file";
import { z } from "zod";

export default function EditBlogPostPage() {
  const form = useSimpleForm({
    defaultValues: {
      title: "Discover the World: A Journey of Adventure and Exploration",
      description:
        "Explore the world and discover new cultures, destinations, and experiences through this inspiring travel blog post.",
      content: `
          <h1>Discover the World: A Journey of Adventure and Exploration</h1>
    
          <p>Traveling is more than just visiting new places; it's about discovering the world and yourself. Every journey is an opportunity to explore new cultures, meet incredible people, and create unforgettable memories. In this blog post, we'll take you on a virtual tour of some of the most breathtaking destinations around the globe.</p>
    
          <h2>Why Travel Matters</h2>
          <p>Travel opens your mind to new perspectives and experiences. It teaches you to embrace the unknown and appreciate the beauty of diversity. Whether you're hiking through lush forests, wandering ancient cities, or relaxing on pristine beaches, every moment spent traveling is a step toward personal growth.</p>
    
          <h2>Top Destinations to Explore</h2>
          <ul>
            <li><strong>Paris, France</strong> - The City of Light is a must-visit for its iconic landmarks like the Eiffel Tower, Louvre Museum, and charming cafés.</li>
            <li><strong>Kyoto, Japan</strong> - Immerse yourself in the rich history and culture of Japan with its stunning temples, traditional tea houses, and cherry blossoms.</li>
            <li><strong>Santorini, Greece</strong> - Famous for its whitewashed buildings and crystal-clear waters, Santorini is a paradise for travelers.</li>
            <li><strong>Machu Picchu, Peru</strong> - Explore the ancient ruins of the Inca civilization and marvel at the breathtaking mountain views.</li>
          </ul>
    
          <h2>Tips for Your Next Adventure</h2>
          <p>Here are some tips to make your travels even more enjoyable:</p>
          <ol>
            <li>Plan ahead but leave room for spontaneity.</li>
            <li>Pack light and bring only the essentials.</li>
            <li>Learn a few phrases in the local language to connect with the culture.</li>
            <li>Capture memories through photos and journaling.</li>
          </ol>
    
          <h2>Conclusion</h2>
          <p>Travel is a journey of discovery, and every destination has a story to tell. Whether you're a seasoned traveler or planning your first trip, the world is waiting for you to explore. So pack your bags, embrace the adventure, and let the journey begin!</p>
        `,
      cover: { file: undefined, src: "/assets/images/posts/travel-2.webp" },
      tags: ["Travel", "Discovery", "Adventure"],
      metaTitle: "Discover the World: A Journey of Adventure and Exploration",
      metaDescription:
        "Explore the world and discover new cultures, destinations, and experiences through this inspiring travel blog post.",
      metaKeywords: ["travel", "discovery", "adventure", "destinations"],
      enableComments: true,
      publish: true,
    },
    schema: z.object({
      title: z.string().min(1, "Blog title is required"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
      cover: z.union([z.instanceof(File), z.undefined()]),
      tags: z.array(z.string()).min(1, "At least one tag is required"),
      metaTitle: z.string().min(1, "Meta title is required"),
      metaDescription: z
        .string()
        .min(10, "Meta description must be at least 10 characters"),
      metaKeywords: z
        .array(z.string())
        .min(1, "At least one meta keyword is required"),
      enableComments: z.boolean(),
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
      title="Edit"
      links={{
        Blog: "/blog/list",
        "Discover the World: A Journey of Adventure and Exploration": "#",
      }}
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
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
              label="Post title"
              error={form.errors.title}
            />
          </div>
          <div>
            <TextAreaField
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              label="Description"
              rows={4}
              error={form.errors.description}
            />
          </div>

          <div>
            <Label className=""> Content </Label>
            <EditorField
              content={form.values.content}
              onContentChange={(content: string) => {
                console.log("editor content", content);
                form.setValue("content", content);
              }}
              error={form.errors.content}
            />
          </div>
          <div className="mt-8">
            <Label className=""> Cover </Label>
            <ImageField
              id="image"
              image={form.values.cover}
              onImageChange={(image: ImageFile | undefined) =>
                form.setValue("cover", image)
              }
              error={form.errors.image}
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
        <div className="flex flex-col gap-6 p-6 border-t">
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
              form.setValue("tags", values);
            }}
            error={form.errors.tags}
          />

          <TextField
            name="metaTitle"
            value={form.values.metaTitle}
            onChange={form.handleChange}
            label="Meta title"
            error={form.errors.metaTitle}
          />

          <TextAreaField
            name="metaDescription"
            value={form.values.metaDescription}
            onChange={form.handleChange}
            label="Meta description"
            rows={4}
            error={form.errors.metaDescription}
          />

          <ChipsField
            name="metaKeywords"
            label="Meta Keywords"
            values={form.values.metaKeywords}
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
            placeholder="+1 Keywords"
            onValuesChange={(values: (string | number)[]) => {
              form.setValue("metaKeywords", values);
            }}
            error={form.errors.metaKeywords}
          />

          <div className="flex gap-3 items-center">
            <Switch
              id="enableCommentsSwitch"
              checked={form.values.enableComments}
              onCheckedChange={(checked) => {
                form.setValue("enableComments", checked);
              }}
            />
            <span>Enable comments</span>
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
            Create product
          </Button>
        </div>
      </footer>
    </PageContent>
  );
}
