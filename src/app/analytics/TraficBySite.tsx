import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import icons from "@/lib/icons";
import { kformat } from "@/lib/utils";
import { X } from "lucide-react";

const items = [
  {
    value: 1950,
    label: "Facebook",
    name: "facebook",
    color: "#1877F2", // Facebook Blue
  },
  {
    value: 9120,
    name: "google",
    label: "Google",
    color: "#EA4335", // Google Red
  },
  {
    value: 6980,
    name: "twitter",
    label: "Twitter",
    color: "#1DA1F2", // Twitter Blue
  },
  {
    value: 8490,
    name: "linkedin",
    label: "LinkedIn",
    color: "#0077B5", // LinkedIn Blue
  },
];

export default function TraficBySite() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Trafic by site" />
      </CardHeader>
      <CardContent className="px-6 pb-6 mt-2">
        <div className="grid grid-cols-2 gap-6">
          {items
            .map((item) => {
              return {
                icon: icons[item.name] as any,
                ...item,
              };
            })
            .map((item, index) => (
              <div
                key={`zcaCXddTmBKmRM${index}`}
                className="flex items-center justify-center border rounded-l p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <item.icon
                    className="w-8 h-8"
                    style={{ color: item.color }}
                  />
                  <div className="font-semibold text-xl">
                    {kformat(item.value)}
                  </div>
                  <div className="text-muted-foreground">{item.label}</div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
