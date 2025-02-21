import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SaleOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Area Installed" />
        <h4 className="text-muted-foreground">(+43%) than last year</h4>
      </CardHeader>
      <CardContent className="px-6"></CardContent>
    </Card>
  );
}
