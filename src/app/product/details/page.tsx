"use client";

import PageContent from "@/components/common/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  CloudUpload,
  ExternalLink,
  FileText,
  Heart,
  Minus,
  Pencil,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductImages from "./ProductImages";
import { MdSchedule, MdVerified, MdVerifiedUser } from "react-icons/md";
import { cn, formatDollars } from "@/lib/utils";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import { SelectField } from "@/components/common/form/SelectField";

import ProductReviews from "./ProductReviews";
import StarRating from "@/components/common/StarRating";

const tabs = [
  {
    name: "description",
    label: "Description",
    count: undefined,
  },
  {
    name: "reviews",
    label: "Reviews",
    count: 15,
  },
];

export default function ProductDetailsPage() {
  const [status, setStatus] = useState<string>("publish");

  const product = {
    name: "Classic Leather Loafers",
    starsAverage: 4,
    starsMax: 20000,
    starsStats: {
      5: 2030,
      4: 8405,
      3: 6890,
      2: 9122,
      1: 1000,
    },
    price: 97.4,
    description:
      "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    colors: ["#06B6D4", "#7C3AED", "#E11D48"],
    sizes: [6, 7, 8, 8.5, 9, 11, 12, 13],
    images: [
      "/assets/images/product/product-1.webp",
      "/assets/images/product/product-2.webp",
      "/assets/images/product/product-3.webp",
      "/assets/images/product/product-4.webp",
      "/assets/images/product/product-5.webp",
      "/assets/images/product/product-6.webp",
      "/assets/images/product/product-7.webp",
      "/assets/images/product/product-8.webp",
    ],
    inStockQuantity: 92,
    detailedDescription: `
      <div>
        <h3>Specifications</h3>
        <table>
          <tbody>
            <tr><td>Category</td><td>Mobile</td></tr>
            <tr><td>Manufacturer</td><td>Apple</td></tr>
            <tr><td>Warranty</td><td>12 Months</td></tr>
            <tr><td>Serial number</td><td>358607726380311</td></tr>
            <tr><td>Ships from</td><td>United States</td></tr>
          </tbody>
        </table>
        <h3>Product details</h3>
        <ul>
          <li>The foam sockliner feels soft and comfortable</li>
          <li>Pull tab</li>
          <li>Not intended for use as Personal Protective Equipment</li>
          <li>Colour Shown: White/Black/Oxygen Purple/Action Grape</li>
          <li>Style: 921826-109</li>
          <li>Country/Region of Origin: China</li>
        </ul>
        <h3>Benefits</h3>
        <ul>
          <li>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</li>
          <li>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</li>
          <li>The foam midsole feels springy and soft.</li>
          <li>The rubber outsole adds traction and durability.</li>
        </ul>
        <h3>Delivery and returns</h3>
        <p>Your order of $200 or more gets free standard delivery.</p>
        <ul>
          <li>Standard delivered 4-5 Business Days</li>
          <li>Express delivered 2-4 Business Days</li>
        </ul>
        <p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>
      </div>
    `,
  };

  const form = useSimpleForm({
    defaultValues: {
      color: "",
      size: "",
      quantity: "1",
    },
    schema: z.object({
      color: z.string().min(1, "Color is required"),
    }),
  });

  return (
    <PageContent className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mt-4">
        <Link href="/tout/list">
          <Button variant="transparent" className="-ml-4">
            <ChevronLeft />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-6">
          <button className=" text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
            <ExternalLink className="w-5 h-5" />
          </button>
          <Link href="/tour/edit">
            <button className="text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
              <Pencil className="w-5 h-5" />
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-900 text-white rounded-lg flex items-center px-4 py-2 gap-2">
              <span className="capitalize">{status}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatus("publish")}>
                <CloudUpload />
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("draft")}>
                <FileText />
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-5 mt-8">
        <aside className="md:col-span-3 md:pr-16">
          <ProductImages product={product} />
        </aside>
        <aside className="md:col-span-2">
          <div className="bg-sky-100 px-1 py-0.5 text-sm text-sky-900 rounded-md inline-flex">
            New
          </div>
          <p className="text-green-600 mt-3"> In Stock</p>
          <h2 className="mt-3 font-semibold text-xl">{product.name}</h2>
          <div className="flex items-center  mt-3 gap-4">
            <StarRating count={3.7} className="w-5 h-5" />
            <p className="text-muted-foreground">(9.12k Reviews)</p>
          </div>

          <div className="text-2xl font-semibold mt-3">
            {formatDollars(product.price)}
          </div>
          <p className="mt-3 text-muted-foreground">{product.description}</p>
          <div className="border-t border-dashed my-6"> </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Color</h4>
              <div className="flex items-center gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={`color${index}`}
                    className={cn(
                      "w-5 h-5 rounded-full cursor-pointer text-white flex items-center justify-center shadow",
                      {
                        "w-7 h-7": form.values.color == color,
                      }
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      form.setValue("color", color);
                    }}
                  >
                    {form.values.color == color && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Size</h4>
              <div>
                <SelectField
                  onChange={form.handleChange}
                  name="sizes"
                  className="h-10"
                >
                  {product.sizes.map((option, i) => (
                    <option key={`product-size-${i}`} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>
                <small className="underline text-sm">Size chart</small>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Quantity</h4>
              <div className="text-end text-muted-foreground">
                <div className="border rounded-md flex items-center">
                  <button className="px-2 py-1">
                    <Minus />
                  </button>
                  <input
                    value={form.values.quantity}
                    name="quantity"
                    onChange={form.handleChange}
                    className="w-12 bg-gray-100 px-3 py-2 focus:outline-none focus:border-none focus:ring-none border-none"
                  ></input>
                  <button className="px-2 py-1">
                    <Plus />
                  </button>
                </div>
                <small className="text-sm">
                  Available: {product.inStockQuantity}
                </small>
              </div>
            </div>
          </div>
          <div className="border-t border-dashed my-6"> </div>
          <div className="flex items-center gap-2">
            <Button className="w-full" disabled={true} size="lg">
              <ShoppingCart />
              Add to cart
            </Button>
            <Button variant="dark" className="w-full" size="lg" disabled={true}>
              Buy now
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-gray-600">
            <button className="flex items-center gap-2 hover:underline">
              <Plus className="w-4 h-4" />
              Compare
            </button>
            <button className="flex items-center gap-2 hover:underline">
              <Heart className="w-4 h-4 fill-gray-600" />
              Favorite
            </button>
            <button className="flex items-center gap-2 hover:underline">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </aside>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 md:py-20">
        {[
          {
            icon: MdVerified,
            title: "100% original",
            content:
              "Chocolate bar candy canes ice cream toffee cookie halvah.",
          },
          {
            icon: MdSchedule,
            title: "10 days replacement",
            content: "Marshmallow biscuit donut dragée fruitcake wafer.",
          },
          {
            icon: MdVerifiedUser,
            title: "Year warranty",
            content: "Cotton candy gingerbread cake I love sugar sweet.",
          },
        ].map((item, index) => (
          <div
            key={`product-avantage-${index}`}
            className="text-center justify-center  px-3 md:px-8"
          >
            <item.icon className="text-green-600 w-10 h-10 mx-auto" />
            <h3 className="font-semibold mt-6">{item.title}</h3>
            <p className="text-muted-foreground mt-4 text-center">
              {item.content}
            </p>
          </div>
        ))}
      </section>

      <Tabs defaultValue="description" className="mt-4 rounded-xl shadow">
        <div className="flex items-center justify-between border-b">
          <TabsList className="bg-white w-auto grid p-0 m-0  grid-cols-2 md:grid-cols-5 gap-4 px-6">
            {tabs.map((tab) => (
              <TabsTrigger
                key={`tab${tab.name}`}
                value={tab.name}
                className="rounded-none py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-0"
              >
                <div className=" flex items-center gap-2">
                  <span>{tab.label}</span>
                  {tab.count != undefined && (
                    <span className="">({tab.count})</span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className=" mb-24">
          <TabsContent value="description">
            <div
              className="ProseMirror  p-0"
              dangerouslySetInnerHTML={{
                __html: product.detailedDescription,
              }}
            ></div>
          </TabsContent>
          <TabsContent value="reviews">
            <ProductReviews product={product} />
          </TabsContent>
        </div>
      </Tabs>
    </PageContent>
  );
}
