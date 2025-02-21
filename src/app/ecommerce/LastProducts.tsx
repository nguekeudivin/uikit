import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDollars } from "@/lib/utils";

const products = [
  {
    title: "Urban Explorer Sneakers",
    colors: ["#0EA5E9", "#059669"],
    image: "/images/product-1.jpg",
    price: 99.99,
  },
  {
    title: "Mountain Trekking Boots",
    colors: ["#F87171", "#EF4444", "#DC2626"],
    image: "/images/product-2.jpg",
    price: 129.99,
    promot: 100,
  },
  {
    title: "City Commute Backpack",
    colors: ["#FBBF24", "#F59E0B"],
    image: "/images/product-3.jpg",
    price: 49.99,
  },
  {
    title: "Beachside Flip Flops",
    colors: ["#FDE68A"],
    image: "/images/product-4.jpg",
    price: 19.99,
    promo: 10,
  },
  {
    title: "Winter Expedition Jacket",
    colors: ["#F97316", "#EA580C", "#C2410C"],
    image: "/images/product-5.jpg",
    price: 199.99,
  },
];

export default function SaleOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Products" />
      </CardHeader>
      <CardContent className="px-6 py-6">
        <ul className="space-y-6">
          {products.map((item, index) => (
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
                  {item.promo ? (
                    <p className="flex items-center space-x-2">
                      <span className="line-through text-muted-foreground">
                        {formatDollars(item.price)}
                      </span>
                      <span className="text-red-500">
                        {formatDollars(item.promo)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      {formatDollars(item.price)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center relative">
                  {item.colors.map((color, index) => (
                    <div
                      style={{
                        right: `${index * 10}px`,
                        backgroundColor: color,
                      }}
                      className={`z-${
                        index * 10
                      } absolute w-4 h-4 rounded-full border border-white`}
                    ></div>
                  ))}
                </div>
                <div className="">
                  {item.colors.length > 1 && (
                    <div className="font-semibold text-sm">
                      +{item.colors.length}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
