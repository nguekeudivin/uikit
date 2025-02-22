import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ChevronRight } from "lucide-react";

const items = [
  {
    name: "Melanie Noble",
    email: "luella.ryan33@gmail.com",
    image: "/assets/images/avatar/avatar-1.webp",
  },
  {
    name: "Chase Day",
    email: "joana.simonis84@gmail.com",
    image: "/assets/images/avatar/avatar-2.webp",
  },
  {
    name: "Shawn Manning",
    email: "marjolaine.white94@gmail.com",
    image: "/assets/images/avatar/avatar-3.webp",
  },
  {
    name: "Soren Durham",
    email: "vergie.block82@hotmail.com",
    image: "/assets/images/avatar/avatar-4.webp",
  },
  {
    name: "Cortez Herring",
    email: "vito.hudson@hotmail.com",
    image: "/assets/images/avatar/avatar-5.webp",
  },
];

export default function SaleOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          label="Contacts"
          action={
            <button className="inline-flex items-center gap-2">
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          }
        />
        <h4 className="text-muted-foreground">You have 100 contacts</h4>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ul className="space-y-6">
          {items.map((item, index) => (
            <li
              key={`contactlist${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gray-100 flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-muted-foreground">{item.email}</p>
                </div>
              </div>
              <div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-400 text-white ">
                  <ArrowUp className="rotate-45 w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
