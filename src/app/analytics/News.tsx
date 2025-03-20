import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";

const news = [
  {
    title: "The Future of Renewable Energy: Innovations and Challenges Ahead",
    description:
      "Exploring the latest advancements and obstacles in the renewable energy sector.",
    published: "2025-02-21T03:15:53Z",
    image: "/images/product-1.jpg",
  },
  {
    title:
      "Exploring the Impact of Artificial Intelligence on Modern Healthcare",
    description:
      "Analyzing how AI is transforming healthcare practices and patient outcomes.",
    published: "2025-02-20T03:15:53Z",
    image: "/images/product-2.jpg",
  },
  {
    title: "Climate Change and Its Effects on Global Food Security",
    description:
      "Investigating the implications of climate change on the global food supply chain.",
    published: "2025-02-18T03:15:53Z",
    image: "/images/product-3.jpg",
  },
  {
    title: "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
    description:
      "Examining the shift towards remote work and its impact on businesses and employees.",
    published: "2025-02-17T03:15:53Z",
    image: "/images/product-4.jpg",
  },
  {
    title: "Understanding Blockchain Technology: Beyond Cryptocurrency",
    description:
      "Delving into the applications of blockchain technology across various industries.",
    published: "2025-02-16T03:15:53Z",
    image: "/images/product-5.jpg",
  },
];

export default function News() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="News" />
      </CardHeader>
      <CardContent className="px-6 py-6">
        <ul className="space-y-6">
          {news.map((item, index) => (
            <li
              key={`product${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2">
                <div
                  className="w-12 h-12 rounded bg-cover"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                {formatDistanceToNow(item.published, { addSuffix: true })}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end">
        <button className="inline-flex items-center gap-2">
          <span>View All</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </CardFooter>
    </Card>
  );
}
