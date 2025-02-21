import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDollars, getRandomColor } from "@/lib/utils";
import { format } from "date-fns";

const items = [
  {
    message: "12 Invoices have been paid",
    date: "2025-02-20T20:37:00Z",
    color: "#0D9488",
  },
  {
    message: "Order #37745 from September",
    date: "2025-02-19T19:37:00Z",
    color: "#7C3AED",
  },
  {
    message: "New order placed #XF-2356",
    date: "2025-02-18T18:37:00Z",
    color: "#D946EF",
  },
  {
    message: "New order placed #XF-2346",
    date: "2025-02-17T17:37:00Z",
    color: "#65A30D",
  },
];

export default function News() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Order timeline" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={`ordertimeline${index}`} className="flex">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="w-1 h-10 border-l-2 border-gray-300"></div>
              </div>
              <div className="ml-2 -mt-1">
                <p className="font-semibold">{item.message}</p>
                <p className="text-muted-foreground text-sm">
                  {format(item.date, "dd MMM yyyy h:mm a")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
