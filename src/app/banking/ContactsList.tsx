import { contacts } from "@/api-call/endpoints/contacts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ChevronRight } from "lucide-react";

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
          {contacts.slice(0, 5).map((item, index) => (
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
