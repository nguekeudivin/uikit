"use client";

import { Plus, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, Trash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "./AccountContext";
import AddAddressDialog from "./AddAddressDialog";

const addresses = [
  {
    name: "Jayvion Simon",
    type: "Home",
    address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phone: "+1 202-555-0143",
  },
  {
    name: "Lucian Obrien",
    type: "Office",
    address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
    phone: "+1 416-555-0198",
  },
  {
    name: "Deja Brady",
    type: "Office",
    address: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",
    phone: "+44 20 7946 0958",
  },
  {
    name: "Harrison Stein",
    type: "Office",
    address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
    phone: "+61 2 9876 5432",
  },
];

export default function AccountAddressBook() {
  const { addAddressDialog, defaultAddress } = useAccount();

  return (
    <Card className="rounded-xl shadow bg-white mt-8">
      <AddAddressDialog />

      <CardHeader>
        <CardTitle
          label="Payment method"
          action={
            <>
              <button
                onClick={() => {
                  addAddressDialog.open();
                }}
                className="text-primary inline-flex items-center font-bold gap-2"
              >
                <Plus className="w-5 h-5" /> New Adress
              </button>
            </>
          }
        />
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-6 pt-4">
        {addresses.map((item, index) => (
          <div
            key={`creditcard${index}`}
            className="p-4 border rounded-xl relative"
          >
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {}}>
                    <Star />
                    <span>Set as primary</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <Edit2 />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100"
                  >
                    <Trash className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="text-gray-800 font-semibold">
                  {" "}
                  {item.name}
                </span>
                <span>({item.type})</span>
                {defaultAddress.phone == item.phone && (
                  <div className=" flex items-center gap-1 bg-sky-100 text-sky-600 rounded-lg text-sm px-2 font-semibold py-0.5">
                    Default
                  </div>
                )}
              </div>
              <p>{item.address}</p>
              <p>{item.phone}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
