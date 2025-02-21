import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDollars } from "@/lib/utils";

export default function CurrentBalance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Sales overview" />
      </CardHeader>
      <CardContent className="px-6 py-6">
        <p className="font-bold text-4xl">{formatDollars(187650)}</p>

        <ul className="mt-4">
          {Object.entries({
            "Order total": 287650,
            Earning: 25500,
            Refunded: 1600,
          }).map(([label, value]) => (
            <li className="flex item-center justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold">{formatDollars(value)}</span>
            </li>
          ))}
        </ul>

        <div className="w-full mt-4 flex gap-2">
          <Button variant="secondary" className="w-full">
            Request
          </Button>
          <Button className="w-full"> Transfer </Button>
        </div>
      </CardContent>
    </Card>
  );
}
