import CustomRadialBar from "@/components/common/CustomRadialBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SaleOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Tours available" />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex items-center justify-center ">
          <div>
            <CustomRadialBar
              radius={80}
              width={250}
              height={250}
              coloredSize={15}
              mutedSize={9}
              //color=
              gradient={["#16A34A", "#BBF7D0"]}
              gradientId="toursavailable"
              mutedColor="#F3F4F6"
              coverage={60}
              centerHTML={
                <>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xl">Tours</p>
                    <p className="font-semibold text-2xl">186</p>
                  </div>
                </>
              }
            />
          </div>
        </div>
        <ul className="space-y-4 p-2">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-4 h-4 rounded bg-sky-600"></div>
              <p>Sold out</p>
            </div>
            <div className="font-semibold">120 Tours</div>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <p>Available</p>
            </div>
            <div className="font-semibold">66 Tours</div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
