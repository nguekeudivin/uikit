"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn, paginateList } from "@/lib/utils";
import SearchField from "@/components/common/form/SearchField";
import useSearch from "@/hooks/use-search";

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

interface CustomerDialogProps {
  customer: any;
  setCustomer: any;
  dialog: any;
}

export default function CustomerDialog({
  customer,
  setCustomer,
  dialog,
}: CustomerDialogProps) {
  const search = useSearch<any>({
    defaultResults: paginateList(addresses),
    predicate: (item: any, { keyword }) => {
      return (
        item.name.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.address.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.phone.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.type.toLowerCase().includes(keyword?.toLowerCase())
      );
    },
  });

  const selectItem = (item: any) => {
    //
    setCustomer(item);
    dialog.close();
  };

  return (
    <Dialog
      open={dialog.isOpen}
      onOpenChange={() => {
        dialog.close();
      }}
    >
      <DialogContent className="px-0 py-6 rounded-2xl">
        <DialogHeader className="px-6">
          <DialogTitle className="text-xl">Customers</DialogTitle>
        </DialogHeader>
        <div className="px-4">
          <SearchField onChange={search.handleChange} className="w-full" />
        </div>
        {search.results.data.length > 0 ? (
          <ul className="">
            {search.results.data.map((item: any, index: number) => (
              <li
                key={`addressBookDialogItem${index}`}
                onClick={() => selectItem(item)}
                className={cn(
                  "text-muted-foreground cursor-pointer hover:bg-gray-100 px-4 py-3",
                  {
                    "bg-gray-100": customer.phone == item.phone,
                  }
                )}
              >
                <div
                  key={`addressbook${index}`}
                  className="flex items-center space-x-2"
                >
                  <span className="text-gray-800 font-semibold">
                    {" "}
                    {item.name}
                  </span>
                  <span>({item.type})</span>
                  {customer.phone == item.phone && (
                    <div className=" flex items-center gap-1 bg-sky-100 text-sky-600 rounded-lg text-sm px-2 font-semibold py-0.5">
                      Default
                    </div>
                  )}
                </div>
                <p>{item.address}</p>
                <p>{item.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <>{search.renderNotFound("h-[100px] border-none")}</>
        )}
      </DialogContent>
    </Dialog>
  );
}
