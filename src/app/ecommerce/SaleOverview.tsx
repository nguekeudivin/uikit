import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDollars } from "@/lib/utils";

const overview = [
  {
    category: "Total profit",
    amount: 8374,
    percentage: 10.1,
    color: "#06B6D4",
  },
  {
    category: "Total income",
    amount: 9714,
    percentage: 13.6,
    color: "#16A34A",
  },
  {
    category: "Total expenses",
    amount: 6871,
    percentage: 28.2,
    color: "#D97706",
  },
];

export default function SaleOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Sales overview" />
      </CardHeader>
      <CardContent className="px-6 py-6">
        <ul className="space-y-6">
          {overview.map((item, index) => (
            <li key={`JpdnYSRKZA${index}`}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item.category}</p>
                <p>
                  <span className="font-semibold">
                    {formatDollars(item.amount)}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({item.percentage})%
                  </span>
                </p>
              </div>
              <div className="mt-2 bg-gray-200 h-2 w-full rounded-md">
                <div
                  className="h-full rounded-md"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
