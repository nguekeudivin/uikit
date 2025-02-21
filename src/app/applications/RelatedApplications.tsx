import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "../../components/custom/UserAvatar";
import { Download, Package2, Star } from "lucide-react";
import { kformat } from "@/lib/utils";
import clsx from "clsx";

const data = [
  {
    name: "Microsoft Office 365",
    price: "Free",
    downloads: 9910,
    size: "9.68 Mb",
    rating: 9910,
    image: "https://avatars.githubusercontent.com/u/583231",
  },
  {
    name: "Opera",
    price: "Free",
    downloads: 1950,
    size: "1.9 Mb",
    rating: 1950,
    image: "https://avatars.githubusercontent.com/u/853123",
  },
  {
    name: "Adobe Acrobat Reader DC",
    price: "$68.71",
    downloads: 9120,
    size: "8.91 Mb",
    rating: 9120,
    image: "https://avatars.githubusercontent.com/u/1234567",
  },
  {
    name: "Joplin",
    price: "Free",
    downloads: 6980,
    size: "6.82 Mb",
    rating: 6980,
    image: "https://avatars.githubusercontent.com/u/2345678",
  },
  {
    name: "Topaz Photo AI",
    price: "$52.17",
    downloads: 8490,
    size: "8.29 Mb",
    rating: 8490,
    image: "https://avatars.githubusercontent.com/u/3456789",
  },
];

export function RelatedApplications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Related Applications" />
      </CardHeader>
      <CardContent className="space-y-2 px-6">
        <Tabs defaultValue="7 Days" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="7 Days"> 7 Days</TabsTrigger>
            <TabsTrigger value="30 Days"> 30 Days</TabsTrigger>
            <TabsTrigger value="All times"> All times</TabsTrigger>
          </TabsList>
          <TabsContent value="7 Days">
            {data.map((item, index) => (
              <div
                key={`relatatedapp${index}`}
                className="flex items-center gap-4 py-2"
              >
                <div>
                  <UserAvatar name={item.name} avatar={item.image} />
                </div>
                <div>
                  <h3 className="flex items-center gap-2">
                    <span className="font-semibold"> {item.name}</span>
                    <span
                      className={clsx("px-1 rounded", {
                        "bg-gray-100": item.price == "Free",
                        "bg-teal-100 text-teal-800": item.price != "Free",
                      })}
                    >
                      {item.price}
                    </span>
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1 ">
                      <Download className="w-4 h-4" />
                      <span>{kformat(item.downloads)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package2 className="w-4 h-4" />
                      <span>{item.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-600 w-4 h-4" />
                      <span>{kformat(item.rating)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
